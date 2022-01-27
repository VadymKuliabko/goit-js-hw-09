import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  value: document.querySelector('.value'),
};

refs.startBtn.disabled = true;

let countDown = {};
let currentDate = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate > currentDate) {
      refs.startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onStart);

function onStart() {
  const timerId = setInterval(() => {
    currentDate = new Date();
    if (currentDate < selectedDate) {
      countDown = convertMs(selectedDate - currentDate);
      showCountDown(countDown);
      refs.startBtn.disabled = true;
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

function showCountDown(countDown) {
  refs.days.textContent = addLeadingZero(countDown.days);
  refs.hours.textContent = addLeadingZero(countDown.hours);
  refs.minutes.textContent = addLeadingZero(countDown.minutes);
  refs.seconds.textContent = addLeadingZero(countDown.seconds);
}

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
