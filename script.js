// NAVIGATION
const navBttn = document.querySelectorAll(".nav-bttn");
const gameCounter = document.getElementById("game-counter");
const scoreWon = document.getElementById("score-won");
const scoreLose = document.getElementById("score-lose");
// BOARD
// const board = document.getElementById("board");
const boardWord = document.getElementsByClassName("board-word");
const boardChar = document.getElementsByClassName("board-char");
// KEYBOARD
const keybrdChar = document.getElementsByClassName("keybrd-char");
const keybrdErase = document.getElementById("keybrd-erase");
const keybrdBspace = document.getElementById("keybrd-bspace");
const keybrdEnter = document.getElementById("keybrd-enter");
// GAME STATISTICS
const statsGame = document.getElementById("stats-game");
const statsWon = document.getElementById("stats-won");
const statsStrCur = document.getElementById("stats-str-cur");
const statsStrMax = document.getElementById("stats-str-max");
const distAns = document.getElementsByClassName("dist-ans");
// GAME SETTINGS
const darkMode = document.getElementById("dark-mode");
// CORRECT/INCORRECT ANSWER MESSAGE
const popupClose = document.querySelectorAll(".popup-close");
const msgLink = document.getElementsByClassName("msg-link");
const msgKey = document.getElementsByClassName("msg-key");
const msgIncor = document.getElementById("msg-incor");
const msgWon = document.getElementById("msg-won");
const msgLose = document.getElementById("msg-lose");

// INIT ANSWER KEY
let randIntList = [];
let ansKey = '';
generateAnsKey();

// INIT ANSWER BOX
let boardWordCount = 0; // max 6 words
let boardCharCount = 0; // max 5 characters per word
let boardLastPos = 0;

// INIT USER'S ANSWER STATS
let userAnsWord = '';
let userAnsList = [];
let distAnsList = [0, 0, 0, 0, 0, 0];
let distAnsPctList = [0, 0, 0, 0, 0, 0];
let gameCount = parseInt(gameCounter.textContent);
let scoreWonCount = parseInt(scoreWon.textContent);
let scoreLoseCount = parseInt(scoreLose.textContent);
let statsGameCount = parseInt(statsGame.textContent);
let statsWonCount = parseInt(statsWon.textContent);
let statsStrCurCount = parseInt(statsStrCur.textContent);
let statsStrMaxCount = parseInt(statsStrMax.textContent);

// SUBMIT ANSWER WITH PHYSICAL KEYBOARD
document.addEventListener("keydown", (eventKey) => {
	let keyCode = eventKey.code;
	let isWon = false;
	// validate if keydown event is enter
	if (keyCode === 'Enter' || keyCode === 'NumpadEnter') {
		validateSubmitAns(isWon);
	};
});

// SUBMIT ANSWER WITH VIRTUAL KEYBOARD
keybrdEnter.addEventListener("click", () => {
	let isWon = false;
	validateSubmitAns(isWon);
});

// FILL ANSWER BOX WITH PHYSICAL KEYBOARD
document.addEventListener("keydown", (eventKey) => {
	let keyCode = eventKey.code;
	// validate if keydown event is alphabet
	if (keyCode.substring(0, 3) === 'Key') {
		// validate if answer box is fully filled
		if (boardCharCount === 5) {
			shakeAnsBox();
			setTimeout(shakeAnsBox, 500);
		};
		// validate if answer box is not fully filled
		if (boardWordCount < 6 && boardCharCount < 5) {
			// fill answer box
			let userAns = keyCode.substring(3, 4);
			fillAnsBox(userAns);
		};
	};
});

// FILL ANSWER BOX WITH VIRTUAL KEYBOARD
for (let i = 0; i < keybrdChar.length; i++) {
	keybrdChar[i].addEventListener("click", () => {
		// validate if answer box is fully filled
		if (boardCharCount === 5) {
			shakeAnsBox();
			setTimeout(shakeAnsBox, 500);
		};
		// validate if answer box is not fully filled
		if (boardWordCount < 6 && boardCharCount < 5) {
			// fill answer box
			let userAns = keybrdChar[i].textContent;
			fillAnsBox(userAns);
		};
	});
};

// CLEAR ALL ANSWER BOX WITH VIRTUAL KEYBOARD
keybrdErase.addEventListener("click", clearAnsBox);

// DELETE ANSWER BOX WITH PHYSICAL KEYBOARD
document.addEventListener("keydown", (eventKey) => {
	let keyCode = eventKey.code;
	// validate if keydown event is backspace
	if (keyCode === 'Backspace') { deleteAnsBox(); };
});

// DELETE ANSWER BOX WITH VIRTUAL KEYBOARD
keybrdBspace.addEventListener("click", deleteAnsBox);

// function to validate submitted answer
function validateSubmitAns(isWon) {
	// validate if answer box is fully filled
	if (boardWordCount < 6 && boardCharCount === 5) {
		// generate user's answer
		let boardWordChild = boardWord[boardWordCount].children
		for (let i = 0; i < boardWordChild.length; i++) {
			userAnsWord += boardWordChild[i].textContent;
		};
		// validate if user's answer is valid
		if (data.includes(userAnsWord)) {
			// validate if user's answer is not duplicated (save answer)
			if (userAnsList.includes(userAnsWord) === false) {
				userAnsList.push(userAnsWord);
				// validate if user's answer is true (game won)
				if (userAnsWord === ansKey) {
					// console.log('You Won!');
					isWon = true;
					// show message
					insertAnsKeyLink(ansKey);
					msgPopupTimer(msgWon, 3000);
					// generate stats
					generateStats(isWon);
					// reset box color and character
					resetBoxColor(boardChar);
					resetBoxChar(boardChar);
					resetBoxColor(keybrdChar);
				} else {
					// add word counter and last position
					boardWordCount += 1;
					boardLastPos += 1;
					// fill box and keyboard background color
					fillBackgroundBox(boardWordChild);
					fillBackgroundKeybrd(boardWordChild);
				};
				// reset character counter
				boardCharCount = 0;
			} else {
				shakeAnsBox();
				setTimeout(shakeAnsBox, 500);
			};
		} else {
			shakeAnsBox();
			setTimeout(shakeAnsBox, 500);
			msgPopupTimer(msgIncor, 1000);
		};
		// clear answer box
		userAnsWord = '';
	} else {
		shakeAnsBox();
		setTimeout(shakeAnsBox, 500);
	};
	// game lose
	if (boardLastPos === 6 && isWon === false) {
		// console.log('You Lose!');
		insertAnsKeyLink(ansKey);
		msgPopupTimer(msgLose, 3000);
		// generate stats
		generateStats(isWon);
		// reset box color and character
		resetBoxColor(boardChar);
		resetBoxChar(boardChar);
		resetBoxColor(keybrdChar);
	};
};

// function to refresh answer distribution
function refreshDistAns() {
	distAnsList[boardWordCount] += 1;
	distAns[boardWordCount].textContent = distAnsList[boardWordCount];
	let distAnsSum = distAnsList.reduce((a, b) => a + b);
	let distAnsMax = Math.max(...distAnsList);
	for (let i = 0; i < distAnsPctList.length; i++) {
		distAnsPctList[i] = Math.round(distAnsList[i] / distAnsSum * 100);
		distAns[i].style.width = distAnsPctList[i] + '%';
	};
	for (let i = 0; i < distAns.length; i++) {
		if (distAns[i].textContent == distAnsMax) {
			distAns[i].classList.add("box-green");
			distAns[i].classList.remove("box-orange");
		} else if (distAns[i].textContent != '0') {
			distAns[i].classList.add("box-orange");
			distAns[i].classList.remove("box-green");
		};
	};
};

// function to generate stats
function generateStats(isWon) {
	// add game counter
	gameCount += 1;
	gameCounter.textContent = gameCount;
	// add stats
	statsGameCount += 1;
	statsGame.textContent = statsGameCount;
	statsWonCount = Math.round(scoreWonCount / statsGameCount * 100);
	statsWon.textContent = statsWonCount;
	// validate if game won or lose
	if (isWon === true) {
		scoreWonCount += 1;
		scoreWon.textContent = scoreWonCount;
		statsStrCurCount += 1
		statsStrCur.textContent = statsStrCurCount;
		if (statsStrCurCount > statsStrMaxCount) {
			statsStrMaxCount += 1;
			statsStrMax.textContent = statsStrMaxCount;
		};
		// refresh answer distribution
		refreshDistAns();
	} else {
		scoreLoseCount += 1;
		scoreLose.textContent = scoreLoseCount;
		statsStrCurCount = 0;
		statsStrCur.textContent = statsStrCurCount;
	};
	// reset word counter, saved answer, and last position
	boardWordCount = 0;
	userAnsList = [];
	boardLastPos = 0;
	// generate answer key
	generateAnsKey();
	// console.log(gameCount, ansKey);
};

// function to generate random integer
function generateRandInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// function to generate answer key
function generateAnsKey() {
	let randInt;
	for (let i = 0; i < data.length; i++) {
		randInt = generateRandInt(0, data.length - 1);
		// validate if index has been used before
		if (randIntList.includes(randInt) === false) {
			randIntList.push(randInt);
			break;
		};
	};
	// apply answer key with index of data
	ansKey = data[randInt];
};

// function to insert answer key link
function insertAnsKeyLink(ansKey) {
	for (let i = 0; i < msgLink.length; i++) {
		msgLink[i].href = 'https://kbbi.kemdikbud.go.id/entri/' + ansKey.toLowerCase();
		msgKey[i].textContent = ansKey;
	};
};

// function to reset box color
function resetBoxColor(element) {
	for (let i = 0; i < element.length; i++) {
		if (element[i].classList.contains("box-green")) {
			element[i].classList.remove("box-green");
		} else if (element[i].classList.contains("box-orange")) {
			element[i].classList.remove("box-orange");
		} else if (element[i].classList.contains("box-grey")) {
			element[i].classList.remove("box-grey");
		};
	};
};

// function to reset box character
function resetBoxChar(element) {
	for (let i = 0; i < element.length; i++) {
		element[i].textContent = '';
	};
};

// function to fill answer box
function fillAnsBox(userAns) {
	// fill answer box
	let selectedAnsBox = boardWord[boardWordCount].children[boardCharCount];
	selectedAnsBox.textContent = userAns;
	// add character counter
	boardCharCount += 1;
};

// function to fill box background color after submit answer
function fillBackgroundBox(boardWordChild) {
	let userAnsCharList = userAnsWord.split('');
	let ansKeyCharList = ansKey.split('');
	let userAnsCharGreenList = [];
	// user's answer character position checking
	for (let i = 0; i < userAnsWord.length; i++) {
		let userAnsChar = userAnsCharList[i];
		let ansKeyChar = ansKeyCharList[i];
		// validate if character and position is valid
		if (userAnsChar === ansKeyChar) {
			boardWordChild[i].classList.add("box-green");
			userAnsCharGreenList.push(userAnsChar);
		} else if (userAnsChar !== ansKeyChar && ansKey.includes(userAnsChar)) {
			boardWordChild[i].classList.add("box-orange");
		} else {
			boardWordChild[i].classList.add("box-grey");
		};
	};
	let userAnsUniqueCharCount = countUniqueList(userAnsCharGreenList);
	let ansKeyUniqueCharCount = countUniqueList(ansKeyCharList);
	for (let i = 0; i < boardWordChild.length; i++) {
		// validate orange box
		if (boardWordChild[i].classList.contains("box-orange")) {
			let userAnsChar = boardWordChild[i].textContent;
			// validate if character is full
			if (userAnsUniqueCharCount[userAnsChar] >= ansKeyUniqueCharCount[userAnsChar]) {
				boardWordChild[i].classList.remove("box-orange");
				boardWordChild[i].classList.add("box-grey");
			};
		};
	};
};

// function to fill keyboard color after submit answer;
function fillBackgroundKeybrd(boardWordChild) {
	for (let i = 0; i < boardWordChild.length; i++) {
		let userAnsChar = boardWordChild[i].textContent;
		if (boardWordChild[i].classList.contains("box-green")) {
			for (let i = 0; i < keybrdChar.length; i++) {
				if (keybrdChar[i].textContent === userAnsChar) {
					keybrdChar[i].classList.add("box-green");
				};
			};
		} else if (boardWordChild[i].classList.contains("box-orange")) {
			for (let i = 0; i < keybrdChar.length; i++) {
				if (keybrdChar[i].textContent === userAnsChar) {
					if (!keybrdChar[i].classList.contains("box-green")) {
						keybrdChar[i].classList.add("box-orange");
					};
				};
			};
		} else if (boardWordChild[i].classList.contains("box-grey")) {
			for (let i = 0; i < keybrdChar.length; i++) {
				if (keybrdChar[i].textContent === userAnsChar) {
					if (!keybrdChar[i].classList.contains("box-green") && !keybrdChar[i].classList.contains("box-orange")) {
						keybrdChar[i].classList.add("box-grey");
					};
				};
			};
		};
	};
};

// function to shake answer box if fully filled
function shakeAnsBox() {
	let selectedAnsBox = boardWord[boardWordCount].children;
	for (let i = 0; i < selectedAnsBox.length; i++) {
		selectedAnsBox[i].classList.toggle("shake");
	};
};

// function to clear (reset) answer box
function clearAnsBox() {
	// reset character counter
	boardCharCount = 0;
	// clear answer box
	let selectedAnsBox = boardWord[boardWordCount].children;
	for (let i = 0; i < selectedAnsBox.length; i++) {
		selectedAnsBox[i].textContent = '';
	};
};

// function to delete answer box
function deleteAnsBox() {
	// validate if answer box is filled
	if (boardCharCount > 0) {
		// substract character counter
		boardCharCount -= 1;
		// delete answer box
		let selectedAnsBox = boardWord[boardWordCount].children[boardCharCount];
		selectedAnsBox.textContent = '';
	};
};

// function to count unique value of list
function countUniqueList(list) {
	let count = {};
	list.forEach(function (s) {
		count[s] ? count[s]++ : count[s] = 1;
	});
	return count;
};

// DARK MODE
// Set dark by click toggle switch
darkMode.addEventListener("click", () => {
	const html = document.querySelector("html");
	darkMode.checked ? html.classList.add("dark") : html.classList.remove("dark");
});
// Set dark whenever system theme change
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", function (e) {
		darkMode.click();
	});
// Set dark if system theme is dark on first load
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	darkMode.click();
};

// POPUP
// Add click listener each navigation button to open n close popup window
navBttn.forEach((navBttn) => {
	navBttn.addEventListener("click", () => {
		const parent = navBttn.parentElement;
		const popup = parent.querySelector(".popup");
		popup.classList.remove("hidden");
	});
});
popupClose.forEach((close) => {
	close.addEventListener("click", () => {
		const parent = close.parentElement;
		parent.parentElement.classList.add("hidden");
	});
});

// function to show message by timer
function msgPopupTimer(element, timer) {
	element.parentElement.classList.remove("hidden");
	if (!element.parentElement.classList.contains("hidden")) {
		setTimeout(() => {
			element.parentElement.classList.add("hidden");
		}, timer);
	};
};

// ACTIVE ELEMENT HANDLING
document.addEventListener("click", () => {
	document.activeElement.blur();
});

// Print variables (temporary)
// console.log(gameCount, ansKey);