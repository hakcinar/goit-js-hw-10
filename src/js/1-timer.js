// Belgelerde açıklandığı gibi
import flatpickr from 'flatpickr';
// Ek stil dosyalarını içe aktar
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
flatpickr(dateInput, options);
dateInput.addEventListener('input', () => {
  const selectedDate = new Date(dateInput.value);
  if (selectedDate < new Date()) {
    startButton.disabled = true;
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
      timeout: 3000,
    });
  } else {
    startButton.disabled = false;
  }
});
startButton.addEventListener('click', () => {
  const selectedDate = new Date(dateInput.value);
  dateInput.disabled = true; // Disable input during countdown
  startButton.disabled = true;
  const timerId = setInterval(() => {
    const now = new Date();
    const timeLeft = selectedDate - now;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      iziToast.success({
        title: 'Success',
        message: 'Time is Up!',
        position: 'topRight',
        timeout: 3000,
      });
      dateInput.disabled = false; // Re-enable input
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    document.querySelector('span[data-days]').textContent = String(
      days
    ).padStart(2, '0');
    document.querySelector('span[data-hours]').textContent = String(
      hours
    ).padStart(2, '0');
    document.querySelector('span[data-minutes]').textContent = String(
      minutes
    ).padStart(2, '0');
    document.querySelector('span[data-seconds]').textContent = String(
      seconds
    ).padStart(2, '0');
  }, 1000);
});
