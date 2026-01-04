import slide1 from "../assets/images/hero/hero-slider-1.webp";
import slide2 from "../assets/images/hero/hero-slider-2.webp";
import slide3 from "../assets/images/hero/hero-slider-3.webp";

const slides = [slide1, slide2, slide3];

const sliderEl = document.querySelector(".hero__slider");
const prevBtn = document.querySelector(".hero__control--prev");
const nextBtn = document.querySelector(".hero__control--next");
const paginationBtns = Array.from(document.querySelectorAll(".hero__pagination-btn"));

// Если на странице нет hero — просто выходим (чтобы не ломать другие страницы)
if (!sliderEl || paginationBtns.length === 0) {
  // console.log("hero slider: required elements not found");
} else {
  let currentIndex = 0;

  // Настройки автоплея
  const AUTOPLAY_DELAY = 5000; // 5 секунд
  let autoplayId = null;



  function setSlide(index) {
    // Нормализуем индекс (кольцевой слайдер)
    const nextIndex = (index + slides.length) % slides.length;
    currentIndex = nextIndex;

    // Фон
    sliderEl.style.backgroundImage = `url("${slides[currentIndex]}")`;

    // Pagination UI + aria
    paginationBtns.forEach((btn, i) => {
      const isActive = i === currentIndex;
      btn.classList.toggle("hero__pagination-btn--active", isActive);

      if (isActive) {
        btn.setAttribute("aria-current", "true");
      } else {
        btn.removeAttribute("aria-current");
      }
    });
  }

  function nextSlide() {
    setSlide(currentIndex + 1);
  }

  function prevSlide() {
    setSlide(currentIndex - 1);
  }

  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function restartAutoplay() {
    // UX: после ручного клика — начинаем отсчёт заново
    startAutoplay();
  }

  // Стартуем с первого слайда
  setSlide(0);
  startAutoplay(); // Автоплей останавливать при необходимости

  // Кнопки
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoplay();
    });
  }

  // Клик по пагинации
  paginationBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      setSlide(i);
      restartAutoplay();
    });
  });

  // Опционально: пауза при наведении (можешь удалить, если не нужно)
  const heroEl = document.querySelector(".hero");
  if (heroEl) {
    heroEl.addEventListener("mouseenter", stopAutoplay);
    heroEl.addEventListener("mouseleave", startAutoplay);
  }

  // На всякий случай (если модуль будет жить в SPA/частичных перерендерах)
  window.addEventListener("beforeunload", stopAutoplay);
}