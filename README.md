# Pot-App OpenAI Translation Plugin

[English](README.md) | [简体中文](README_CN.md)

This is an OpenAI translation plugin for [Pot-App](https://pot-app.com/), supporting multiple OpenAI models with API key storage and model selection.

## Features

- **Multiple Model Support**: Choose from GPT-4o, GPT-4o Mini, GPT-4 Turbo, and GPT-3.5 Turbo
- **Secure API Key Storage**: Store your OpenAI API key securely
- **Custom API Endpoint**: Support for custom OpenAI-compatible API endpoints
- **Streaming Translation**: Real-time streaming of translation results for better user experience
- **Extensive Language Support**: Support for 40+ languages

## Installation

### Method 1: Download from Release

1. Go to the [Releases](https://github.com/WonderMr/pot-app-translate-openai/releases) page
2. Download the latest `plugin.com.pot-app.openai.potext` file
3. Open Pot-App, go to Settings → Plugin → Install
4. Select the downloaded `.potext` file

### Method 2: Manual Build

1. Clone this repository
2. Run the following command to build:
   ```bash
   zip -r plugin.com.pot-app.openai.potext info.json main.js lingva.svg
   ```
3. Install the generated `.potext` file in Pot-App

## Configuration

After installation, configure the plugin with the following settings:

1. **API Key** (Required): Your OpenAI API key
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - The key is stored securely (password field)

2. **Model** (Required): Select the OpenAI model to use
   - `GPT-4o`: Latest and most capable model
   - `GPT-4o Mini`: Cost-effective mini version of GPT-4o
   - `GPT-4 Turbo`: High-performance GPT-4 model
   - `GPT-3.5 Turbo`: Fast and economical option (default)

3. **API Endpoint** (Optional): Custom API endpoint
   - Default: `https://api.openai.com`
   - Use this if you have a custom OpenAI-compatible API endpoint

## Supported Languages

The plugin supports translation between the following languages:

- Chinese (Simplified & Traditional)
- English
- Japanese
- Korean
- French
- Spanish
- Russian
- German
- Italian
- Turkish
- Portuguese (Portugal & Brazil)
- Vietnamese
- Indonesian
- Thai
- Malay
- Arabic
- Hindi
- Mongolian
- Khmer
- Norwegian
- Persian
- Dutch
- Polish
- Ukrainian
- Czech
- Swedish
- Danish
- Finnish
- Romanian
- Bulgarian
- Greek
- Hebrew
- Hungarian
- Slovak
- Croatian

## Usage

1. Select text you want to translate
2. Trigger Pot-App (default: Ctrl+Q on Windows/Linux, Cmd+Q on macOS)
3. Choose OpenAI as the translation service
4. View the streaming translation results

## Development

### Plugin Structure

- `info.json`: Plugin configuration and metadata
- `main.js`: Main translation logic
- `lingva.svg`: Plugin icon

### Building from Source

```bash
# Package the plugin
zip -r plugin.com.pot-app.openai.potext info.json main.js lingva.svg
```

### API Integration

The plugin uses OpenAI's Chat Completions API with streaming enabled for real-time translation display. The implementation:

- Uses the `/v1/chat/completions` endpoint
- Sends system and user messages for context
- Processes streaming responses for immediate feedback
- Handles errors gracefully with user-friendly messages

## Troubleshooting

### API Key Error
- Ensure your API key is correctly entered
- Verify the API key is active and has available credits
- Check if your API key has the necessary permissions

### Connection Error
- Check your internet connection
- Verify the API endpoint is accessible
- If using a custom endpoint, ensure it's OpenAI-compatible

### Translation Quality
- Try different models (GPT-4o often provides better results)
- Ensure the source and target languages are supported
- Check if the text is too long (API has token limits)

## License

Apache-2.0 License

## Contributing

Issues and pull requests are welcome!

## Related Links

- [Pot-App Official Website](https://pot-app.com/)
- [Pot-App GitHub](https://github.com/pot-app/pot-desktop)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Plugin Development Guide](https://pot-app.com/docs/plugin/api/translate.html)
