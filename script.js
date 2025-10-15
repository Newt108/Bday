// Global variables
let currentPage = 1;
let currentSlide = 0;
const totalSlides = 8;
const quotes = [
  "Lost in the beautiful pause between years. Here's to another year of dreams. 💫",
  "Happiness looks good on you. Especially paired with that beautiful purple 💖",
  "In purple silk, a beautiful sight, welcoming her birthday with cheer and light ✨",
  "With focused touch and silver shine, your birthday look is truly divine. 😇",
  "Because every birthday needs a dose of reality... or at least a highly distorted one. You're the best! 🌙",
  "She doesn't just look smart; she is the vision. Simply captivating 💞",
  "The sunlight knows where to find beauty. Happy Birthday to our radiant star. ❤️",
  "You wanted candid? You got candid. 😜🤪"
];

// Utility function for random number
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Page transition
function transitionToPage(pageNumber) {
  const currentPageElement = document.getElementById(`page${currentPage}`);
  const nextPageElement = document.getElementById(`page${pageNumber}`);

  currentPageElement.classList.add('exit');
  setTimeout(() => {
    currentPageElement.classList.remove('active', 'exit');
    nextPageElement.classList.add('active');
    currentPage = pageNumber;
    initializePage(pageNumber);
  }, 800);
}

// Initialize page features
function initializePage(pageNumber) {
  switch (pageNumber) {
    case 2: initFloatingHearts(); break;
    case 3: initCarousel(); break;
    case 4: initConfetti2(); break;
    case 5: initLights(); break;
    case 6: initBalloons(); break;
  }
}

// Page 2: Floating Hearts
function initFloatingHearts() {
  const floatingHearts = document.getElementById("floatingHearts");
  const colors = ['#ff5fa2', '#ff85a1', '#a349ff', '#ffb6c1'];

  function createHeart() {
    const heart = document.createElement('span');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    floatingHearts.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }

  floatingHearts.innerHTML = '';
  if (currentPage === 2) {
    const heartInterval = setInterval(() => {
      if (currentPage !== 2) clearInterval(heartInterval);
      else createHeart();
    }, 400);
  }

  document.getElementById("memoryBox").onclick = () => transitionToPage(3);
}

// Page 3: Carousel - Updated with new functionality
function initCarousel() {
  currentSlide = 0;
  showSlide(currentSlide);
  
  // Add swipe/drag support (touch + mouse)
  const carousel = document.getElementById('carousel');
  let startX = 0;
  let isDown = false;

  // For touch devices
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, false);

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
  }, false);

  // For desktop mouse drag
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.clientX;
  });

  carousel.addEventListener('mouseup', (e) => {
    if (!isDown) return;
    isDown = false;
    handleSwipe(e.clientX - startX);
  });

  carousel.addEventListener('mouseleave', () => (isDown = false));

  function handleSwipe(diff) {
    const threshold = 60; // pixels to detect swipe
    if (diff > threshold) {
      moveSlide(-1); // swipe right
    } else if (diff < -threshold) {
      moveSlide(1); // swipe left
    }
  }
}

function showSlide(i) {
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.getElementById('slides');
  const caption = document.getElementById('caption');
  if (slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove('active'));
  slides[i].classList.add('active');

  // Updated transform calculation for centered carousel
  const slideWidth = slides[0].offsetWidth;
  const gap = 20;
  const containerWidth = slidesContainer.offsetWidth;
  const slideOffset = (slideWidth + gap) * i;
  const centerOffset = (containerWidth - slideWidth) / 2;
  
  slidesContainer.style.transform = `translateX(${centerOffset - slideOffset}px)`;

  caption.style.opacity = 0;
  setTimeout(() => {
    caption.textContent = quotes[i];
    caption.style.opacity = 1;
  }, 300);
}

function moveSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  showSlide(currentSlide);
}

// Download button - Updated with new functionality
document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.querySelector('.download-btn');
  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      alert(`"${quotes[currentSlide]}"\nMemory downloaded successfully 💝`);
    });
  }
});

// Page 4: Confetti
let confetti2Animation;
function initConfetti2() {
  const canvas = document.getElementById('confetti2');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confetti = [];
  const colors = ['#FF6EC4', '#7873F5', '#FFDE59', '#4DE3FF', '#FF8F40', '#FF4D4D'];

  function createConfetti() {
    const count = 150;
    for (let i = 0; i < count; i++) {
      confetti.push({
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        r: random(2, 6),
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: random(1, 3),
        drift: random(-1, 1)
      });
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > canvas.height) { p.y = 0; p.x = random(0, canvas.width); }
    });
    confetti2Animation = requestAnimationFrame(drawConfetti);
  }

  if (confetti2Animation) cancelAnimationFrame(confetti2Animation);
  confetti = [];
  createConfetti();
  drawConfetti();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Page 5: Lights
function initLights() {
  const button = document.getElementById("lightBtn");
  if (!button) return;
  button.onclick = () => {
    transitionToPage(6);
    button.disabled = true;
    button.textContent = "Redirecting...";
  };
}

// Page 6: Balloons
let balloonInterval;
function initBalloons() {
  if (balloonInterval) clearInterval(balloonInterval);
  function createBalloon() {
    const page6 = document.getElementById('page6');
    if (!page6) return;
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    balloon.style.animationDuration = 5 + Math.random() * 5 + "s";
    page6.appendChild(balloon);
    setTimeout(() => balloon.remove(), 10000);
  }
  balloonInterval = setInterval(() => {
    if (currentPage !== 6) clearInterval(balloonInterval);
    else createBalloon();
  }, 500);
}

// Confetti for page 1 and Auto Music
const canvas1 = document.getElementById('confetti');
if (canvas1) {
  const ctx1 = canvas1.getContext('2d');
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
  const confettiColors = ['#ff80b5', '#ffb6d9', '#fff0f5', '#ff4d88', '#ffd1dc'];
  let confetti1 = [];

  function createConfetti1() {
    const count = 100;
    for (let i = 0; i < count; i++) {
      confetti1.push({
        x: random(0, canvas1.width),
        y: random(0, canvas1.height),
        r: random(2, 6),
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speed: random(1, 3),
        drift: random(-1, 1)
      });
    }
  }

  function drawConfetti1() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    confetti1.forEach(p => {
      ctx1.beginPath();
      ctx1.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx1.fillStyle = p.color;
      ctx1.fill();
      p.y += p.speed;
      p.x += p.drift * 0.5;
      if (p.y > canvas1.height) {
        p.y = 0;
        p.x = random(0, canvas1.width);
      }
    });
    requestAnimationFrame(drawConfetti1);
  }

  createConfetti1();
  drawConfetti1();
  window.addEventListener('resize', () => {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
  });

  // 🎵 AUTO MUSIC START - No need to click! 🎵
  const musicButton = document.querySelector('.music-control');
  const audio = new Audio('music.mp3'); // Put your file in same folder or update path
  audio.loop = true;
  let isPlaying = true; // Start as playing

  // Auto start music when page loads
  audio.play().catch(e => {
    console.log("Auto-play prevented by browser. User interaction required.");
    isPlaying = false;
    musicButton.textContent = '🎵';
  });

  // Update button to show it's playing
  musicButton.textContent = '🔊';

  // Still allow user to control music
  musicButton.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play();
      musicButton.textContent = '🔊';
    } else {
      audio.pause();
      musicButton.textContent = '🎵';
    }
    isPlaying = !isPlaying;
  });
}

// Alternative auto-start method for browsers that require user interaction
document.addEventListener('DOMContentLoaded', function() {
  // Try to start music automatically
  setTimeout(() => {
    const audio = document.querySelector('audio') || new Audio('music.mp3');
    audio.loop = true;
    
    // This will work in some browsers, others might require user interaction
    audio.play().then(() => {
      console.log("Music started automatically");
      const musicButton = document.querySelector('.music-control');
      if (musicButton) musicButton.textContent = '🔊';
    }).catch(e => {
      console.log("Auto-play was prevented. User needs to interact first.");
      // Music will start when user clicks the music button
    });
  }, 1000);
});
