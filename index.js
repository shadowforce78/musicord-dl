import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Function to setup venv and download yt-dlp
async function setupVenvAndDownload(URL) {
    try {
        console.log('Setting up virtual environment...');
        await execAsync('python -m venv .venv');
        console.log('Virtual environment created.');

        console.log('Installing yt-dlp...');
        await execAsync('.venv/Scripts/pip install yt-dlp');
        console.log('yt-dlp installed.');

        await main(URL);
    } catch (error) {
        console.error('Error setting up venv or downloading yt-dlp:', error);
    }
}

async function main(URL) {
    try {
        console.log('Starting download...');
        // const ytdlpPath = 'C:/Users/adamp/Desktop/DevProject/Musicord/.venv/Scripts/yt-dlp.exe';
        const { stdout, stderr } = await execAsync(`yt-dlp -x --audio-format mp3 --audio-quality 0 -o "output.%(ext)s" "${URL}"`);

        if (stderr) {
            console.error('yt-dlp stderr:', stderr);
        }

        console.log('Download completed');
        console.log('Output:', stdout);
    } catch (error) {
        console.error('Error downloading video:', error);
    }
}

export default async function run(URL) {
    if (!URL) {
        console.error('No URL provided. Please provide a valid YouTube video URL.');
        return;
    }

    // Check if the virtual environment exists
    try {
        await execAsync('python -m venv .venv');
        console.log('Virtual environment already exists.');
    } catch (error) {
        console.log('Creating virtual environment...');
        await setupVenvAndDownload(URL);
        return;
    }

    // Proceed with downloading the video
    await main(URL);
}