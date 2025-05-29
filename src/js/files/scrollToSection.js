document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-scroll-to]');
    if (!btn) return;

    const selector = btn.getAttribute('data-scroll-to');
    const target = document.querySelector(selector);
    if (!target) return;

    const top = target.getBoundingClientRect().top + pageYOffset - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});