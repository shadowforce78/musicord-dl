# Guide d'utilisation avec Discord.js

Voici comment utiliser votre package `@saumondeluxe/musicord-dl` dans un bot Discord :

## Installation dans votre projet Discord Bot

```bash
npm install @saumondeluxe/musicord-dl discord.js
```

## Exemple d'utilisation complète

```javascript
import { Client, GatewayIntentBits } from 'discord.js';
import run from '@saumondeluxe/musicord-dl';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    // Ignore les messages du bot
    if (message.author.bot) return;

    // Commande !download
    if (message.content.startsWith('!download ')) {
        const url = message.content.split(' ')[1];
        
        if (!url) {
            return message.reply('❌ Veuillez fournir une URL YouTube valide.');
        }

        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return message.reply('❌ Veuillez fournir une URL YouTube valide.');
        }

        const downloadMessage = await message.reply('⏳ Téléchargement en cours...');

        try {
            // Télécharger la vidéo
            await run(url);
            
            // Vérifier si le fichier existe
            const outputPath = join(__dirname, 'output.mp3');
            if (fs.existsSync(outputPath)) {
                // Envoyer le fichier
                await message.reply({
                    content: '🎵 Téléchargement terminé !',
                    files: [{
                        attachment: outputPath,
                        name: 'audio.mp3'
                    }]
                });
                
                // Supprimer le fichier temporaire
                fs.unlinkSync(outputPath);
            } else {
                await downloadMessage.edit('❌ Erreur lors du téléchargement.');
            }
            
        } catch (error) {
            console.error('Erreur:', error);
            await downloadMessage.edit('❌ Erreur lors du téléchargement de la vidéo.');
        }
    }

    // Commande !help
    if (message.content === '!help') {
        const helpEmbed = {
            color: 0x0099FF,
            title: '🎵 Bot de téléchargement de musique',
            description: 'Commandes disponibles :',
            fields: [
                {
                    name: '!download <URL>',
                    value: 'Télécharge une vidéo YouTube en MP3',
                    inline: true,
                },
                {
                    name: '!help',
                    value: 'Affiche ce message d\\'aide',
                    inline: true,
                },
            ],
            footer: {
                text: 'Powered by @saumondeluxe/musicord-dl',
            },
        };

        message.reply({ embeds: [helpEmbed] });
    }
});

// Connexion du bot
client.login('VOTRE_TOKEN_BOT');
```

## Configuration

1. Créez un fichier `.env` :
```
BOT_TOKEN=votre_token_discord_ici
```

2. Créez un `package.json` :
```json
{
  "name": "mon-bot-discord",
  "version": "1.0.0",
  "type": "module",
  "main": "bot.js",
  "dependencies": {
    "@saumondeluxe/musicord-dl": "^1.0.0",
    "discord.js": "^14.0.0"
  }
}
```

## Fonctionnalités

✅ **!download <URL>** - Télécharge et envoie le MP3  
✅ **!help** - Affiche l'aide  
✅ **Gestion d'erreurs** - Messages d'erreur clairs  
✅ **Nettoyage automatique** - Supprime les fichiers temporaires  
✅ **Validation d'URL** - Vérifie que l'URL est valide  

## Prérequis

- Node.js 16+
- Python 3.7+
- FFmpeg (installé automatiquement)

Votre package est maintenant disponible publiquement sur npm ! 🚀
