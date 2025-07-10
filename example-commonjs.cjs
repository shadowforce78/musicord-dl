// Exemple d'utilisation avec CommonJS (require)
const run = require('./index.cjs');

// URL de test
const testUrl = 'https://www.youtube.com/watch?v=PDL-qQxXoN4';

console.log('Testing Musicord package avec CommonJS...');
console.log('URL:', testUrl);

// Utilisation de la fonction
(async () => {
    try {
        const filePath = await run(testUrl);
        console.log('✅ Test completed successfully!');
        console.log('📁 File saved at:', filePath);
        console.log('📄 Filename:', filePath.split('\\').pop());
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
})();
