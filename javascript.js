const body = document.body;
const isHomePage = body.classList.contains('home-page');

// Create floating heart
function createFloatingHeart(x, y) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = ['❤️', '💖', '💗', '🌟', '✨', '💫'][Math.floor(Math.random() * 6)];
  
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.animationDuration = (Math.random() * 3.5 + 4.5) + 's';
  heart.style.fontSize = (Math.random() * 28 + 34) + 'px';
  heart.style.opacity = Math.random() * 0.6 + 0.7;
  
  body.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}

// === IMPORTANT: Heart Button Click ===
const heartBtn = document.getElementById('heartBtn');

if (heartBtn) {
  heartBtn.addEventListener('click', (e) => {
    heartBtn.disabled = true;
    heartBtn.style.pointerEvents = 'none';

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Heart explosion
    for (let i = 0; i < 35; i++) {
      setTimeout(() => {
        createFloatingHeart(
          centerX + (Math.random() * 180 - 90), 
          centerY + (Math.random() * 100 - 50)
        );
      }, i * 22);
    }

    // Smoothly transition before navigation
    body.style.transition = 'opacity 450ms ease';
    setTimeout(() => {
      body.style.opacity = '0';
    }, 250);

    // Go to foryou.html after explosion
    setTimeout(() => {
      const nextPage = new URL('./foryou.html', window.location.href).href;
      window.location.assign(nextPage);
    }, 1100);
  });
}

// Continuous floating hearts
if (isHomePage) {
  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    createFloatingHeart(x, window.innerHeight + 50);
  }, 500);
}

// Create occasional shooting stars
function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  
  star.style.top = Math.random() * 60 + '%';
  star.style.left = '-50px';
  star.style.animationDuration = (Math.random() * 4 + 5) + 's';
  
  document.body.appendChild(star);
  
  setTimeout(() => star.remove(), 10000);
}

// Shooting star every 4-8 seconds
setInterval(() => {
  if (Math.random() > 0.45) createShootingStar();
}, 4500);