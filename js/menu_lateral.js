const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const openMenuBtn = document.getElementById('openMenuBtn');
const closeBtn = document.getElementById('closeBtn');

function toggleMenu(isOpen) {
  sideMenu.classList.toggle('active', isOpen);
  menuOverlay.classList.toggle('active', isOpen);
  sideMenu.setAttribute('aria-hidden', !isOpen);
}

// Abrir com a logo
openMenuBtn.addEventListener('click', () => toggleMenu(true));

// Fechar com o botão X ou clicando no overlay
closeBtn.addEventListener('click', () => toggleMenu(false));
menuOverlay.addEventListener('click', () => toggleMenu(false));