function animateNumber(el) {
  const target = +el.dataset.target;
  let current = 0;
  const speed = target / 80;

  function update() {
    current += speed;
    if (current < target) {
      el.innerHTML = `${Math.floor(current)}<span class="traditional__plus">+</span>`;
      requestAnimationFrame(update);
    } else {
      el.innerHTML = `${target}<span class="traditional__plus">+</span>`;
    }
  }

  update();
}

function initCountUp() {
  const section = document.querySelector(".traditional");
  const numbers = document.querySelectorAll(".traditional__number");

  if (!section) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      numbers.forEach(animateNumber);
      started = true;
    }
  }, { threshold: 0.4 });

  observer.observe(section);
}

export default initCountUp;
