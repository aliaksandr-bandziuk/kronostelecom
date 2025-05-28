document.addEventListener('DOMContentLoaded', () => {
  const scrollButtons = document.querySelectorAll('[data-scroll-to]');
  if (!scrollButtons.length) return;

  scrollButtons.forEach(button => {
    button.addEventListener('click', event => {
      const targetSelector = button.getAttribute('data-scroll-to');
      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
