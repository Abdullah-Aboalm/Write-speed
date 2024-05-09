/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  // [01] Create HTML Markup done
  // [02] Add Styling And Separate From Logic
  // [03] Create The App Logic
  // ---- [01] Add Levels
  // ---- [02] Show Level And Seconds
  // ---- [03] Add Array Of Words
  // ---- [04] ِAdd Start Game Button
  // ---- [05] Generate Upcoming Words
  // ---- [06] Disable Copy Word And Paste Event + Focus On Input
  // ---- [07] Start Play Function
  // ---- [08] Start The Time And Count Score
  // ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  // ---- [01] Save Score To Local Storage With Date
  // ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// array of words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// settings levels
const lvls = {
  easy: 5,
  normal: 3,
  hard: 2,
};

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSelect = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let again = document.querySelector(".again");

let defaultLevelName = "normal";
let defaultLevelSeconds = lvls[defaultLevelName];

function changeVarBySelect(name) {
  if (name !== defaultLevelName) {
    defaultLevelName = name;
    defaultLevelSeconds = lvls[name];
  }
  return defaultLevelName, defaultLevelSeconds;
}

lvlNameSelect.addEventListener("change", function () {
  changeVarBySelect(this.value);
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
});

// Settings level Name + Seconds + score

secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disable paste event
input.onpaste = () => false;

// start game
startButton.addEventListener("click", function () {
  this.remove();
  input.focus();
  lvlNameSelect.setAttribute("disabled", "disabled");
  // generate word function
  generateWord();
  // start play
  startPlay();
});

function generateWord() {
  // get random word from array
  theWord.innerHTML = words[parseInt(Math.random() * words.length)];
  // remove word from array
  words.splice(words.indexOf(theWord.innerHTML), 1);
  // empty upcoming words
  upcomingWords.innerHTML = "";
  // generate words
  words.forEach((word) => {
    let div = document.createElement("div");
    div.innerHTML = word;
    upcomingWords.appendChild(div);
  });
}

// win + lose msg
let finalMsg = document.createElement("div");
finishMessage.appendChild(finalMsg);

function startPlay() {
  let count = setInterval(() => {
    if (scoreGot.textContent == scoreTotal) {
      finalMsg.classList.add("good");
      finalMsg.innerHTML = "You Win!";
      again.style.display = "block";
      again.style.backgroundColor = "#2196f3";
      upcomingWords.remove();
      whenWinOrLose(count);
    } else {
      timeLeftSpan.textContent--;
    }
    if (input.value === theWord.innerHTML) {
      scoreGot.textContent++;
      input.value = "";
      timeLeftSpan.textContent = defaultLevelSeconds;
      generateWord();
      saveScoreOnLocalStorageWithDate();
    }
    if (input.value !== theWord.innerHTML && timeLeftSpan.textContent == 0) {
      finalMsg.classList.add("bad");
      finalMsg.innerHTML = "Game Over!";
      again.style.display = "block";
      again.style.backgroundColor = "red";
      upcomingWords.remove();
      whenWinOrLose(count);
    }
  }, 1000);
}

function whenWinOrLose(count) {
  input.value = "";
  input.setAttribute("disabled", "disabled");
  clearInterval(count);
}

function saveScoreOnLocalStorageWithDate() {
  let scoreWithData = {
    score: scoreGot.textContent,
    date: new Date().getTime(),
  };
  localStorage.setItem("score", JSON.stringify(scoreWithData));
}

again.addEventListener("click", () => {
  location.reload();
});
