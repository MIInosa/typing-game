const wordDisplay = document.getElementById('word-display');
const textInput = document.getElementById('text-input');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const feedbackDisplay = document.getElementById('feedback');
const startButton = document.getElementById('start-button');

const words = [
  "apple", "banana", "cherry", "dragon", "elephant", "flower", "grape",
  "house", "island", "jacket", "kettle", "lemon", "mango", "noodle",
  "orange", "pencil", "queen", "rabbit", "strawberry", "tiger",
  "umbrella", "violin", "window", "xylophone", "yogurt", "zebra"
];

let currentWord = '';
let score = 0;
let time = 60;
let timer;
let gameStarted = false;

// 新しい単語を表示する関数
function showNewWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  wordDisplay.textContent = currentWord;
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
  textInput.focus(); // 入力欄にフォーカス

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
  wordDisplay.textContent = "ゲーム終了！スコア: " + score;
  feedbackDisplay.textContent = '';
  alert(`ゲーム終了！あなたのスコアは ${score} です！`);
}

// 入力イベントの処理
textInput.addEventListener('input', () => {
  if (!gameStarted) return;

  const inputText = textInput.value;

  if (inputText === currentWord) {
    score++;
    scoreDisplay.textContent = score;
    feedbackDisplay.textContent = '正解！';
    feedbackDisplay.style.color = 'green';
    showNewWord();
  } else if (currentWord.startsWith(inputText)) {
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
