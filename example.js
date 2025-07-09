import run from './index.js';

// Exemple d'utilisation
const testUrl = 'https://www.youtube.com/watch?v=PDL-qQxXoN4';

console.log('Testing Musicord package...');
console.log('URL:', testUrl);

run(testUrl).then(() => {
    console.log('Test completed successfully!');
}).catch(error => {
    console.error('Test failed:', error);
});
