// Script to convert all quotes to English for language learning
// This updates quiz batch files to use English quotes for all languages

const fs = require('fs');

function convertQuotesToEnglish(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Pattern to match quotes blocks
    const pattern = /quotes: \{[^}]+\}/g;
    
    content = content.replace(pattern, (match) => {
        // Extract the English quote
        const enMatch = match.match(/en: "([^"]+)"/);
        if (enMatch) {
            const englishQuote = enMatch[1];
            // Replace all language versions with English
            return `quotes: {
            ja: "${englishQuote}",
            en: "${englishQuote}",
            ko: "${englishQuote}",
            zh: "${englishQuote}"
        }`;
        }
        return match;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Converted: ${filePath}`);
}

// Convert all batch files
const files = [
    'js/quiz-batch-111-160.js',
    'js/quiz-batch-161-210.js',
    'js/quiz-batch-211-260.js',
    'js/quiz-batch-261-300.js'
];

files.forEach(file => convertQuotesToEnglish(file));
console.log('✅ All files converted to English quotes!');
