import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/2-snackbar.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.state === 'fulfilled') {
        resolve('Form submitted successfully!');
      } else {
        reject('Form submission failed!');
      }
    }, data.delay);
  });
  promise
    .then(message => {
      iziToast.success({
        title: 'Success',
        message: message,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error,
        position: 'topRight',
      });
    });
});
