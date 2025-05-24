document.addEventListener('DOMContentLoaded', () => {
  const menuItem = document.querySelector('.menu__item:has(.menu__sub-list) > .menu__link');
  const subList = document.querySelector('.menu__item:has(.menu__sub-list) .menu__sub-list');
  const arrow = document.querySelector('.menu__item:has(.menu__sub-list) .menu__arrow');

  // Функция для закрытия подменю
  const closeSubMenu = () => {
    if (subList && subList.classList.contains('menu__sub-list--open')) {
      subList.classList.remove('menu__sub-list--open');
      if (arrow) {
        arrow.classList.remove('menu__arrow--rotated');
      }
    }
  };

  if (menuItem) {
    menuItem.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (subList) {
        subList.classList.toggle('menu__sub-list--open');
      }
      if (arrow) {
        arrow.classList.toggle('menu__arrow--rotated');
      }
    });
  }

  // Закрытие подменю при нажатии на клавишу Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSubMenu();
    }
  });

  // Закрытие подменю при клике на любой другой элемент экрана
  document.addEventListener('click', (event) => {
    if (menuItem && subList) {
      const isClickInside = menuItem.contains(event.target) || subList.contains(event.target);
      if (!isClickInside) {
        closeSubMenu();
      }
    }
  });

  // Предотвращение закрытия при клике внутри подменю
  if (subList) {
    subList.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
});
