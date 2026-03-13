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
    
    console.log(`📊 Total quiz questions: ${quizQuestions.length}`);
})();
