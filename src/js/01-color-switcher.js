const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const switchBtn = (disableBtn, activBtn) => {
  disableBtn.disabled = true;
  activBtn.disabled = false;
};

switchBtn(stopBtn, startBtn);

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  switchBtn(startBtn, stopBtn);
  timerId = setInterval(() => {
    let getRandomColor = getRandomHexColor();
    body.style.backgroundColor = getRandomColor;
  }, 1000);
}

function onStopBtnClick() {
  switchBtn(stopBtn, startBtn);
  clearInterval(timerId);
}
