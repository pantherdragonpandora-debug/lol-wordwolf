// ========================================
// デマーシアゲーム - ソロプレイモード（配信者向け）
// ========================================

// ソロプレイ用の状態管理
let soloCurrentPhrase = null;
let soloSelectedSituation = null;
let soloCorrectSituationIndex = null;

// ソロプレイモード開始
function startDemaciaSoloPlay() {
  console.log('🎯 ソロプレイモード開始');
  console.log('🎮 ゲームタイプ:', selectedGameType);
  
  // window.getRandomDemaciaPhraseを使用（demacia-data.jsで定義されている）
  if (typeof window.getRandomDemaciaPhrase === 'function') {
    soloCurrentPhrase = window.getRandomDemaciaPhrase(selectedGameType);
  } else {
    console.error('❌ getRandomDemaciaPhrase関数が見つかりません');
    alert('エラー: セリフデータが読み込まれていません');
    return;
  }
  
  if (!soloCurrentPhrase) {
    alert('セリフの取得に失敗しました');
    return;
  }
  
  console.log('📝 選択されたセリフ:', soloCurrentPhrase);
  
  // セリフ表示画面に遷移
  document.getElementById('demacia-solo-phrase').textContent = soloCurrentPhrase.text;
  document.getElementById('demacia-solo-character').textContent = soloCurrentPhrase.character || '';
  showScreen('demacia-solo-phrase-screen');
}

// シチュエーション表示
function showDemaciaSoloSituation() {
  console.log('🎯 シチュエーション表示');
  
  // ランダムにシチュエーションを選択
  soloCorrectSituationIndex = Math.floor(Math.random() * soloCurrentPhrase.situations.length);
  soloSelectedSituation = soloCurrentPhrase.situations[soloCorrectSituationIndex];
  
  console.log('🎯 選択されたシチュエーション:', soloSelectedSituation);
  
  // シチュエーション確認画面に表示
  document.getElementById('demacia-solo-situation-phrase').textContent = soloCurrentPhrase.text;
  document.getElementById('demacia-solo-situation-text').textContent = soloSelectedSituation.text;
  document.getElementById('demacia-solo-situation-difficulty').textContent = 
    `難易度: ${soloSelectedSituation.difficulty}`;
  
  showScreen('demacia-solo-situation-screen');
}

// 演技開始
function startDemaciaSoloPerform() {
  console.log('🎭 演技開始');
  
  // 演技中画面に表示
  document.getElementById('demacia-solo-perform-phrase').textContent = soloCurrentPhrase.text;
  
  showScreen('demacia-solo-perform-screen');
}

// 演技終了
function endDemaciaSoloPerform() {
  console.log('📝 演技終了 - 正解選択画面へ');
  
  // 正解選択画面に表示
  document.getElementById('demacia-solo-answer-phrase').textContent = soloCurrentPhrase.text;
  
  // シチュエーション選択肢を生成
  const optionsContainer = document.getElementById('demacia-solo-situation-options');
  optionsContainer.innerHTML = '';
  
  soloCurrentPhrase.situations.forEach((situation, index) => {
    const btn = document.createElement('button');
    btn.className = 'situation-option-btn';
    btn.textContent = `${index + 1}. ${situation.text}`;
    btn.onclick = () => {
      // 他のボタンの選択を解除
      document.querySelectorAll('.situation-option-btn').forEach(b => b.classList.remove('selected'));
      // 選択されたボタンをハイライト
      btn.classList.add('selected');
      // 結果発表ボタンを有効化
      document.getElementById('demacia-solo-reveal-answer-btn').disabled = false;
    };
    optionsContainer.appendChild(btn);
  });
  
  showScreen('demacia-solo-answer-screen');
}

// 結果発表
function revealDemaciaSoloAnswer() {
  console.log('🎉 結果発表');
  
  // 結果発表画面に表示
  document.getElementById('demacia-solo-result-phrase').textContent = soloCurrentPhrase.text;
  document.getElementById('demacia-solo-correct-situation').textContent = soloSelectedSituation.text;
  document.getElementById('demacia-solo-difficulty').textContent = 
    `難易度: ${soloSelectedSituation.difficulty}`;
  
  showScreen('demacia-solo-result-screen');
}

// 次のセリフで遊ぶ
function startDemaciaSoloNext() {
  console.log('🔄 次のセリフで遊ぶ');
  
  // 状態をリセット
  soloCurrentPhrase = null;
  soloSelectedSituation = null;
  soloCorrectSituationIndex = null;
  
  // 結果発表ボタンを無効化
  document.getElementById('demacia-solo-reveal-answer-btn').disabled = true;
  
  // 新しいゲームを開始
  startDemaciaSoloPlay();
}
