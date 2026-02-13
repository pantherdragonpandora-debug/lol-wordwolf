// ========================================
// 多言語翻訳データ (i18n)
// ========================================
// 英語(en)、韓国語(ko)、中国語(zh)、日本語(ja)対応

const translations = {
  // 日本語
  ja: {
    // ヘッダー
    'header.title': 'LOL ワードウルフ',
    'header.connection.connected': '接続中',
    'header.connection.disconnected': '切断',
    'header.connection.connecting': '接続中...',
    
    // ホーム画面
    'home.title': 'League of Legends<br>ワードウルフゲーム',
    'home.create': 'ルームを作成',
    'home.join': 'ルームに参加',
    'home.rules': 'ルール説明',
    
    // ルーム作成画面
    'create.title': 'ルーム作成',
    'create.playerName': 'プレイヤー名',
    'create.playerNamePlaceholder': '名前を入力',
    'create.playerCount': 'プレイ人数',
    'create.timer': '討論時間（分）',
    'create.categories': 'お題カテゴリー',
    'create.category.champions': 'チャンピオン',
    'create.category.items': 'アイテム',
    'create.category.skills': 'スキル・能力',
    'create.category.map': 'マップ・レーン',
    'create.category.spells': 'スペル',
    'create.createButton': '作成',
    'create.back': '戻る',
    
    // ルーム参加画面
    'join.title': 'ルームに参加',
    'join.roomId': 'ルームID',
    'join.roomIdPlaceholder': '6桁のルームID',
    'join.playerName': 'プレイヤー名',
    'join.playerNamePlaceholder': '名前を入力',
    'join.joinButton': '参加',
    'join.back': '戻る',
    
    // 待機室
    'waiting.title': '待機室',
    'waiting.roomId': 'ルームID:',
    'waiting.copyUrl': 'URLをコピー',
    'waiting.players': '参加プレイヤー',
    'waiting.host': 'ホスト',
    'waiting.startGame': 'ゲーム開始',
    'waiting.leave': '退出',
    
    // ゲーム画面
    'game.title': '討論タイム',
    'game.yourTopic': 'あなたのお題',
    'game.roleWolf': 'あなたはウルフです！',
    'game.roleCitizen': 'あなたは市民です',
    'game.chatPlaceholder': 'メッセージを入力...',
    'game.send': '送信',
    'game.endDiscussion': '投票へ進む',
    
    // 投票画面
    'voting.title': '投票タイム',
    'voting.question': '誰がウルフだと思いますか？',
    'voting.confirm': '投票確定',
    
    // 結果画面
    'result.title': '結果発表',
    'result.citizensWin': '市民の勝利！',
    'result.wolfWin': 'ウルフの勝利！',
    'result.wolfWas': 'ウルフは {wolf} でした',
    'result.votedOut': '追放されたのは {player} です',
    'result.voteResults': '投票結果',
    'result.votes': '票',
    'result.playAgain': 'もう一度',
    'result.backToHome': 'ホームへ',
    
    // アラート・メッセージ
    'alert.enterPlayerName': 'プレイヤー名を入力してください',
    'alert.selectCategory': 'カテゴリーを1つ以上選択してください',
    'alert.createFailed': 'ルーム作成に失敗しました',
    'alert.enterRoomIdAndName': 'ルームIDとプレイヤー名を入力してください',
    'alert.selectVote': '投票先を選択してください',
    'alert.votingComplete': '投票完了！他のプレイヤーの投票を待っています...',
    'alert.urlCopied': 'URLをコピーしました！',
    'alert.urlCopyFailed': 'URLのコピーに失敗しました',
    'alert.confirmLeave': 'ルームを退出しますか？',
    'alert.discussionEnd': '討論時間が終了しました！',
    
    // フッター
    'footer.fanMade': '⚠️ このサイトはファンが作成した非公式のウェブページです',
    'footer.notAffiliated': 'League of Legends および Riot Games とは一切関係ありません',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.copyright': '著作権ポリシー'
  },
  
  // 英語
  en: {
    'header.title': 'LOL Word Wolf',
    'header.connection.connected': 'Connected',
    'header.connection.disconnected': 'Disconnected',
    'header.connection.connecting': 'Connecting...',
    
    'home.title': 'League of Legends<br>Word Wolf Game',
    'home.create': 'Create Room',
    'home.join': 'Join Room',
    'home.rules': 'Rules',
    
    'create.title': 'Create Room',
    'create.playerName': 'Player Name',
    'create.playerNamePlaceholder': 'Enter your name',
    'create.playerCount': 'Player Count',
    'create.timer': 'Discussion Time (min)',
    'create.categories': 'Topic Categories',
    'create.category.champions': 'Champions',
    'create.category.items': 'Items',
    'create.category.skills': 'Skills & Abilities',
    'create.category.map': 'Map & Lanes',
    'create.category.spells': 'Spells',
    'create.createButton': 'Create',
    'create.back': 'Back',
    
    'join.title': 'Join Room',
    'join.roomId': 'Room ID',
    'join.roomIdPlaceholder': '6-digit Room ID',
    'join.playerName': 'Player Name',
    'join.playerNamePlaceholder': 'Enter your name',
    'join.joinButton': 'Join',
    'join.back': 'Back',
    
    'waiting.title': 'Waiting Room',
    'waiting.roomId': 'Room ID:',
    'waiting.copyUrl': 'Copy URL',
    'waiting.players': 'Players',
    'waiting.host': 'Host',
    'waiting.startGame': 'Start Game',
    'waiting.leave': 'Leave',
    
    'game.title': 'Discussion Time',
    'game.yourTopic': 'Your Topic',
    'game.roleWolf': 'You are the Wolf!',
    'game.roleCitizen': 'You are a Citizen',
    'game.chatPlaceholder': 'Type a message...',
    'game.send': 'Send',
    'game.endDiscussion': 'Go to Voting',
    
    'voting.title': 'Voting Time',
    'voting.question': 'Who do you think is the Wolf?',
    'voting.confirm': 'Confirm Vote',
    
    'result.title': 'Results',
    'result.citizensWin': 'Citizens Win!',
    'result.wolfWin': 'Wolf Wins!',
    'result.wolfWas': 'The Wolf was {wolf}',
    'result.votedOut': '{player} was voted out',
    'result.voteResults': 'Vote Results',
    'result.votes': 'votes',
    'result.playAgain': 'Play Again',
    'result.backToHome': 'Back to Home',
    
    'alert.enterPlayerName': 'Please enter your player name',
    'alert.selectCategory': 'Please select at least one category',
    'alert.createFailed': 'Failed to create room',
    'alert.enterRoomIdAndName': 'Please enter Room ID and Player Name',
    'alert.selectVote': 'Please select who to vote for',
    'alert.votingComplete': 'Vote complete! Waiting for other players...',
    'alert.urlCopied': 'URL copied!',
    'alert.urlCopyFailed': 'Failed to copy URL',
    'alert.confirmLeave': 'Do you want to leave the room?',
    'alert.discussionEnd': 'Discussion time is over!',
    
    // Footer
    'footer.fanMade': '⚠️ This is an unofficial fan-made website',
    'footer.notAffiliated': 'Not affiliated with League of Legends or Riot Games',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': 'Copyright Policy'
  },
  
  // 韓国語
  ko: {
    'header.title': 'LOL 워드울프',
    'header.connection.connected': '연결됨',
    'header.connection.disconnected': '연결 끊김',
    'header.connection.connecting': '연결 중...',
    
    'home.title': '리그 오브 레전드<br>워드울프 게임',
    'home.create': '방 만들기',
    'home.join': '방 참가',
    'home.rules': '규칙 설명',
    
    'create.title': '방 만들기',
    'create.playerName': '플레이어 이름',
    'create.playerNamePlaceholder': '이름을 입력하세요',
    'create.playerCount': '플레이 인원',
    'create.timer': '토론 시간 (분)',
    'create.categories': '주제 카테고리',
    'create.category.champions': '챔피언',
    'create.category.items': '아이템',
    'create.category.skills': '스킬 및 능력',
    'create.category.map': '맵 및 라인',
    'create.category.spells': '스펠',
    'create.createButton': '만들기',
    'create.back': '뒤로',
    
    'join.title': '방 참가',
    'join.roomId': '방 ID',
    'join.roomIdPlaceholder': '6자리 방 ID',
    'join.playerName': '플레이어 이름',
    'join.playerNamePlaceholder': '이름을 입력하세요',
    'join.joinButton': '참가',
    'join.back': '뒤로',
    
    'waiting.title': '대기실',
    'waiting.roomId': '방 ID:',
    'waiting.copyUrl': 'URL 복사',
    'waiting.players': '참가자',
    'waiting.host': '방장',
    'waiting.startGame': '게임 시작',
    'waiting.leave': '나가기',
    
    'game.title': '토론 시간',
    'game.yourTopic': '당신의 주제',
    'game.roleWolf': '당신은 울프입니다!',
    'game.roleCitizen': '당신은 시민입니다',
    'game.chatPlaceholder': '메시지를 입력하세요...',
    'game.send': '전송',
    'game.endDiscussion': '투표로 이동',
    
    'voting.title': '투표 시간',
    'voting.question': '누가 울프라고 생각하세요?',
    'voting.confirm': '투표 확정',
    
    'result.title': '결과 발표',
    'result.citizensWin': '시민 승리!',
    'result.wolfWin': '울프 승리!',
    'result.wolfWas': '울프는 {wolf}였습니다',
    'result.votedOut': '{player}가 추방되었습니다',
    'result.voteResults': '투표 결과',
    'result.votes': '표',
    'result.playAgain': '다시 하기',
    'result.backToHome': '홈으로',
    
    'alert.enterPlayerName': '플레이어 이름을 입력하세요',
    'alert.selectCategory': '카테고리를 하나 이상 선택하세요',
    'alert.createFailed': '방 만들기에 실패했습니다',
    'alert.enterRoomIdAndName': '방 ID와 플레이어 이름을 입력하세요',
    'alert.selectVote': '투표할 사람을 선택하세요',
    'alert.votingComplete': '투표 완료! 다른 플레이어를 기다리는 중...',
    'alert.urlCopied': 'URL이 복사되었습니다!',
    'alert.urlCopyFailed': 'URL 복사에 실패했습니다',
    'alert.confirmLeave': '방에서 나가시겠습니까?',
    'alert.discussionEnd': '토론 시간이 종료되었습니다!',
    
    // 푸터
    'footer.fanMade': '⚠️ 이 사이트는 팬이 만든 비공식 웹페이지입니다',
    'footer.notAffiliated': 'League of Legends 및 Riot Games와는 관련이 없습니다',
    'footer.privacy': '개인정보 처리방침',
    'footer.terms': '이용약관',
    'footer.copyright': '저작권 정책'
  },
  
  // 中国語（簡体字）
  zh: {
    'header.title': 'LOL 狼人游戏',
    'header.connection.connected': '已连接',
    'header.connection.disconnected': '已断开',
    'header.connection.connecting': '连接中...',
    
    'home.title': '英雄联盟<br>狼人游戏',
    'home.create': '创建房间',
    'home.join': '加入房间',
    'home.rules': '游戏规则',
    
    'create.title': '创建房间',
    'create.playerName': '玩家名称',
    'create.playerNamePlaceholder': '输入您的名字',
    'create.playerCount': '玩家人数',
    'create.timer': '讨论时间（分钟）',
    'create.categories': '主题类别',
    'create.category.champions': '英雄',
    'create.category.items': '装备',
    'create.category.skills': '技能与能力',
    'create.category.map': '地图与线路',
    'create.category.spells': '召唤师技能',
    'create.createButton': '创建',
    'create.back': '返回',
    
    'join.title': '加入房间',
    'join.roomId': '房间ID',
    'join.roomIdPlaceholder': '6位房间ID',
    'join.playerName': '玩家名称',
    'join.playerNamePlaceholder': '输入您的名字',
    'join.joinButton': '加入',
    'join.back': '返回',
    
    'waiting.title': '等待室',
    'waiting.roomId': '房间ID:',
    'waiting.copyUrl': '复制链接',
    'waiting.players': '参与玩家',
    'waiting.host': '房主',
    'waiting.startGame': '开始游戏',
    'waiting.leave': '离开',
    
    'game.title': '讨论时间',
    'game.yourTopic': '您的主题',
    'game.roleWolf': '您是狼人！',
    'game.roleCitizen': '您是平民',
    'game.chatPlaceholder': '输入消息...',
    'game.send': '发送',
    'game.endDiscussion': '进入投票',
    
    'voting.title': '投票时间',
    'voting.question': '您认为谁是狼人？',
    'voting.confirm': '确认投票',
    
    'result.title': '结果公布',
    'result.citizensWin': '平民胜利！',
    'result.wolfWin': '狼人胜利！',
    'result.wolfWas': '狼人是 {wolf}',
    'result.votedOut': '{player} 被投票出局',
    'result.voteResults': '投票结果',
    'result.votes': '票',
    'result.playAgain': '再玩一次',
    'result.backToHome': '返回主页',
    
    'alert.enterPlayerName': '请输入玩家名称',
    'alert.selectCategory': '请至少选择一个类别',
    'alert.createFailed': '创建房间失败',
    'alert.enterRoomIdAndName': '请输入房间ID和玩家名称',
    'alert.selectVote': '请选择要投票的玩家',
    'alert.votingComplete': '投票完成！等待其他玩家...',
    'alert.urlCopied': '链接已复制！',
    'alert.urlCopyFailed': '复制链接失败',
    'alert.confirmLeave': '确定要离开房间吗？',
    'alert.discussionEnd': '讨论时间结束！',
    
    // 页脚
    'footer.fanMade': '⚠️ 本站是粉丝制作的非官方网页',
    'footer.notAffiliated': '与英雄联盟及 Riot Games 无任何关联',
    'footer.privacy': '隐私政策',
    'footer.terms': '使用条款',
    'footer.copyright': '版权政策'
  }
};

// デフォルト言語
let currentLanguage = 'ja';

// 翻訳関数
function t(key, params = {}) {
  let text = translations[currentLanguage][key] || translations['en'][key] || key;
  
  // パラメータ置換
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });
  
  return text;
}

// 言語設定を保存
function saveLanguage(lang) {
  localStorage.setItem('lol_wordwolf_language', lang);
}

// 言語設定を読み込み
function loadLanguage() {
  const saved = localStorage.getItem('lol_wordwolf_language');
  return saved || 'ja';
}

// 言語を変更
function changeLanguage(lang) {
  currentLanguage = lang;
  saveLanguage(lang);
  updatePageLanguage();
}

// ページの言語を更新
function updatePageLanguage() {
  // data-i18n 属性を持つすべての要素を更新
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const text = t(key);
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = text;
    } else {
      element.innerHTML = text;
    }
  });
  
  // 言語ボタンのアクティブ状態を更新
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLanguage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// ページ読み込み時に言語を初期化
function initLanguage() {
  currentLanguage = loadLanguage();
  updatePageLanguage();
}
