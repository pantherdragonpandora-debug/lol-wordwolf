// Quiz Data Integration - Merges all quiz batches into main quiz
// This script should be loaded after all batch files

(function() {
    // Wait for all batch scripts to load
    if (typeof quizBatch111_160 !== 'undefined') {
        quizQuestions = quizQuestions.concat(quizBatch111_160);
        console.log('✅ Integrated questions 111-160');
    }
    
    if (typeof quizBatch161_210 !== 'undefined') {
        quizQuestions = quizQuestions.concat(quizBatch161_210);
        console.log('✅ Integrated questions 161-210');
    }
    
    if (typeof quizBatch211_260 !== 'undefined') {
        quizQuestions = quizQuestions.concat(quizBatch211_260);
        console.log('✅ Integrated questions 211-260');
    }
    
    if (typeof quizBatch261_300 !== 'undefined') {
        quizQuestions = quizQuestions.concat(quizBatch261_300);
        console.log('✅ Integrated questions 261-300');
    }
    
    // Sort by ID to ensure correct order
    quizQuestions.sort((a, b) => a.id - b.id);
    
    // 🌍 Convert all quotes to English for language learning
    // All languages will display the English quote
    quizQuestions.forEach(question => {
        if (question.quotes && question.quotes.en) {
            const englishQuote = question.quotes.en;
            question.quotes.ja = englishQuote;
            question.quotes.ko = englishQuote;
            question.quotes.zh = englishQuote;
        }
    });
    
    console.log(`📊 Total quiz questions: ${quizQuestions.length}`);
    console.log('🌍 All quotes converted to English for language learning');
})();
