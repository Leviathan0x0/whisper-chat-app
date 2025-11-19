const heading = document.getElementById('heading');

setTimeout(() => {
  heading.innerHTML = 'Wh';
}, 300);
setTimeout(() => {
  heading.innerHTML = 'Whi';
}, 600);
setTimeout(() => {
  heading.innerHTML = 'Whis';
}, 900);
setTimeout(() => {
  heading.innerHTML = 'Whisp';
}, 1200);
setTimeout(() => {
  heading.innerHTML = 'Whispe';
}, 1500);
setTimeout(() => {
  heading.innerHTML = 'Whisper';
}, 1800);

// Remove cursor after typing is complete
setTimeout(() => {
  heading.style.setProperty('content', 'none', 'important');
  heading.classList.add('no-cursor');
}, 3500);
