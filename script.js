const cssVar = getComputedStyle(document.querySelector(":root"));
const fsXSmall = parseFloat(cssVar.getPropertyValue("--fs-x-small")) * 16; // 1rem
const fsXLarge = parseFloat(cssVar.getPropertyValue("--fs-x-large")) * 16; // 2rem
const fs3XLarge = parseFloat(cssVar.getPropertyValue("--fs-xxx-large")) * 16; // 3rem

const doc = document.documentElement;
const nav = document.getElementById("nav");
const score = document.getElementById("score");
const keyboard = document.getElementById("keyboard");
const board = document.getElementById("board");
const boardRow = document.getElementsByClassName("board__row");
const ansBox = document.getElementsByClassName("ans__box");
const navButton = document.getElementsByClassName("nav__button");
const key = document.getElementsByClassName("key");
const keyChar = document.getElementsByClassName("key__char");
const keyTheme = document.getElementById("key__theme");
const keyBspace = document.getElementById("key__bspace");
const keyEnter = document.getElementById("key__enter");
const gameCount = document.getElementById("game__count");
const warn = document.getElementById("warn");
const warnText = document.getElementById("warn__text");
const warnLink = document.getElementById("warn__link");
const navPopup = document.getElementsByClassName("nav__popup");
const popup = document.getElementsByClassName("popup");
const close = document.getElementsByClassName("close");
const scoreWin = document.getElementById("score__win");
const scoreLose = document.getElementById("score__lose");
const statsGame = document.getElementById("stats__game");
const statsWin = document.getElementById("stats__win");
const statsStreak = document.getElementById("stats__streak");
const statsMaxStreak = document.getElementById("stats__maxstreak");
const ansDist = document.getElementsByClassName("ans__dist");
const darkMode = document.getElementById("dark__mode");
const background = document.getElementById("background");
const popupBox = document.getElementsByClassName("popup__box");
const navBox = document.getElementById("nav__box");

// DARK THEME
darkMode.addEventListener("click", () => {
  // background
  background.classList.toggle("bg-dark");
  // navigation
  nav.classList.toggle("col-white");
  navBox.classList.toggle("b-col-white-alt");
  for (let i = 0; i < navButton.length; i++) {
    navButton[i].classList.toggle("col-white-alt");
  };
  // score
  score.classList.toggle("col-white");
  // board
  board.classList.toggle("col-white");
  // keyboard
  // for (let i = 0; i < key.length; i++) {
  //   key[i].classList.toggle("col-white");
  //   if (key[i].classList.contains("key__char")) {
  //     key[i].classList.toggle("bg-grey-light-alt");
  //   } else {
  //     key[i].classList.toggle("bg-grey-dark-alt");
  //   };
  // };
  // popup
  for (let i = 0; i < popupBox.length; i++) {
    popupBox[i].classList.toggle("bg-dark-rgba");
    popupBox[i].classList.toggle("col-white");
  };
});

// function to generate random integer 
function generateRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// function to generate answer key
function generateAnsKey() {
  for (let i = 0; i < data.length; i++) {
    rand = generateRandInt(0, data.length - 1);
    if (randList.includes(rand) === false) {
      randList.push(rand);
      break;
    };
  };
  ansKey = data[rand];
};

// function to add score
function scoreCounter(element, value) {
  element.textContent = value;
};

// INIT GAME COUNTER
let gameCounter = 1;
gameCount.textContent = '#' + gameCounter;
let scoreWinCount = 0;
scoreCounter(scoreWin, scoreWinCount);
let scoreLoseCount = 0;
scoreCounter(scoreLose, scoreLoseCount);
let isWin = -1;

// INIT STATISTICS
let statsGameCounter = 0;
scoreCounter(statsGame, statsGameCounter);
let statsWinCounter = 0;
scoreCounter(statsWin, statsWinCounter);
let statsStreakCounter = 0;
scoreCounter(statsStreak, statsStreakCounter);
let statsMaxStreakCounter = 0;
scoreCounter(statsMaxStreak, statsMaxStreakCounter);

// INIT ANSWER KEY
let randList = [];
let rand = 0;
let ansKey = '';
generateAnsKey();
let kbbiLink = 'https://kbbi.kemdikbud.go.id/';

// INIT WARNING TEXT
let warnTextNotmatch = 'Kata tidak dapat<br>ditemukan di KBBI';
let warnTextCorrect = 'Jawaban benar!';
let warnTextWrong = 'Jawaban yang benar adalah&#160;';
console.log(ansKey);

// INIT HEIGHT
let docHeight, navHeight, keyHeight;
let boardBoxHeight, boardHeight;
let boardRowHeight, boardAllRowsHeight = 0;
let ansBoxHeight, ansBoxFontSize;

// BOARD HEIGHT ON LOAD PAGE
window.addEventListener("load", () => {

  // calculate board box height
  docHeight = doc.clientHeight;
  navHeight = nav.clientHeight;
  scoreHeight = score.clientHeight;
  keyHeight = keyboard.clientHeight;
  boardBoxHeight = docHeight - (navHeight + scoreHeight + keyHeight);

  // get board row box and answer row box height
  for (let i = 0; i < boardRow.length; i++) {
    // board row box height
    boardRowHeight = boardRow[i].clientHeight;
    boardAllRowsHeight = boardAllRowsHeight + boardRowHeight;
  };

  // apply (board height or answer box height) and answer box font size
  if (boardAllRowsHeight < boardBoxHeight) {
    // board height
    boardHeight = boardBoxHeight - 2;
    board.style.height = boardHeight + 'px';
    // answer box font size
    for (let i = 0; i < ansBox.length; i++) {
      ansBoxFontSize = fsXLarge;
      ansBox[i].style.fontSize = ansBoxFontSize + 'px';
    };
  } else {
    ansBoxHeight = ((boardBoxHeight - 16) / (boardRow.length + 1)) - 4;
    for (let i = 0; i < ansBox.length; i++) {
      if (ansBoxHeight > fs3XLarge) {
        // answer box height
        ansBox[i].style.height = ansBoxHeight + 'px';
        // answer box font size
        ansBoxFontSize = ansBoxHeight - fsXLarge;
        ansBox[i].style.fontSize = ansBoxFontSize + 'px';
      } else {
        // answer box height
        ansBoxHeight = fs3XLarge;
        ansBox[i].style.height = ansBoxHeight + 'px';
        // answer box font size
        ansBoxFontSize = fsXSmall;
        ansBox[i].style.fontSize = ansBoxFontSize + 'px';
      };
    };
  };
});

// OPEN NAVIGATION POPUP
for (let i = 0; i < navButton.length; i++) {
  navButton[i].addEventListener("click", () => {
    navPopup[i].classList.toggle("hidden");
  });
};

// CLOSE NAVIGATION POPUP WITH KEYBOARD
document.addEventListener("keydown", (eventKey) => {
  if (eventKey.code === "Escape" || eventKey.code === "Enter" || eventKey.code === "NumpadEnter") {
    for (let i = 0; i < navPopup.length; i++) {
      if (navPopup[i].classList.contains("hidden") === false) {
        navPopup[i].classList.toggle("hidden");
      };
    };
  };
});

// INIT ANSWER COUNTER
let ansRowCount = 0; // max 6 row
let ansCharCount = 0; // max 5 char every row
let ansContent = '';
let ansUser = '';

// INIT DISTRIBUTION
let ansDistList = [0, 0, 0, 0, 0, 0];
let ansDistPct = [0, 0, 0, 0, 0, 0];
let maxDist = 0;

// function to calculate answer distribution
function calcAnsDist() {
  // add distribution
  for (let i = 0; i < ansDistList.length; i++) {
    if (i === ansRowCount) {
      ansDistList[ansRowCount] = ansDistList[ansRowCount] + 1;
    };
  };
  for (let i = 0; i < ansDist.length; i++) {
    ansDist[i].textContent = ansDistList[i];
  };
  // distribution percentage + max
  let sum = 0;
  for (let i = 0; i < ansDistList.length; i++) {
    sum = sum + ansDistList[i];
    if (ansDistList[i] > maxDist) {
      maxDist = ansDistList[i];
    };
  };
  for (let i = 0; i < ansDistPct.length; i++) {
    ansDistPct[i] = Math.round(ansDistList[i] / sum * 100);
  };
  for (let i = 0; i < ansDist.length; i++) {
    ansDist[i].style.width = ansDistPct[i] + '%';
    if (ansDist[i].textContent == maxDist) {
      if (ansDist[i].classList.contains("bg-grey")) {
        ansDist[i].classList.toggle("bg-grey");
      };
      if (ansDist[i].classList.contains("bg-orange")) {
        ansDist[i].classList.toggle("bg-orange");
      };
      if (ansDist[i].classList.contains("bg-green") === false) {
        ansDist[i].classList.toggle("bg-green");
      };
    };
    if (ansDist[i].textContent < maxDist && ansDist[i].textContent != 0) {
      if (ansDist[i].classList.contains("bg-grey")) {
        ansDist[i].classList.toggle("bg-grey");
      };
      if (ansDist[i].classList.contains("bg-green")) {
        ansDist[i].classList.toggle("bg-green");
      };
      if (ansDist[i].classList.contains("bg-orange") === false) {
        ansDist[i].classList.toggle("bg-orange");
      };
    };
  };
};

// function to fill answer box
function fillAnsBox() {
  let selectedAnsBox = boardRow[ansRowCount].children[ansCharCount];
  selectedAnsBox.classList.toggle("border");
  selectedAnsBox.textContent = ansContent;
  // add character counter
  ansCharCount = ansCharCount + 1;
};

// FILL ANSWER BOX WITH KEYBOARD
document.addEventListener("keydown", (eventKey) => {
  if (ansCharCount < 5 && ansRowCount < 6 && eventKey.code.substring(0, 3) === 'Key') {
    // fill answer box
    let popupShowList = []
    for (let i = 0; i < popup.length; i++) {
      let popupShow = popup[i].classList.contains("hidden") === false;
      popupShowList.push(popupShow);
    };
    if (popupShowList.includes(true) === false) {
      ansContent = eventKey.code.substring(3, 4);
      fillAnsBox();
    };
  };
});

// FILL ANSWER BOX WITH VIRTUAL KEYBOARD
for (let i = 0; i < keyChar.length; i++) {
  keyChar[i].addEventListener("click", () => {
    if (ansCharCount < 5 && ansRowCount < 6) {
      // fill answer box
      ansContent = keyChar[i].textContent;
      fillAnsBox();
    };
  });
};

// function to clear answer box
function clearAnsBox() {
  // substract character counter
  ansCharCount = ansCharCount - 1;
  // clear answer box
  let selectedAnsBox = boardRow[ansRowCount].children[ansCharCount];
  selectedAnsBox.classList.toggle("border");
  selectedAnsBox.textContent = '';
};

// CLEAR ANSWER BOX WITH KEYBOARD
document.addEventListener("keydown", (eventKey) => {
  if (ansCharCount > 0 && eventKey.code === 'Backspace' && warn.classList.contains("hidden")) {
    clearAnsBox();
  };
});

// CLEAR ANSWER BOX WITH VIRTUAL KEYBOARD
keyBspace.addEventListener("click", () => {
  if (ansCharCount > 0) {
    clearAnsBox();
  };
});

// function to generate next game
function nextGame(boolWinLose) {
  // next game counter
  isWin = boolWinLose;
  gameCounter = gameCounter + 1;
  gameCount.textContent = '#' + gameCounter;
  statsGameCounter = statsGameCounter + 1;
  statsGame.textContent = statsGameCounter;
  // reset row counter and character counter
  ansRowCount = 0;
  ansCharCount = 0;
  // next answer key
  generateAnsKey();
  console.log(ansKey);
};

// function to toggle keyboard color
function keyColorToggle(ansChar, elementKey, style) {
  for (let j = 0; j < elementKey.length; j++) {
    let keyCharContent = elementKey[j].textContent;
    let keyCharClass = [];
    for (let k = 0; k < elementKey[j].classList.length; k++) {
      let subsClass = elementKey[j].classList[k].substring(0, 2);
      keyCharClass.push(subsClass);
    };
    let bgIndex = keyCharClass.indexOf("bg");
    let bgName = elementKey[j].classList[bgIndex];
    if (keyCharContent === ansChar) {
      // toggle bg-green or bg-orange
      if (style === "bg-green" || style === "bg-orange") {
        if (elementKey[j].classList.contains(bgName)) {
          elementKey[j].classList.toggle(bgName);
          elementKey[j].classList.toggle(style);
        } else if (keyCharClass.includes("bg") === false) {
          elementKey[j].classList.toggle(style);
        };
        // toggle bg-grey
      } else if (style === "bg-grey") {
        if (keyCharClass.includes("bg") === false) {
          elementKey[j].classList.toggle(style);
        };
      };
    };
    if (keyCharContent === ansChar && keyCharClass.includes("bg") === false) {
      elementKey[j].classList.toggle("col-white");
    };
  };
};


// function to lock answer
function lockAns() {
  // user answer
  let boardRowChild = boardRow[ansRowCount].children;
  for (let i = 0; i < boardRowChild.length; i++) {
    ansUser = ansUser + boardRowChild[i].textContent;
  };
  if (data.includes(ansUser)) {
    // validation
    for (let i = 0; i < boardRowChild.length; i++) {
      let ansChar = boardRowChild[i].textContent;
      if (i === ansKey.indexOf(ansChar, i) && ansKey.includes(ansChar)) {
        boardRowChild[i].classList.toggle("bg-green");
        keyColorToggle(ansChar, keyChar, "bg-green");
      } else if (ansKey.includes(ansChar)) {
        boardRowChild[i].classList.toggle("bg-orange");
        keyColorToggle(ansChar, keyChar, "bg-orange");
      } else {
        boardRowChild[i].classList.toggle("bg-grey");
        keyColorToggle(ansChar, keyChar, "bg-grey");
      };
      boardRowChild[i].classList.toggle("col-white");
    };
    if (ansUser === ansKey) {
      // show correct message
      warn.classList.toggle("hidden");
      warnText.innerHTML = warnTextCorrect + '<br>' + '<b>' + ansKey + '</b>';
      if (warnLink.classList.contains("hidden")) {
        warnLink.classList.toggle("hidden");
      };
      warnLink.href = kbbiLink + 'entri/' + ansKey.toLowerCase();
      // next game
      calcAnsDist();
      nextGame(1);
    } else {
      if (ansRowCount < 5) {
        // add row counter and reset character counter
        ansRowCount = ansRowCount + 1;
        ansCharCount = 0;
      } else {
        // show correct message
        warn.classList.toggle("hidden");
        warnText.innerHTML = warnTextWrong + '<b>' + ansKey + '</b>';
        if (warnLink.classList.contains("hidden")) {
          warnLink.classList.toggle("hidden");
        };
        warnLink.href = kbbiLink + 'entri/' + ansKey.toLowerCase();
        // next game
        nextGame(0);
      };
    };
  } else {
    // show warning
    warn.classList.toggle("hidden");
    warnText.innerHTML = warnTextNotmatch;
    if (warnLink.classList.contains("hidden") === false) {
      warnLink.classList.toggle("hidden");
    };
  };
  ansUser = '';
};

// function to toggle border and color
function colorToggle(element, style) {
  if (element.classList.contains(style)) {
    element.classList.toggle(style);
  };
};

// function to toggle background color
function bgColorToggle(element) {
  if (element.classList.contains("bg-green")) {
    element.classList.toggle("bg-green");
  } else if (element.classList.contains("bg-orange")) {
    element.classList.toggle("bg-orange");
  } else if (element.classList.contains("bg-grey")) {
    element.classList.toggle("bg-grey");
  };
}

// function to add score and clear answer box
function addScore() {
  // add score
  if (ansRowCount === 0) {
    if (isWin === 1) {
      scoreWinCount = scoreWinCount + 1;
      scoreCounter(scoreWin, scoreWinCount);
      statsStreakCounter = statsStreakCounter + 1
      scoreCounter(statsStreak, statsStreakCounter);
      if (statsMaxStreakCounter < statsStreakCounter) {
        statsMaxStreakCounter = statsStreakCounter;
        scoreCounter(statsMaxStreak, statsMaxStreakCounter);
      };
    } else {
      scoreLoseCount = scoreLoseCount + 1;
      scoreCounter(scoreLose, scoreLoseCount);
      if (statsMaxStreakCounter < statsStreakCounter) {
        statsMaxStreakCounter = statsStreakCounter;
        scoreCounter(statsMaxStreak, statsMaxStreakCounter);
      };
      statsStreakCounter = 0;
      scoreCounter(statsStreak, statsStreakCounter);
    };
    if (statsGameCounter > 0) {
      statsWinCounter = Math.round(scoreWinCount / statsGameCounter * 100);
      scoreCounter(statsWin, statsWinCounter);
    };
    isWin = -1;
  };
  // clear answer box
  for (let i = 0; i < ansBox.length; i++) {
    ansBox[i].textContent = '';
    colorToggle(ansBox[i], "border");
    colorToggle(ansBox[i], "col-white");
    colorToggle(ansBox[i], "bg-green");
    colorToggle(ansBox[i], "bg-orange");
    colorToggle(ansBox[i], "bg-grey");
  };
  // clear keyboard
  for (let i = 0; i < keyChar.length; i++) {
    colorToggle(keyChar[i], "col-white");
    colorToggle(keyChar[i], "bg-green");
    colorToggle(keyChar[i], "bg-orange");
    colorToggle(keyChar[i], "bg-grey");
  };
};

// LOCK ANSWER WITH KEYBOARD
document.addEventListener("keydown", (eventKey) => {
  if (ansCharCount === 5 && ansRowCount < 6 && (eventKey.code === 'Escape' || eventKey.code === 'Enter' || eventKey.code === 'NumpadEnter')) {
    lockAns();
  } else if (warn.classList.contains("hidden") === false && (eventKey.code === 'Escape' || eventKey.code === 'Enter' || eventKey.code === 'NumpadEnter')) {
    addScore();
    warn.classList.toggle("hidden");
  };
});

// LOCK ANSWER WITH VIRTUAL KEYBOARD
keyEnter.addEventListener("click", () => {
  if (ansCharCount === 5 && ansRowCount < 6) {
    lockAns();
  };
});

// KEYBOARD THEME TOGGLE OUTLINE
// keyTheme.addEventListener("click", () => {
//   for (let i = 0; i < key.length; i++) {
//     key[i].classList.toggle("border-0");
//   };
//   document.activeElement.blur();
// });

// function to reset answer box
function resetAnsBox() {
  // reset character counter
  ansCharCount = 0;
  // clear answer box
  let selectedAnsBox = boardRow[ansRowCount].children;
  for (let i = 0; i < selectedAnsBox.length; i++) {
    selectedAnsBox[i].textContent = '';
  };
};

// CLEAR ALL ANSWER BOX WITH VIRTUAL KEYBOARD
keyTheme.addEventListener("click", () => {
  resetAnsBox();
});

// CLOSE POPUP
for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", () => {
    popup[i].classList.toggle("hidden");
    if (ansRowCount === 0 && ansCharCount === 0 && (isWin === 0 || isWin === 1)) {
      addScore();
    };
  });
};

// ACTIVE ELEMENT HANDLING
warnLink.addEventListener("click", () => {
  document.activeElement.blur();
});

// document.addEventListener("click", () => {
//   document.activeElement.blur();
// });