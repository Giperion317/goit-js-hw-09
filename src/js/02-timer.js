import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startTimerBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      window.alert('Please choose a date in the future');
      startTimerBtnСondition(true);
    }
    if (selectedDates[0] > options.defaultDate) {
      startTimerBtnСondition(false);
      const timerDate = selectedDates[0];
      startTimerBtn.addEventListener('click', onStartTimerBtnClick);
      function onStartTimerBtnClick() {
        setInterval(() => {
          const currentTime = Date.now();
          const delta = timerDate - currentTime;
          const { days, hours, minutes, seconds } = convertMs(delta);
          daysSpan.textContent = days;
          hoursSpan.textContent = hours;
          minutesSpan.textContent = minutes;
          secondsSpan.textContent = seconds;
        }, 1000);
      }
    }
  },
};

flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimerBtnСondition(Boolean) {
  startTimerBtn.disabled = Boolean;
}

startTimerBtnСondition(true);
