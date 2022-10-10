import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  distance: '10px',
  borderRadius: '10px',
  timeout: 5000,
});

const startTimerBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');
let timerDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startTimerBtnСondition(true);
    }
    if (selectedDates[0] > options.defaultDate) {
      startTimerBtnСondition(false);
      timerDate = selectedDates[0];
    }
  },
};

flatpickr('input#datetime-picker', options);

startTimerBtn.addEventListener('click', () => {
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const delta = timerDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(delta);
    daysSpan.textContent = days;
    hoursSpan.textContent = hours;
    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds;
    if (delta < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function startTimerBtnСondition(Boolean) {
  startTimerBtn.disabled = Boolean;
}

startTimerBtnСondition(true);
