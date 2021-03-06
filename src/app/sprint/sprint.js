/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-cycle
import { getUserFromStorage } from './get-user';
import requestUnreg from './sprint-request';
// eslint-disable-next-line import/no-cycle
import { onTimesUp, startTimer } from './timer';
import checkBoxLsnrOn from './check-box-listener';
import endOfRound from './end-round';
// import { loadSprintStatRequest } from '../stat';
// eslint-disable-next-line import/no-mutable-exports
export let seriesCounter = 0;
let words = [];

let xNum = 0;
let yNum = 0;
// eslint-disable-next-line no-unused-vars
const user = {};

export const sprintStat = {
  rounds: 0,
  currentRoundScore: 0,
  maxScore: 0,
  maxSeries: 0,
  rightAnswers: [],
  wrongAnswers: [],
  learned: [],
};

export const rightAnswersArr = [];
export const wrongAnswersArr = [];

async function sprintRun() {
  if (!localStorage.getItem('userId')) {
    words = await requestUnreg();
  }
  if (localStorage.getItem('userId')) {
    words = await requestUnreg();
  //  await loadSprintStatRequest();
  }
  getUserFromStorage();
  deletePreloader();

  rightAnswersArr.splice(0, rightAnswersArr.length);
  wrongAnswersArr.splice(0, wrongAnswersArr.length);
  checkBoxLsnrOn();
  startTimer();
  removeSeries();
  xNum = rndNumberWord(words);
  yNum = wrongNum(xNum);
  sprintStat.currentRoundScore = 0;
  seriesCounter = 0;
  drawWords(xNum, yNum);
  document.querySelector('.sprint-score span').textContent = sprintStat.currentRoundScore;
  document.querySelector('.sprint-button-wrapper').addEventListener('click', btnLsnr);
  document.addEventListener('keydown', sprintKeyLsnr);
}

function drawWords(wordNum, transNum) {
  if (words.length > 0) {
    document.querySelector('.sprint-word').textContent = `${words[wordNum].word}`;
    document.querySelector('.sprint-translate').textContent = `${words[transNum].wordTranslate}`;
  } else {
    onTimesUp();
    endOfRound();
  }
}

function rndNumberWord(arr) {
  const index = Math.round(Math.random() * (arr.length - 1));
  return index;
}
export default sprintRun;

function addSeries() {
  const crArr = document.querySelectorAll('.circle');
  if (seriesCounter < 4) {
    crArr[seriesCounter].classList.add(`cr${seriesCounter}`);
    seriesCounter++;
  }
  if (seriesCounter > 3) {
    seriesCounter++;
  }
}

function removeSeries() {
  const crArr = document.querySelectorAll('.circle');
  crArr.forEach((e, i) => {
    if (e.classList.contains(`cr${i}`)) {
      e.classList.remove(`cr${i}`);
    }
    sprintStat.maxSeries = Math.max(sprintStat.maxSeries, seriesCounter);
    seriesCounter = 0;
  });
}
export function btnLsnr(event) {
  if (event.target.classList.contains('spring-correct') || event.code === 'ArrowRight') {
    if (xNum === yNum) {
      sprintStat.currentRoundScore += 10;
      document.querySelector('.sprint-score span').textContent = sprintStat.currentRoundScore;
      addSeries();
      rightAnswHndl(xNum);
      playSound(0);
    } else {
      removeSeries();
      wrongAnswerHndl(xNum);
      playSound(1);
    }
  }
  if (event.target.classList.contains('spring-wrong') || event.code === 'ArrowLeft') {
    if (xNum !== yNum) {
      sprintStat.currentRoundScore += 10;
      document.querySelector('.sprint-score span').textContent = sprintStat.currentRoundScore;
      addSeries();
      rightAnswHndl(xNum);
      playSound(0);
    } else {
      removeSeries();
      wrongAnswerHndl(xNum);
      playSound(1);
    }
  }
  xNum = rndNumberWord(words);
  yNum = wrongNum(xNum);
  drawWords(xNum, yNum);
}

function rightAnswHndl(num) {
  rightAnswersArr.push(words[num]);
  words.splice(num, 1);
}

function wrongAnswerHndl(num) {
  wrongAnswersArr.push(words[num]);
  words.splice(num, 1);
}

function wrongNum(num) {
  const index = Math.round(Math.random() * (words.length - 1));
  const rndY = Math.round(Math.random());
  const arr = [num, index];
  return arr[rndY];
}

function playSound(num) {
  let sound;
  if (num === 0) {
    sound = document.querySelector('.right-snd');
  } else {
    sound = document.querySelector('.wrong-snd');
  }
  if (document.querySelector('#sound-onOff').checked) sound.play();
}

export function loadSprintState() {
  if (sprintStat.rounds === 0) {
    const loadedStat = JSON.parse(localStorage.getItem('sprintStat'));
    for (const key in loadedStat) {
      sprintStat[key] = loadedStat[key];
    }
  }
}

function deletePreloader() {
  if (document.querySelector('.preloader')) {
    document.querySelector('.preloader').classList.add('loaded');
  }
}

export function sprintKeyLsnr(e) {
  if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') btnLsnr(e);
}
