const wordDisplay = document.getElementById('word-display');
const textInput = document.getElementById('text-input');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const feedbackDisplay = document.getElementById('feedback');
const startButton = document.getElementById('start-button');
const difficultySelect = document.getElementById('difficulty'); // 新しく追加

// 単語リストを難易度とスコアを含むオブジェクトの配列に構造化
const wordSets = {
  easy: [
    { word: "cat", score: 10 },
    { word: "dog", score: 10 },
    { word: "sun", score: 10 },
    { word: "moon", score: 10 },
    { word: "book", score: 10 },
    { word: "tree", score: 10 },
    { word: "fish", score: 10 },
    { word: "bird", score: 10 },
    { word: "frog", score: 10 }
  ],
  normal: [
    { word: "apple", score: 20 },
    { word: "banana", score: 20 },
    { word: "cherry", score: 20 },
    { word: "dragon", score: 20 },
    { word: "flower", score: 20 },
    { word: "grape", score: 20 },
    { word: "house", score: 20 },
    { word: "island", score: 20 },
    { word: "jacket", score: 20 },
    { word: "lemon", score: 20 }
  ],
  hard: [
    { word: "xylophone", score: 30 },
    { word: "umbrella", score: 30 },
    { word: "strawberry", score: 30 },
    { word: "microphone", score: 30 },
    { word: "quadruple", score: 30 },
    { word: "kaleidoscope", score: 30 },
    { word: "labyrinth", score: 30 },
    { word: "metamorphosis", score: 30 },
    { word: "onomatopoeia", score: 30 },
    { word: "rhythm", score: 30 }
  ]
};

let currentWordData = null; // 現在表示されている単語のデータ（単語とスコア）
let score = 0;
let time = 60;
let timer;
let gameStarted = false;
let selectedDifficulty = 'easy'; // デフォルトの難易度

// 新しい単語を表示する関数
function showNewWord() {
  const wordsForDifficulty = wordSets[selectedDifficulty];
  const randomIndex = Math.floor(Math.random() * wordsForDifficulty.length);
  currentWordData = wordsForDifficulty[randomIndex]; // 単語データ全体を保存
  wordDisplay.textContent = currentWordData.word;
  textInput.value = ''; // 入力欄をクリア
  feedbackDisplay.textContent = ''; // フィードバックをクリア
}

// ゲームの開始
function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  score = 0;
  time = 60;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  startButton.disabled = true; // 開始ボタンを無効化
  textInput.disabled = false; // 入力欄を有効化
  difficultySelect.disabled = true; // 難易度選択を無効化
  textInput.focus(); // 入力欄にフォーカス

  selectedDifficulty = difficultySelect.value; // 選択された難易度を取得

  showNewWord();

  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

// ゲームの終了
function endGame() {
  clearInterval(timer);
  gameStarted = false;
  textInput.disabled = true; // 入力欄を無効化
  startButton.disabled = false; // 開始ボタンを有効化
  difficultySelect.disabled = false; // 難易度選択を有効化
  wordDisplay.textContent = "ゲーム終了！スコア: " + score;
  feedbackDisplay.textContent = '';
  alert(`ゲーム終了！あなたのスコアは ${score} です！`);
}

// 入力イベントの処理
textInput.addEventListener('input', () => {
  if (!gameStarted || !currentWordData) return; // ゲームが開始していない、または単語データがない場合は何もしない

  const inputText = textInput.value;

  if (inputText === currentWordData.word) { // 正解の場合
    score += currentWordData.score; // 単語のスコアを加算
    scoreDisplay.textContent = score;
    feedbackDisplay.textContent = `正解！ (+${currentWordData.score}点)`;
    feedbackDisplay.style.color = 'green';
    showNewWord();
  } else if (currentWordData.word.startsWith(inputText)) {
    // 部分的に一致している場合
    feedbackDisplay.textContent = '';
  } else {
    // 間違っている場合
    feedbackDisplay.textContent = '不正解';
    feedbackDisplay.style.color = 'red';
  }
});

// 開始ボタンのクリックイベント
startButton.addEventListener('click', startGame);

// 初期設定
textInput.disabled = true; // ゲーム開始前は入力欄を無効に
