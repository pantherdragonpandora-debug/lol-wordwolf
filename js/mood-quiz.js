// ========================================
// 気分診断チャンピオン選択ロジック（v9 - 全172体対応版）
// ========================================

console.log('🎭 mood-quiz.js ロード開始 (v9 - 全172体対応)...');

// データファイルが正しくロードされているか確認
if (typeof moodQuizQuestions === 'undefined') {
  console.error('❌ moodQuizQuestions が定義されていません！mood-quiz-data.js が先にロードされていることを確認してください。');
}
if (typeof championsByMood === 'undefined') {
  console.error('❌ championsByMood が定義されていません！');
}
if (typeof laneBonusPoints === 'undefined') {
  console.error('❌ laneBonusPoints が定義されていません！');
}

console.log('📋 データチェック完了:', {
  moodQuizQuestions: typeof moodQuizQuestions,
  championsByMood: typeof championsByMood,
  laneBonusPoints: typeof laneBonusPoints
});

let currentQuestionIndex = 0;
let moodScores = {
  aggressive: 0,
  supportive: 0,
  tactical: 0
};
let answerHistory = []; // 回答履歴を保存
let selectedLane = null; // 選択されたレーンを保存
let answerKeywords = []; // 回答キーワードを保存
let currentMoodType = null; // 現在の診断結果タイプを保存（言語切替用）

// 現在のスコアから気分タイプを取得
function getMoodTypeFromScores() {
  if (currentMoodType) {
    return currentMoodType;
  }
  
  // スコアから判定
  let moodType = 'balanced';
  let maxScore = 0;
  
  Object.keys(moodScores).forEach(type => {
    if (moodScores[type] > maxScore) {
      maxScore = moodScores[type];
      moodType = type;
    }
  });
  
  const scores = Object.values(moodScores);
  const allSame = scores.every(score => score === scores[0]);
  if (allSame) {
    moodType = 'balanced';
  }
  
  return moodType;
}

// グローバルスコープに露出
window.getMoodTypeFromScores = getMoodTypeFromScores;

// 診断を開始
function startMoodQuiz() {
  console.log('🎯 startMoodQuiz() が呼ばれました');
  currentQuestionIndex = 0;
  moodScores = {
    aggressive: 0,
    supportive: 0,
    tactical: 0
  };
  answerHistory = [];
  selectedLane = null;
  answerKeywords = [];
  currentMoodType = null; // 診断結果タイプをリセット
  
  showScreen('mood-quiz-question-screen');
  displayQuestion();
  updateProgressBar();
  updateBackButton();
  
  console.log('🎭 気分診断を開始しました（12問 - マルチレーン対応）');
}

// グローバルスコープに明示的に露出
window.startMoodQuiz = startMoodQuiz;
console.log('✅ startMoodQuiz 関数をグローバルスコープに登録しました');

// 質問を表示
function displayQuestion() {
  const question = moodQuizQuestions[currentQuestionIndex];
  
  // 現在の言語を取得
  const lang = currentLanguage || 'ja';
  const i18nData = moodQuizQuestionsI18n[lang] || moodQuizQuestionsI18n['ja'];
  
  // 質問テキスト（多言語対応）
  const questionText = i18nData.questions[question.questionKey];
  document.getElementById('mood-question-text').textContent = questionText;
  
  // 質問番号（多言語対応）
  const questionNumberText = t('moodQuiz.questionNumber', {
    current: currentQuestionIndex + 1,
    total: moodQuizQuestions.length
  });
  document.getElementById('mood-question-number').textContent = questionNumberText;
  
  // 選択肢を生成（多言語対応）
  const optionsContainer = document.getElementById('mood-question-options');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'mood-option-btn';
    // 多言語対応：翻訳データから選択肢テキストを取得
    const optionText = i18nData.options[question.questionKey][option.textKey];
    button.textContent = optionText;
    button.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(button);
  });
  
  // 「前の質問に戻る」ボタンの表示/非表示
  updateBackButton();
  
  console.log(`📝 質問 ${currentQuestionIndex + 1} を表示しました (言語: ${lang})`);
}

// 回答を選択
function selectAnswer(optionIndex) {
  const question = moodQuizQuestions[currentQuestionIndex];
  const selectedOption = question.options[optionIndex];
  
  // 回答を履歴に保存
  answerHistory.push({
    questionIndex: currentQuestionIndex,
    optionIndex: optionIndex,
    scores: { ...moodScores },
    keywords: [...answerKeywords]
  });
  
  // レーン情報を保存（最初の質問）
  if (question.type === 'lane' && selectedOption.lane) {
    selectedLane = selectedOption.lane;
    console.log(`🎯 選択されたレーン: ${selectedLane}`);
  }
  
  // キーワードを保存（回答内容から特性を抽出）
  extractKeywords(question, selectedOption);
  
  // スコアを加算
  moodScores.aggressive += selectedOption.points.aggressive;
  moodScores.supportive += selectedOption.points.supportive;
  moodScores.tactical += selectedOption.points.tactical;
  
  console.log(`✅ 回答: ${selectedOption.text}`);
  console.log('現在のスコア:', moodScores);
  
  // 次の質問へ
  currentQuestionIndex++;
  
  if (currentQuestionIndex < moodQuizQuestions.length) {
    displayQuestion();
    updateProgressBar();
  } else {
    // 診断完了
    console.log('📋 回答キーワード:', answerKeywords);
    showResult();
  }
}

// 回答からキーワードを抽出
function extractKeywords(question, option) {
  const type = question.type;
  
  // 質問タイプごとにキーワードを抽出
  if (type === 'role') {
    if (option.role === 'damage') answerKeywords.push('damage', 'carry');
    if (option.role === 'tank') answerKeywords.push('tank', 'frontline');
    if (option.role === 'control') answerKeywords.push('control', 'cc');
    if (option.role === 'assassinate') answerKeywords.push('assassin', 'burst');
  } else if (type === 'playstyle') {
    if (option.playstyle === 'fighter') answerKeywords.push('fighter', 'melee');
    if (option.playstyle === 'support') answerKeywords.push('support', 'utility');
    if (option.playstyle === 'strategic') answerKeywords.push('strategic', 'poke');
    if (option.playstyle === 'assassin') answerKeywords.push('assassin', 'oneshot');
  } else if (type === 'range') {
    if (option.text.includes('接近戦')) answerKeywords.push('melee', 'close');
    if (option.text.includes('中距離')) answerKeywords.push('medium', 'skirmish');
    if (option.text.includes('遠距離')) answerKeywords.push('ranged', 'long');
  } else if (type === 'early') {
    if (option.text.includes('序盤から有利')) answerKeywords.push('early', 'aggressive');
    if (option.text.includes('安全に成長')) answerKeywords.push('scaling', 'late');
  } else if (type === 'late') {
    if (option.text.includes('ピック')) answerKeywords.push('pick', 'assassin');
    if (option.text.includes('集団戦')) answerKeywords.push('teamfight', 'aoe');
    if (option.text.includes('味方を守る')) answerKeywords.push('peel', 'protect');
    if (option.text.includes('スプリット')) answerKeywords.push('split', 'duelist');
  } else if (type === 'laning') {
    if (option.text.includes('積極的')) answerKeywords.push('aggressive', 'trade');
    if (option.text.includes('安全')) answerKeywords.push('safe', 'farm');
    if (option.text.includes('ロー')) answerKeywords.push('roam', 'mobile');
    if (option.text.includes('プッシュ')) answerKeywords.push('push', 'waveclear');
  }
}

// 「前の質問に戻る」ボタンの表示/非表示
function updateBackButton() {
  const backButton = document.getElementById('mood-back-question-btn');
  if (backButton) {
    if (currentQuestionIndex === 0) {
      backButton.style.display = 'none';
    } else {
      backButton.style.display = 'inline-block';
    }
  }
}

// 前の質問に戻る
function goBackQuestion() {
  if (currentQuestionIndex === 0 || answerHistory.length === 0) {
    console.log('⚠️ 最初の質問なので戻れません');
    return;
  }
  
  // 最後の回答を取り消す
  const lastAnswer = answerHistory.pop();
  
  // スコアを復元
  moodScores = { ...lastAnswer.scores };
  answerKeywords = [...lastAnswer.keywords];
  
  // 質問インデックスを戻す
  currentQuestionIndex--;
  
  // レーン選択をリセット（最初の質問に戻った場合）
  if (currentQuestionIndex === 0) {
    selectedLane = null;
  }
  
  console.log(`⏪ 質問 ${currentQuestionIndex + 1} に戻りました`);
  console.log('復元されたスコア:', moodScores);
  
  // 質問を再表示
  displayQuestion();
  updateProgressBar();
}

// プログレスバーを更新
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / moodQuizQuestions.length) * 100;
  const progressBar = document.getElementById('mood-progress-bar');
  
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

// 診断結果を表示
function showResult() {
  console.log('🎉 診断完了！最終スコア:', moodScores);
  console.log('🎯 選択されたレーン:', selectedLane);
  
  // 最も高いスコアのタイプを判定
  let moodType = 'balanced';
  let maxScore = 0;
  
  Object.keys(moodScores).forEach(type => {
    if (moodScores[type] > maxScore) {
      maxScore = moodScores[type];
      moodType = type;
    }
  });
  
  // スコアが均等な場合はバランス型
  const scores = Object.values(moodScores);
  const allSame = scores.every(score => score === scores[0]);
  if (allSame) {
    moodType = 'balanced';
  }
  
  // 診断結果タイプを保存（言語切替用）
  currentMoodType = moodType;
  
  console.log(`🎭 診断結果: ${moodType}`);
  
  // 結果を表示
  displayResult(moodType);
  showScreen('mood-quiz-result-screen');
}

// チャンピオンの適合度スコアを計算（v5 - レーン適性ボーナス対応）
function calculateChampionScore(champion, moodType) {
  // 基本スコア: タイプマッチで100点
  let score = 100;
  
  // スコア比率に応じて加点（最大+30点）
  const totalScore = moodScores.aggressive + moodScores.supportive + moodScores.tactical;
  if (totalScore > 0) {
    if (moodType === 'aggressive') {
      score += (moodScores.aggressive / totalScore) * 30;
    } else if (moodType === 'supportive') {
      score += (moodScores.supportive / totalScore) * 30;
    } else if (moodType === 'tactical') {
      score += (moodScores.tactical / totalScore) * 30;
    } else if (moodType === 'balanced') {
      const variance = Math.abs(moodScores.aggressive - moodScores.supportive) +
                       Math.abs(moodScores.supportive - moodScores.tactical) +
                       Math.abs(moodScores.tactical - moodScores.aggressive);
      score += Math.max(0, 30 - variance);
    }
  }
  
  // レーン適性ボーナス（最大+30点）- NEW!
  if (selectedLane && champion.lanes) {
    const laneMatch = champion.lanes.find(l => l.lane === selectedLane);
    if (laneMatch && laneBonusPoints) {
      const bonus = laneBonusPoints[laneMatch.priority];
      score += bonus;
      console.log(`  ${champion.nameJa}: レーンボーナス +${bonus}点 (${laneMatch.priority})`);
    }
  }
  
  // チャンピオンの特性マッチング（最大+50点）
  let matchScore = 0;
  
  // チャンピオン名と説明文からキーワードマッチング
  const championText = `${champion.name} ${champion.nameJa} ${champion.description}`.toLowerCase();
  
  answerKeywords.forEach(keyword => {
    if (championText.includes(keyword.toLowerCase())) {
      matchScore += 5; // 1キーワードマッチで+5点
    }
  });
  
  // チャンピオンごとの個別調整（名前ベース）
  matchScore += getChampionBonusScore(champion, answerKeywords);
  
  // マッチスコアは最大50点
  matchScore = Math.min(matchScore, 50);
  
  score += matchScore;
  
  // ランダム要素（同点の場合の順位変動、最大+5点に縮小）
  score += Math.random() * 5;
  
  return score;
}

// チャンピオンごとのボーナススコア
function getChampionBonusScore(champion, keywords) {
  let bonus = 0;
  const name = champion.name.toLowerCase();
  
  // アサシン系チャンピオン
  const assassins = ['zed', 'talon', 'akali', 'katarina', 'khazix', 'rengar', 'qiyana', 'leblanc'];
  if (assassins.includes(name) && (keywords.includes('assassin') || keywords.includes('burst') || keywords.includes('oneshot'))) {
    bonus += 15;
  }
  
  // タンク系チャンピオン
  const tanks = ['malphite', 'ornn', 'maokai', 'shen', 'braum', 'alistar', 'leona', 'nautilus'];
  if (tanks.includes(name) && (keywords.includes('tank') || keywords.includes('frontline') || keywords.includes('protect'))) {
    bonus += 15;
  }
  
  // サポート系チャンピオン
  const supports = ['soraka', 'lulu', 'janna', 'nami', 'sona', 'yuumi'];
  if (supports.includes(name) && (keywords.includes('support') || keywords.includes('utility') || keywords.includes('peel'))) {
    bonus += 15;
  }
  
  // メイジ系チャンピオン
  const mages = ['syndra', 'orianna', 'azir', 'viktor', 'xerath', 'velkoz', 'ziggs'];
  if (mages.includes(name) && (keywords.includes('poke') || keywords.includes('strategic') || keywords.includes('long'))) {
    bonus += 15;
  }
  
  // ファイター系チャンピオン
  const fighters = ['darius', 'garen', 'jax', 'irelia', 'riven', 'fiora', 'camille'];
  if (fighters.includes(name) && (keywords.includes('fighter') || keywords.includes('melee') || keywords.includes('duelist'))) {
    bonus += 15;
  }
  
  // ADC系チャンピオン
  const adcs = ['jinx', 'caitlyn', 'ashe', 'vayne', 'kaisa', 'ezreal', 'lucian'];
  if (adcs.includes(name) && (keywords.includes('ranged') || keywords.includes('damage') || keywords.includes('carry'))) {
    bonus += 15;
  }
  
  // 序盤強い系
  const earlyGame = ['pantheon', 'renekton', 'draven', 'leblanc', 'elise'];
  if (earlyGame.includes(name) && (keywords.includes('early') || keywords.includes('aggressive'))) {
    bonus += 10;
  }
  
  // 後半強い系
  const lateGame = ['kayle', 'nasus', 'veigar', 'kassadin', 'vayne'];
  if (lateGame.includes(name) && (keywords.includes('late') || keywords.includes('scaling'))) {
    bonus += 10;
  }
  
  return bonus;
}

// 結果画面を表示（v9 - 全172体対応）
function displayResult(moodType) {
  const resultMessage = moodResultMessages[moodType];
  
  // 全172体のチャンピオンを候補にする
  let allChampions = [
    ...championsByMood.aggressive,
    ...championsByMood.supportive,
    ...championsByMood.tactical,
    ...championsByMood.balanced
  ];
  
  console.log(`🎯 全${allChampions.length}体のチャンピオンから選択します`);
  
  // レーンで絞り込み（オプション）
  if (selectedLane) {
    allChampions = filterChampionsByLane(allChampions, selectedLane);
    console.log(`🎯 ${selectedLane}レーンで絞り込み: ${allChampions.length}体`);
  }
  
  // 各チャンピオンのタイプを取得してスコアを計算
  const championScores = allChampions.map(champion => {
    // チャンピオンがどのタイプに属しているか判定
    const championType = getChampionType(champion);
    
    // タイプ一致ボーナス（診断結果と同じタイプなら +50点）
    const typeMatchBonus = (championType === moodType) ? 50 : 0;
    
    return {
      ...champion,
      championType: championType,  // デバッグ用
      score: calculateChampionScore(champion, moodType) + typeMatchBonus
    };
  });
  
  // スコアでソート（降順）
  championScores.sort((a, b) => b.score - a.score);
  
  // トップ3を取得
  const top3Champions = championScores.slice(0, 3);
  
  console.log('🏆 トップ3チャンピオン:', top3Champions.map((c, i) => `${i+1}位: ${c.nameJa} (${c.score.toFixed(1)}点)`));
  
  // タイトルと説明
  document.getElementById('mood-result-title').innerHTML = `${resultMessage.emoji} ${resultMessage.title}`;
  
  let description = resultMessage.description;
  description += `<br><span style="color: #888; font-size: 0.9em;">✨ 全172体のチャンピオンから選出</span>`;
  
  if (selectedLane) {
    const laneKey = `moodQuiz.${selectedLane}`;
    const laneName = t(laneKey) || selectedLane;
    description += `<br><span style="color: var(--primary-color);">🎯 ${laneName}${t('moodQuiz.fromLane') || 'のチャンピオンから選びました'}</span>`;
  }
  document.getElementById('mood-result-description').innerHTML = description;
  
  // スコアグラフを表示
  displayScoreChart();
  
  // おすすめチャンピオンを順位付きで表示
  const championList = document.getElementById('mood-champion-list');
  championList.innerHTML = '';
  
  // トップ3を順位付きで表示
  top3Champions.forEach((champion, index) => {
    const rank = index + 1;
    const championCard = createRankedChampionCard(champion, rank);
    championList.appendChild(championCard);
  });
  
  // 「すべて見る」ボタンを追加
  const showAllButton = document.createElement('button');
  showAllButton.className = 'mood-show-all-btn';
  const showAllText = t('moodQuiz.showAll') || 'すべて見る';
  showAllButton.innerHTML = `📋 ${showAllText}（${t('moodQuiz.total') || '全'}${allChampions.length}${t('moodQuiz.champions') || '体'}）`;
  showAllButton.onclick = () => showAllChampions(moodType, championScores);
  championList.appendChild(showAllButton);
  
  console.log('✅ 結果画面を表示しました');
}

// チャンピオンのタイプを取得（v9 - 全172体対応）
function getChampionType(champion) {
  // 各タイプのリストをチェックして、チャンピオンがどのタイプに属しているか判定
  if (championsByMood.aggressive.some(c => c.name === champion.name)) {
    return 'aggressive';
  }
  if (championsByMood.supportive.some(c => c.name === champion.name)) {
    return 'supportive';
  }
  if (championsByMood.tactical.some(c => c.name === champion.name)) {
    return 'tactical';
  }
  if (championsByMood.balanced.some(c => c.name === champion.name)) {
    return 'balanced';
  }
  return 'balanced'; // デフォルト
}

// レーンでチャンピオンを絞り込む（v5 - lanes配列対応）
function filterChampionsByLane(champions, lane) {
  // lanes配列を持つチャンピオンをフィルタリング
  const filtered = champions.filter(champion => {
    if (!champion.lanes || !Array.isArray(champion.lanes)) {
      return false;
    }
    // 選択されたレーンがlanes配列に含まれているかチェック
    return champion.lanes.some(l => l.lane === lane);
  });
  
  console.log(`  絞り込み結果: ${filtered.length}体 (元: ${champions.length}体)`);
  
  // 絞り込み結果が少なすぎる場合は全体を返す（最低3体確保）
  return filtered.length >= 3 ? filtered : champions;
}

// 順位付きチャンピオンカードを作成（v5 - レーン情報表示対応）
function createRankedChampionCard(champion, rank) {
  const card = document.createElement('div');
  card.className = `mood-champion-card mood-rank-${rank}`;
  
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image}.png`;
  
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  const rankText = {
    1: t('moodQuiz.rank1') || '1位',
    2: t('moodQuiz.rank2') || '2位',
    3: t('moodQuiz.rank3') || '3位'
  };
  
  // レーン情報を生成
  const roleText = getLaneDisplayText(champion, selectedLane);
  
  card.innerHTML = `
    <div class="mood-rank-badge">${medals[rank]} ${rankText[rank]}</div>
    <div class="mood-champion-image">
      <img src="${imageUrl}" alt="${champion.nameJa}" onerror="this.src='https://via.placeholder.com/120x120?text=${champion.name}'">
    </div>
    <div class="mood-champion-info">
      <h3 class="mood-champion-name">${champion.nameJa}</h3>
      <p class="mood-champion-name-en">${champion.name}</p>
      <p class="mood-champion-role">${roleText}</p>
      <p class="mood-champion-description">${champion.description}</p>
      <p class="mood-champion-score">${t('moodQuiz.compatibility') || '適合度'}: ${champion.score.toFixed(1)}${t('moodQuiz.points') || '点'}</p>
    </div>
  `;
  
  return card;
}

// 通常のチャンピオンカードを作成（v5 - レーン情報表示対応）
function createChampionCard(champion) {
  const card = document.createElement('div');
  card.className = 'mood-champion-card';
  
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image}.png`;
  
  // レーン情報を生成
  const roleText = getLaneDisplayText(champion, selectedLane);
  
  card.innerHTML = `
    <div class="mood-champion-image">
      <img src="${imageUrl}" alt="${champion.nameJa}" onerror="this.src='https://via.placeholder.com/120x120?text=${champion.name}'">
    </div>
    <div class="mood-champion-info">
      <h3 class="mood-champion-name">${champion.nameJa}</h3>
      <p class="mood-champion-name-en">${champion.name}</p>
      <p class="mood-champion-role">${roleText}</p>
      <p class="mood-champion-description">${champion.description}</p>
      <p class="mood-champion-score">${t('moodQuiz.compatibility') || '適合度'}: ${champion.score.toFixed(1)}${t('moodQuiz.points') || '点'}</p>
    </div>
  `;
  
  return card;
}

// レーン情報の表示テキストを生成
function getLaneDisplayText(champion, selectedLane) {
  if (!champion.lanes || !Array.isArray(champion.lanes)) {
    return champion.role || '—';
  }
  
  const laneNames = {
    'top': 'トップ',
    'jungle': 'ジャングル',
    'mid': 'ミッド',
    'adc': 'ADC',
    'support': 'サポート'
  };
  
  const priorityLabels = {
    'main': '',
    'viable': ' (サブ)',
    'niche': ' (ニッチ)',
    'off-meta': ' (オフメタ)'
  };
  
  // 選択されたレーンがある場合、そのレーンを強調表示
  if (selectedLane) {
    const matchedLane = champion.lanes.find(l => l.lane === selectedLane);
    if (matchedLane) {
      const laneName = laneNames[matchedLane.lane];
      const label = priorityLabels[matchedLane.priority];
      return `${laneName}${label}`;
    }
  }
  
  // メインレーンのみ表示
  const mainLanes = champion.lanes
    .filter(l => l.priority === 'main')
    .map(l => laneNames[l.lane])
    .join('/');
  
  return mainLanes || '—';
}

// スコアチャートを表示
function displayScoreChart() {
  const chartContainer = document.getElementById('mood-score-chart');
  chartContainer.innerHTML = '';
  
  const maxScore = Math.max(...Object.values(moodScores));
  
  const scoreLabels = {
    aggressive: '⚔️ アグレッシブ',
    supportive: '💖 サポーティブ',
    tactical: '🧠 タクティカル'
  };
  
  Object.keys(moodScores).forEach(type => {
    const score = moodScores[type];
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    const barContainer = document.createElement('div');
    barContainer.className = 'mood-score-bar-container';
    
    barContainer.innerHTML = `
      <div class="mood-score-label">${scoreLabels[type]}</div>
      <div class="mood-score-bar-wrapper">
        <div class="mood-score-bar mood-score-${type}" style="width: ${percentage}%"></div>
      </div>
      <div class="mood-score-value">${score}</div>
    `;
    
    chartContainer.appendChild(barContainer);
  });
}

// すべてのチャンピオンを表示
function showAllChampions(moodType, championScores) {
  const championList = document.getElementById('mood-champion-list');
  championList.innerHTML = '';
  
  // ヘッダーを追加
  const header = document.createElement('div');
  header.className = 'mood-all-champions-header';
  header.innerHTML = `
    <h3>📋 ${moodResultMessages[moodType].emoji} ${moodResultMessages[moodType].title} - 全${championScores.length}体</h3>
    <p>あなたにおすすめのチャンピオン一覧です（適合度順）</p>
  `;
  championList.appendChild(header);
  
  // すべてのチャンピオンを表示
  championScores.forEach(champion => {
    const championCard = createChampionCard(champion);
    championList.appendChild(championCard);
  });
  
  // 「戻る」ボタンを追加
  const backButton = document.createElement('button');
  backButton.className = 'mood-back-btn';
  backButton.textContent = '🔙 最初の表示に戻る';
  backButton.onclick = () => displayResult(moodType);
  championList.appendChild(backButton);
  
  // 一番上にスクロール
  championList.scrollTop = 0;
  
  console.log(`✅ 全${championScores.length}体のチャンピオンを表示しました`);
}

// もう一度診断
function retryMoodQuiz() {
  startMoodQuiz();
}

// ホームに戻る
function backToMoodQuizHome() {
  showScreen('mood-quiz-home-screen');
}

// 診断を終了してモード選択へ
function exitMoodQuiz() {
  if (confirm('気分診断を終了しますか？')) {
    showScreen('mode-select-screen');
  }
}

// グローバルスコープに主要関数を露出
window.retryMoodQuiz = retryMoodQuiz;
window.backToMoodQuizHome = backToMoodQuizHome;
window.exitMoodQuiz = exitMoodQuiz;
window.goBackQuestion = goBackQuestion;

console.log('✅ 気分診断ロジックを読み込みました（v9 - 全172体対応版 - マルチレーン対応 & 順位表示）');
console.log('✅ startMoodQuiz 関数が定義されました:', typeof startMoodQuiz);
console.log('✅ グローバルスコープに登録されました:', typeof window.startMoodQuiz);
console.log('📦 登録された関数:', {
  startMoodQuiz: typeof window.startMoodQuiz,
  retryMoodQuiz: typeof window.retryMoodQuiz,
  backToMoodQuizHome: typeof window.backToMoodQuizHome,
  exitMoodQuiz: typeof window.exitMoodQuiz,
  goBackQuestion: typeof window.goBackQuestion
});
console.log('🌟 新機能: 全172体のチャンピオンから最適なマッチを選択します！');
