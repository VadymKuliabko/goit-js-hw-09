import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);
    delay += step;
  }
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
