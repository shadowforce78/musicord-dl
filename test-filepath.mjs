// Test du nouveau comportement avec retour du filepath
import run from './index.js';

const testUrl = 'https://www.youtube.com/watch?v=PDL-qQxXoN4';

console.log('Testing Musicord package avec nouveau comportement...');
console.log('URL:', testUrl);

run(testUrl).then(filePath => {
    console.log('✅ Test completed successfully!');
    console.log('📁 File saved at:', filePath);
    console.log('📄 Filename:', filePath.split('\\').pop());
}).catch(error => {
    console.error('❌ Test failed:', error);
});
