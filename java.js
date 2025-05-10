const slider = document.getElementById('slider');
const dotsContainer = document.getElementById('dots');
const cards = slider.querySelectorAll('.card');

cards.forEach((_, index) => {
  const btn = document.createElement('button');
  if (index === 0) btn.classList.add('active');
  btn.addEventListener('click', () => {
    slider.scrollLeft = cards[index].offsetLeft;
  });
  dotsContainer.appendChild(btn);
});

const dots = dotsContainer.querySelectorAll('button');

slider.addEventListener('scroll', () => {
  const scrollPos = slider.scrollLeft;
  let current = 0;
  cards.forEach((card, index) => {
    if (card.offsetLeft - scrollPos <= card.offsetWidth / 2) {
      current = index;
    }
  });
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[current]) dots[current].classList.add('active');
});

let isDown = false;
let startX, scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

