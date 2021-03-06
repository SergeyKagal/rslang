// eslint-disable-next-line import/no-cycle
import endOfRound from './end-round';

const TIME_LIMIT = 20;
// Оповещение на 10 секунде
const WARNING_THRESHOLD = 10;
// Предупреждение на 5 секунде
const ALERT_THRESHOLD = 5;
const FULL_DASH_ARRAY = 283;
const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
};

// Изначально осталось полное время интервала, но оно будет отсчитываться
// и вычитаться из TIME_LIMIT
let timePassed = 0;
let timerInterval = null;
let timeLeft = TIME_LIMIT;
export const remainingPathColor = COLOR_CODES.info.color;

function formatTimeLeft(time) {
  // Секунды – это остаток деления времени на 60 (оператор модуля)
  let seconds = time % 60;

  // Если значение секунд меньше 10, тогда отображаем его с 0 впереди
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  // Вывод в формате MM:SS
  return `${seconds}`;
}

export default formatTimeLeft;

export function startTimer() {
  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById('base-timer-label').innerHTML = formatTimeLeft(
      timeLeft,
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
    window.addEventListener('hashchange', onTimesUp);
    if (timeLeft === 0) {
      onTimesUp();
      endOfRound();
    }
  }, 1000);
}

// Делим оставшееся время на определенный временной лимит
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

export function onTimesUp() {
  clearInterval(timerInterval);
  window.removeEventListener('hashchange', onTimesUp);
  timePassed = 0;
  timeLeft = TIME_LIMIT;
}

// Обновляем значение свойства dasharray, начиная с 283
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById('base-timer-path-remaining')
    .setAttribute('stroke-dasharray', circleDasharray);
}

// eslint-disable-next-line no-shadow
function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById('base-timer-path-remaining')
      .classList.remove(warning.color);
    document
      .getElementById('base-timer-path-remaining')
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById('base-timer-path-remaining')
      .classList.remove(info.color);
    document
      .getElementById('base-timer-path-remaining')
      .classList.add(warning.color);
  }
}
