const backToTopButton = document.querySelector("#back-to-top-btn");

let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(scrollFunction, 100);
});

function scrollFunction() {
  if (window.pageYOffset > 300) {
    // Show backToTopButton
    if (!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  } else {
    // Hide backToTopButton
    if (backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function () {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", () => smoothScroll(0));

export function smoothScroll(targetPosition, duration = 750) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

const slides = document.querySelectorAll(".slide");

let currentIndex = 0;

setInterval(() => {
  if (currentIndex == slides.length - 1) {
    currentIndex = 0;
    document.querySelector(".active").classList.remove("active");
    slides[currentIndex].classList.add("active");
    return;
  }

  if (currentIndex < slides.length) {
    document.querySelector(".active").classList.remove("active");
    currentIndex++;
    slides[currentIndex].classList.add("active");
  }
}, 5000);

document.querySelector('form').addEventListener('submit', (e) => {
  const email = document.querySelector('input[type="email"]').value;
  if (!email.includes('@')) {
    e.preventDefault();
    alert('Please enter a valid email address.');
  }
});