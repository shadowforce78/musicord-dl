const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');

const execAsync = promisify(exec);

// Function to get video info from YouTube URL
async function getVideoInfo(url) {
    try {
        const { stdout } = await execAsync(`yt-dlp --get-title --get-id "${url}"`);
        const lines = stdout.trim().split('\n');
        const title = lines[0];
        const videoId = lines[1];
        
        // Clean filename (remove special characters)
        const cleanTitle = title.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_');
        const filename = `${cleanTitle}_${videoId}.mp3`;
        
        return { title, videoId, filename };
    } catch (error) {
        console.error('Error getting video info:', error);
        // Fallback to generic name with timestamp
        const timestamp = Date.now();
        return {
            title: 'Unknown',
            videoId: 'unknown',
            filename: `download_${timestamp}.mp3`
        };
    }
}

// Function to setup venv and download yt-dlp
async function setupVenvAndDownload(URL) {
    try {
        console.log('Setting up virtual environment...');
        await execAsync('python -m venv .venv');
        console.log('Virtual environment created.');

        console.log('Installing yt-dlp...');
        await execAsync('.venv/Scripts/pip install yt-dlp');
        console.log('yt-dlp installed.');

        return await main(URL);
    } catch (error) {
        console.error('Error setting up venv or downloading yt-dlp:', error);
        throw error;
    }
}

async function main(URL) {
    try {
        console.log('Getting video information...');
        const videoInfo = await getVideoInfo(URL);
        console.log('Video title:', videoInfo.title);
        
        console.log('Starting download...');
        const outputPath = path.resolve(videoInfo.filename);
        
        const { stdout, stderr } = await execAsync(`yt-dlp -x --audio-format mp3 --audio-quality 0 -o "${videoInfo.filename}" "${URL}"`);

        if (stderr) {
            console.error('yt-dlp stderr:', stderr);
        }

        console.log('Download completed');
        console.log('File saved as:', outputPath);
        
        return outputPath;
    } catch (error) {
        console.error('Error downloading video:', error);
        throw error;
    }
}

async function run(URL) {
    if (!URL) {
        console.error('No URL provided. Please provide a valid YouTube video URL.');
        return null;
    }

    // Check if the virtual environment exists
    try {
        await execAsync('python -m venv .venv');
        console.log('Virtual environment already exists.');
    } catch (error) {
        console.log('Creating virtual environment...');
        return await setupVenvAndDownload(URL);
    }

    // Proceed with downloading the video
    return await main(URL);
}

module.exports = run;
