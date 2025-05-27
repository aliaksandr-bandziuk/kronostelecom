document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const logo = document.querySelector('.logo-image');
  if (!header || !logo) return;

  const origSrc = logo.getAttribute('src');
  const altSrc = '../img/logo-alt.png';
  const threshold = 100;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > threshold;

    header.classList.toggle('header-scrolled', scrolled);
    logo.src = scrolled ? altSrc : origSrc;
  });
});
