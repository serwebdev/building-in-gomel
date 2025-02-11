(function () {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.menu');
  const menuLink = document.querySelectorAll('.menu__link');

  // Сбросит transition с menu
  menu.style.transition = 'none';

  burger.addEventListener('click', () => {
    if (!menu.classList.contains('open')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Открывает меню
  function openMenu() {
    menu.style.transition = '';
    menu.classList.add('open');
    burger.classList.add('active');
  }
  // Закрывает меню
  function closeMenu() {
    menu.classList.remove('open');
    burger.classList.remove('active');
  }

  // При клике по пункту меню с анкорной ссылкой закрывает меню
  menuLink.forEach(item => {
    item.addEventListener('click', () => {
      const url = new URL(item.href);
      if (url.hash) {
        closeMenu();
      }
    });
  });
})();
