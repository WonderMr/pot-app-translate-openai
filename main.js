async function translate(text, from, to, options) {
    const { config, setResult } = options;
    const { fetch, Body } = options.utils.http;
    
    // Get configuration
    const { apiKey, model = 'gpt-3.5-turbo', apiEndpoint } = config;
    
    // Validate API key
    if (!apiKey || apiKey.trim() === '') {
        throw 'API Key is required. Please configure your OpenAI API key in the plugin settings.';
    }
    
    // Determine API endpoint
    const baseUrl = apiEndpoint && apiEndpoint.trim() !== '' 
        ? apiEndpoint.trim().replace(/\/$/, '') 
        : 'https://api.openai.com';
    const url = `${baseUrl}/v1/chat/completions`;
    
    // Get language names
    const languageMap = {
        "auto": "auto-detect",
        "Chinese (Simplified)": "Simplified Chinese",
        "Chinese (Traditional)": "Traditional Chinese",
        "English": "English",
        "Japanese": "Japanese",
        "Korean": "Korean",
        "French": "French",
        "Spanish": "Spanish",
        "Russian": "Russian",
        "German": "German",
        "Italian": "Italian",
        "Turkish": "Turkish",
        "Portuguese": "Portuguese",
        "Portuguese (Brazil)": "Brazilian Portuguese",
        "Vietnamese": "Vietnamese",
        "Indonesian": "Indonesian",
        "Thai": "Thai",
        "Malay": "Malay",
        "Arabic": "Arabic",
        "Hindi": "Hindi",
        "Mongolian": "Mongolian",
        "Khmer": "Khmer",
        "Norwegian": "Norwegian",
        "Persian": "Persian",
        "Dutch": "Dutch",
        "Polish": "Polish",
        "Ukrainian": "Ukrainian",
        "Czech": "Czech",
        "Swedish": "Swedish",
        "Danish": "Danish",
        "Finnish": "Finnish",
        "Romanian": "Romanian",
        "Bulgarian": "Bulgarian",
        "Greek": "Greek",
        "Hebrew": "Hebrew",
        "Hungarian": "Hungarian",
        "Slovak": "Slovak",
        "Croatian": "Croatian"
    };
    
    const sourceLang = languageMap[from] || from;
    const targetLang = languageMap[to] || to;
    
    // Prepare the prompt
    const systemPrompt = 'You are a professional translator. Translate the given text accurately and naturally.';
    let userPrompt;
    
    if (from === 'auto' || sourceLang === 'auto-detect') {
        userPrompt = `Translate the following text to ${targetLang}. Only provide the translation without any explanations:\n\n${text}`;
    } else {
        userPrompt = `Translate the following text from ${sourceLang} to ${targetLang}. Only provide the translation without any explanations:\n\n${text}`;
    }
    
    // Prepare request body
    const requestBody = {
        model: model,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        stream: true
    };
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey.trim()}`
            },
            body: Body.json(requestBody),
            responseType: 2 // Stream response
        });
        
        if (res.ok) {
            let result = '';
            const decoder = new TextDecoder();
            const rawData = res.rawData;
            
            if (rawData) {
                const dataStr = decoder.decode(rawData);
                const lines = dataStr.split('\n').filter(line => line.trim() !== '');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') {
                            break;
                        }
                        
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content;
                            if (content) {
                                result += content;
                                if (setResult) {
                                    setResult(result);
                                }
                            }
                        } catch (e) {
                            // Skip invalid JSON lines (some lines may be incomplete during streaming)
                            continue;
                        }
                    }
                }
            }
            
            if (result) {
                return result;
            } else {
                throw 'No translation result received from OpenAI API';
            }
        } else {
            let errorMsg = `HTTP Error: ${res.status}`;
            if (res.data) {
                try {
                    const errorData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    errorMsg = errorData.error?.message || errorMsg;
                } catch (e) {
                    errorMsg = res.data.toString();
                }
            }
            throw errorMsg;
        }
    } catch (error) {
        if (typeof error === 'string') {
            throw error;
        }
        throw `Translation failed: ${error.message || error}`;
    }
}
