const hole = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole");
const moleShowed = document.querySelector(".show");
const scoreBoard = document.querySelector("#scoreBoard");
const container = document.querySelector(".container");
const finishSound = document.querySelector("#finishSound");
const audio = document.querySelector("#playAudio");

audio.play();

let previousHole;
let finish; //default
let score;

function holeRandom() {
  const random = Math.floor(Math.random() * hole.length);
  const hRandom = hole[random];
  if (hRandom == previousHole) {
    holeRandom();
  }
  previousHole = hRandom;
  return hRandom;
}

function timeRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function moleShow() {
  const hRandom = holeRandom();
  const tRandom = timeRandom(300, 700);
  hRandom.classList.add("show");
  setTimeout(() => {
    hRandom.classList.remove("show");
    if (!finish) {
      moleShow();
    }
  }, tRandom);
}

function start() {
  container.classList.add("hammerBefore");
  finish = false;
  score = 0;
  scoreBoard.textContent = 0;

  ("./audio/finish-sound.mp3");
  moleShow();
  setTimeout(() => {
    finish = true;
    scoreBoard.textContent = `Your Final Score is ${score}`;
    finishSound.play();
  }, 10000);
}

function hit() {
  score++;
  scoreBoard.textContent = score;
  this.parentNode.classList.remove("show");
}

mole.forEach((m) => {
  m.addEventListener("click", hit);
});

audio.autoplay = true;
audio.load();
audio.addEventListener(
  "load",
  function () {
    audio.play();
  },
  true
);
