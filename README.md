# @saumondeluxe/musicord-dl

A simple Node.js package for Discord music bot developers to download YouTube videos as MP3 files.

## Features

- Download YouTube videos as high-quality MP3 files
- Automatic virtual environment setup
- Built on top of yt-dlp for reliable downloading
- ES modules support
- Easy integration with Discord bots

## Prerequisites

- Node.js 16.0.0 or higher
- Python 3.7 or higher
- FFmpeg (automatically installed if not present)

## Installation

```bash
npm install @saumondeluxe/musicord-dl
```

## Usage

### ES Modules (import/export)

```javascript
import run from '@saumondeluxe/musicord-dl';

// Download a YouTube video as MP3
await run('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
```

### CommonJS (require/module.exports)

```javascript
const run = require('@saumondeluxe/musicord-dl');

// Download a YouTube video as MP3
(async () => {
    await run('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
})();
```

### Basic Usage

Both syntaxes work exactly the same way!

### Example with Discord Bot (ES Modules)

```javascript
import { Client, GatewayIntentBits } from 'discord.js';
import run from '@saumondeluxe/musicord-dl';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!download ')) {
        const url = message.content.split(' ')[1];
        
        if (url && url.includes('youtube.com')) {
            message.reply('Downloading...');
            try {
                await run(url);
                message.reply('Download completed! 🎵');
            } catch (error) {
                message.reply('Error downloading the video.');
            }
        }
    }
});

client.login('YOUR_BOT_TOKEN');
```

### Example with Discord Bot (CommonJS)

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const run = require('@saumondeluxe/musicord-dl');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!download ')) {
        const url = message.content.split(' ')[1];
        
        if (url && url.includes('youtube.com')) {
            message.reply('Downloading...');
            try {
                await run(url);
                message.reply('Download completed! 🎵');
            } catch (error) {
                message.reply('Error downloading the video.');
            }
        }
    }
});

client.login('YOUR_BOT_TOKEN');
```

## API

### `run(url)`

Downloads a YouTube video as an MP3 file.

**Parameters:**
- `url` (string): The YouTube video URL to download

**Returns:**
- Promise<void>

**Example:**
```javascript
// ES Modules
import run from '@saumondeluxe/musicord-dl';
await run('https://www.youtube.com/watch?v=VIDEO_ID');

// CommonJS
const run = require('@saumondeluxe/musicord-dl');
await run('https://www.youtube.com/watch?v=VIDEO_ID');

// Creates output.mp3 in the current directory
```

## Output

The downloaded MP3 file will be saved as `output.mp3` in the current working directory.

## Dependencies

This package automatically manages its Python dependencies:
- `yt-dlp`: For downloading YouTube videos
- Python virtual environment for isolation

## Requirements

- Python 3.7+
- FFmpeg (for audio conversion)

## License

ISC

## Author

SaumonDeLuxe <saumondeluxe@gmail.com>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Changelog

### 1.1.0
- Added CommonJS support (require/module.exports)
- Package now supports both ES Modules and CommonJS
- Updated documentation with examples for both syntaxes

### 1.0.1
- Fixed GitHub repository URLs in `package.json` for `musicord-dl`

### 1.0.0
- Initial release
- YouTube to MP3 download functionality
- Automatic virtual environment setup
- ES modules support
