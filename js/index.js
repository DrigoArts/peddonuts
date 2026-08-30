// ========================================
// MENU MOBILE (EXISTENTE)
// ========================================
const mobileBtn = document.querySelector('.btn-mobile');
const navLinks = document.getElementById('nav-links');
const icon = document.querySelector('.btn-mobile i');

if (mobileBtn && navLinks && icon) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    icon.classList.toggle('fa-times');
    icon.classList.toggle('fa-bars');
  });
}

// ========================================
// CARROSSEL DE BANNERS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carrosselTrack');
  const slides = document.querySelectorAll('.slide');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const dots = document.querySelectorAll('.dot');
  const carrosselElem = document.getElementById('bannerCarrossel');
  
  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayTimer = null;
  const autoPlayDelay = 2500; // 4.5 segundos

  function updateCarrossel(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      updateCarrossel(currentIndex + 1);
    }, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  // Navegação pelos botões laterais
  btnNext?.addEventListener('click', () => {
    updateCarrossel(currentIndex + 1);
    startAutoPlay();
  });

  btnPrev?.addEventListener('click', () => {
    updateCarrossel(currentIndex - 1);
    startAutoPlay();
  });

  // Navegação pelos indicadores (dots)
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = Number(e.target.dataset.slide);
      updateCarrossel(targetIndex);
      startAutoPlay();
    });
  });

  // Pausa ao passar o mouse no Desktop
  carrosselElem?.addEventListener('mouseenter', stopAutoPlay);
  carrosselElem?.addEventListener('mouseleave', startAutoPlay);

  // Navegação por toque / arrasto (Swipe) no Mobile
  let startX = 0;
  let endX = 0;

  carrosselElem?.addEventListener('touchstart', (e) => {
    stopAutoPlay();
    startX = e.touches[0].clientX;
  }, { passive: true });

  carrosselElem?.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    // Mínimo de 45px de arrasto para trocar de slide
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        updateCarrossel(currentIndex + 1);
      } else {
        updateCarrossel(currentIndex - 1);
      }
    }
    startAutoPlay();
  }, { passive: true });

  // Inicia o carrossel automático
  startAutoPlay();
});