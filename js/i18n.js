// ========================================
// 多言語翻訳データ (i18n)
// ========================================
// 英語(en)、韓国語(ko)、中国語(zh)、日本語(ja)対応

const translations = {
  // 日本語
  ja: {
    // ヘッダー
    'header.title': 'Esports ワードウルフ',
    'header.connection.connected': '接続中',
    'header.connection.disconnected': '切断',
    'header.connection.connecting': '接続中...',
    
    // ゲーム選択画面
    'modeSelect.title': 'ゲームモード選択',
    'modeSelect.subtitle': 'どのモードで遊びますか？',
    'modeSelect.wordwolf': 'ワードウルフ',
    'modeSelect.wordwolfDesc': '少数派のウルフを見つけ出すゲーム',
    'modeSelect.wordwolfPlayers': '👥 3〜6人',
    'modeSelect.demacia': 'デマーシアに心を込めて',
    'modeSelect.demaciaDesc': 'セリフを演技して当ててもらうゲーム',
    'modeSelect.demaciaPlayers': '👥 3〜10人',
    
    'gameSelect.title': 'ゲームタイプ選択',
    'gameSelect.subtitle': 'どのゲームで遊びますか？',
    'gameSelect.backToMode': 'モード選択に戻る',
    'gameSelect.lolDesc': 'チャンピオン・アイテム・スキル',
    'gameSelect.valorantDesc': 'エージェント・武器・マップ',
    'gameSelect.tftDesc': 'ユニット・特性・アイテム',
    
    // ホーム画面
    'home.title': 'ワードウルフゲーム',
    'home.titleLol': 'League of Legends ワードウルフ',
    'home.titleValorant': 'VALORANT ワードウルフ',
    'home.titleTft': 'Teamfight Tactics ワードウルフ',
    'home.demaciaTitleLol': 'デマーシアに心を込めて (LOL)',
    'home.demaciaTitleValorant': 'デマーシアに心を込めて (VALORANT)',
    'home.backToSelect': 'ゲーム選択に戻る',
    'home.backToModeSelect': 'モード選択に戻る',
    'home.backToGameType': 'ゲーム選択に戻る',
    'home.selectMode': 'ゲームモードを選択',
    'home.modeWordwolf': 'ワードウルフ',
    'home.modeDemacia': 'デマーシアに心を込めて',
    'home.create': 'ルームを作成',
    'home.join': 'ルームに参加',
    'home.rules': 'ルール説明',
    
    // デマーシアゲーム
    'demacia.performTitle': '演技タイム',
    'demacia.phrase': 'セリフ',
    'demacia.character': 'キャラクター',
    'demacia.yourSituation': 'あなたのシチュエーション',
    'demacia.currentPerformer': '現在の演技者',
    'demacia.next': '次へ',
    'demacia.votingTitle': '投票タイム',
    'demacia.votingInstruction': '各プレイヤーがどのシチュエーションを演じていたか投票してください',
    'demacia.submitVote': '投票する',
    'demacia.resultTitle': 'ラウンド結果',
    'demacia.scores': '現在のスコア',
    'demacia.nextRound': '次のラウンドへ',
    'demacia.finalResults': '最終結果',
    'demacia.winner': '優勝',
    
    // ルーム作成画面
    'create.title': 'ルーム作成',
    'create.playerName': 'プレイヤー名',
    'create.playerNamePlaceholder': '名前を入力',
    'create.playerCount': 'プレイ人数',
    'create.timer': '検討時間（分）',
    'create.categories': 'お題カテゴリー',
    // LOL
    'create.category.champions': 'チャンピオン',
    'create.category.items': 'アイテム',
    'create.category.skills': 'スキル・能力',
    'create.category.map': 'マップ・レーン',
    'create.category.spells': 'スペル',
    // VALORANT
    'create.category.agents': 'エージェント',
    'create.category.weapons': '武器',
    'create.category.abilities': 'アビリティ',
    'create.category.maps': 'マップ',
    'create.category.terms': 'ゲーム用語',
    // TFT
    'create.category.units': 'ユニット',
    'create.category.traits': '特性',
    'create.category.tftItems': 'アイテム',
    'create.category.tftTerms': 'ゲーム用語',
    // デマーシア：LOL用ジャンル
    'create.situationGenres': 'シチュエーションジャンル',
    'create.genre.battle': '戦闘シーン',
    'create.genre.victory': '勝利・エース',
    'create.genre.emotion': '感情表現',
    'create.genre.strategy': '戦略・判断',
    'create.genre.teamwork': 'チームワーク',
    'create.genre.casual': 'カジュアル',
    // デマーシア：VALORANT用ジャンル
    'create.genre.clutch': 'クラッチ状況',
    'create.genre.ace': 'エース獲得',
    'create.genre.ability': 'アビリティ使用',
    'create.genre.teamworkVal': 'チーム連携',
    'create.genre.defuse': '設置・解除',
    'create.genre.humor': 'ユーモア',
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
    'game.title': '検討タイム',
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
    'result.topics': 'お題',
    'result.wolfWord': 'ウルフのワード',
    'result.citizenWord': '市民のワード',
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
    'alert.discussionEnd': '検討時間が終了しました！',
    
    // フッター
    'footer.fanMade': '🎮 Riot Games（League of Legends / VALORANT）ファンによる非公式ゲームサイト',
    'footer.notAffiliated': '本サイトは Riot Games によって承認されたものではありませんが、Riot Games の Legal Jibber Jabber ポリシーに準拠して運営されています',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.copyright': '著作権ポリシー',
    
    // デマーシアゲーム
    'demacia.selectPerformerTitle': '演技者を選択',
    'demacia.phrase': 'セリフ',
    'demacia.character': 'キャラクター',
    'demacia.randomPerformer': 'ランダムに選ぶ',
    'demacia.or': 'または',
    'demacia.performTitle': '演技タイム',
    'demacia.yourSituation': 'あなたのシチュエーション',
    'demacia.currentPerformer': '現在の演技者',
    'demacia.performInstruction': '上記のシチュエーションで、このセリフを演技してください！',
    'demacia.performWaiting': '他のプレイヤーは演技を見て、どのシチュエーションか推理してください。',
    'demacia.startVoting': '投票を開始',
    'demacia.performerWait': '他のプレイヤーが投票中...',
    'demacia.votingTitle': '投票タイム',
    'demacia.votingInstruction': '演技者はどのシチュエーションを演じていましたか？',
    'demacia.selectSituation': 'どのシチュエーションで言っていると思いますか？',
    'demacia.submitVote': '投票する',
    'demacia.confirmVote': '投票する',
    'demacia.roundResult': 'ラウンド結果',
    'demacia.resultTitle': 'ラウンド結果',
    'demacia.correctSituation': '正解',
    'demacia.correctCount': '正解者数: {count}人',
    'demacia.performerScore': '{performer}の獲得スコア: {score}点',
    'demacia.nextRound': '次のラウンドへ',
    'demacia.showResults': '最終結果を見る',
    'demacia.finalResults': '最終結果',
    'demacia.scores': '現在のスコア',
    'alert.selectSituation': 'シチュエーションを選択してください'
  },
  
  // 英語
  en: {
    'header.title': 'Esports Word Wolf',
    'header.connection.connected': 'Connected',
    'header.connection.disconnected': 'Disconnected',
    'header.connection.connecting': 'Connecting...',
    
    // Mode Selection Screen
    'modeSelect.title': 'Game Mode Selection',
    'modeSelect.subtitle': 'Which mode do you want to play?',
    'modeSelect.wordwolf': 'Word Wolf',
    'modeSelect.wordwolfDesc': 'Find the hidden minority wolf',
    'modeSelect.wordwolfPlayers': '👥 3-6 Players',
    'modeSelect.demacia': 'With Love from Demacia',
    'modeSelect.demaciaDesc': 'Act out lines and guess the situation',
    'modeSelect.demaciaPlayers': '👥 3-10 Players',
    
    'gameSelect.title': 'Game Type Selection',
    'gameSelect.subtitle': 'Which game do you want to play?',
    'gameSelect.backToMode': 'Back to Mode',
    'gameSelect.lolDesc': 'Champions, Items, Skills',
    'gameSelect.valorantDesc': 'Agents, Weapons, Maps',
    'gameSelect.tftDesc': 'Units, Traits, Items',
    
    'home.title': 'Word Wolf Game',
    'home.titleLol': 'League of Legends Word Wolf',
    'home.titleValorant': 'VALORANT Word Wolf',
    'home.titleTft': 'Teamfight Tactics Word Wolf',
    'home.demaciaTitleLol': 'With Love from Demacia (LOL)',
    'home.demaciaTitleValorant': 'With Love from Demacia (VALORANT)',
    'home.backToSelect': 'Back to Game Select',
    'home.backToModeSelect': 'Back to Mode',
    'home.backToGameType': 'Back to Game Select',
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
    'create.category.agents': 'Agents',
    'create.category.weapons': 'Weapons',
    'create.category.abilities': 'Abilities',
    'create.category.maps': 'Maps',
    'create.category.terms': 'Game Terms',
    'create.category.units': 'Units',
    'create.category.traits': 'Traits',
    'create.category.tftItems': 'Items',
    'create.category.tftTerms': 'Game Terms',
    // Demacia: LOL Genres
    'create.situationGenres': 'Situation Genres',
    'create.genre.battle': 'Battle Scene',
    'create.genre.victory': 'Victory/Ace',
    'create.genre.emotion': 'Emotion Expression',
    'create.genre.strategy': 'Strategy/Decision',
    'create.genre.teamwork': 'Teamwork',
    'create.genre.casual': 'Casual',
    // Demacia: VALORANT Genres
    'create.genre.clutch': 'Clutch Situation',
    'create.genre.ace': 'Ace Moment',
    'create.genre.ability': 'Ability Usage',
    'create.genre.teamworkVal': 'Team Coordination',
    'create.genre.defuse': 'Plant/Defuse',
    'create.genre.humor': 'Humor',
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
    'result.topics': 'Topics',
    'result.wolfWord': 'Wolf Word',
    'result.citizenWord': 'Citizen Word',
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
    'footer.fanMade': '🎮 Unofficial Riot Games (LoL / VALORANT) Fan Game Site',
    'footer.notAffiliated': 'Not endorsed by Riot Games, but complies with Riot Games\' Legal Jibber Jabber policy',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': 'Copyright Policy'
  },
  
  // 韓国語
  ko: {
    'header.title': '이스포츠 워드울프',
    'header.connection.connected': '연결됨',
    'header.connection.disconnected': '연결 끊김',
    'header.connection.connecting': '연결 중...',
    
    // 모드 선택 화면
    'modeSelect.title': '게임 모드 선택',
    'modeSelect.subtitle': '어떤 모드로 플레이하시겠습니까?',
    'modeSelect.wordwolf': '워드울프',
    'modeSelect.wordwolfDesc': '소수파 늑대를 찾아내는 게임',
    'modeSelect.wordwolfPlayers': '👥 3~6명',
    'modeSelect.demacia': '데마시아에 진심을 담아',
    'modeSelect.demaciaDesc': '대사를 연기하고 상황을 맞히는 게임',
    'modeSelect.demaciaPlayers': '👥 3~10명',
    
    'gameSelect.title': '게임 타입 선택',
    'gameSelect.subtitle': '어떤 게임으로 플레이하시겠습니까?',
    'gameSelect.backToMode': '모드 선택으로 돌아가기',
    'gameSelect.lolDesc': '챔피언, 아이템, 스킬',
    'gameSelect.valorantDesc': '요원, 무기, 맵',
    'gameSelect.tftDesc': '유닛, 특성, 아이템',
    
    'home.title': '워드울프 게임',
    'home.titleLol': 'League of Legends 워드울프',
    'home.titleValorant': 'VALORANT 워드울프',
    'home.titleTft': 'Teamfight Tactics 워드울프',
    'home.demaciaTitleLol': '데마시아에 진심을 담아 (LOL)',
    'home.demaciaTitleValorant': '데마시아에 진심을 담아 (VALORANT)',
    'home.backToSelect': '게임 선택으로 돌아가기',
    'home.backToModeSelect': '모드 선택으로 돌아가기',
    'home.backToGameType': '게임 선택으로 돌아가기',
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
    'create.category.agents': '요원',
    'create.category.weapons': '무기',
    'create.category.abilities': '능력',
    'create.category.maps': '맵',
    'create.category.terms': '게임 용어',
    'create.category.units': '유닛',
    'create.category.traits': '특성',
    'create.category.tftItems': '아이템',
    'create.category.tftTerms': '게임 용어',
    // 데마시아: LOL 장르
    'create.situationGenres': '상황 장르',
    'create.genre.battle': '전투 장면',
    'create.genre.victory': '승리/에이스',
    'create.genre.emotion': '감정 표현',
    'create.genre.strategy': '전략/판단',
    'create.genre.teamwork': '팀워크',
    'create.genre.casual': '캐주얼',
    // 데마시아: VALORANT 장르
    'create.genre.clutch': '클러치 상황',
    'create.genre.ace': '에이스 획득',
    'create.genre.ability': '능력 사용',
    'create.genre.teamworkVal': '팀 협동',
    'create.genre.defuse': '설치/해제',
    'create.genre.humor': '유머',
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
    'result.topics': '주제',
    'result.wolfWord': '울프 단어',
    'result.citizenWord': '시민 단어',
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
    'footer.fanMade': '🎮 Riot Games (LoL / VALORANT) 팬이 만든 비공식 게임 사이트',
    'footer.notAffiliated': 'Riot Games의 승인을 받지 않았으나, Riot Games의 Legal Jibber Jabber 정책을 준수합니다',
    'footer.privacy': '개인정보 처리방침',
    'footer.terms': '이용약관',
    'footer.copyright': '저작권 정책'
  },
  
  // 中国語（簡体字）
  zh: {
    'header.title': '电竞狼人游戏',
    'header.connection.connected': '已连接',
    'header.connection.disconnected': '已断开',
    'header.connection.connecting': '连接中...',
    
    // 模式选择界面
    'modeSelect.title': '游戏模式选择',
    'modeSelect.subtitle': '您想玩哪个模式？',
    'modeSelect.wordwolf': '狼人游戏',
    'modeSelect.wordwolfDesc': '找出隐藏的少数派狼人',
    'modeSelect.wordwolfPlayers': '👥 3-6名玩家',
    'modeSelect.demacia': '用心来自德玛西亚',
    'modeSelect.demaciaDesc': '表演台词并猜测情境',
    'modeSelect.demaciaPlayers': '👥 3-10名玩家',
    
    'gameSelect.title': '游戏类型选择',
    'gameSelect.subtitle': '您想玩哪个游戏？',
    'gameSelect.backToMode': '返回模式选择',
    'gameSelect.lolDesc': '英雄、物品、技能',
    'gameSelect.valorantDesc': '特工、武器、地图',
    'gameSelect.tftDesc': '棋子、特质、装备',
    
    'home.title': '狼人游戏',
    'home.titleLol': 'League of Legends 狼人游戏',
    'home.titleValorant': 'VALORANT 狼人游戏',
    'home.titleTft': 'Teamfight Tactics 狼人游戏',
    'home.demaciaTitleLol': '用心来自德玛西亚 (LOL)',
    'home.demaciaTitleValorant': '用心来自德玛西亚 (VALORANT)',
    'home.backToSelect': '返回游戏选择',
    'home.backToModeSelect': '返回模式选择',
    'home.backToGameType': '返回游戏选择',
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
    'create.category.agents': '特工',
    'create.category.weapons': '武器',
    'create.category.abilities': '技能',
    'create.category.maps': '地图',
    'create.category.terms': '游戏术语',
    'create.category.units': '棋子',
    'create.category.traits': '特质',
    'create.category.tftItems': '装备',
    'create.category.tftTerms': '游戏术语',
    // 德玛西亚: LOL 类型
    'create.situationGenres': '情境类型',
    'create.genre.battle': '战斗场景',
    'create.genre.victory': '胜利/Ace',
    'create.genre.emotion': '情感表达',
    'create.genre.strategy': '策略/决策',
    'create.genre.teamwork': '团队合作',
    'create.genre.casual': '休闲',
    // 德玛西亚: VALORANT 类型
    'create.genre.clutch': '残局情况',
    'create.genre.ace': '全队击杀',
    'create.genre.ability': '技能使用',
    'create.genre.teamworkVal': '团队协作',
    'create.genre.defuse': '安装/拆除',
    'create.genre.humor': '幽默',
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
    'result.topics': '主题',
    'result.wolfWord': '狼人词汇',
    'result.citizenWord': '平民词汇',
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
    'footer.fanMade': '🎮 Riot Games (LoL / VALORANT) 粉丝非官方游戏网站',
    'footer.notAffiliated': '未经 Riot Games 授权，但遵守 Riot Games 的 Legal Jibber Jabber 政策',
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
