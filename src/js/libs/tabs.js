export class TabsClass {
  // Свойства объекта, заданные по умолчанию
  #defaultOptions = {
    isAnimate: true, // Если false, то высота не будет устанавливаться и анимироваться
  };

  // Индекс активной кнопки
  currentIndex;
  // Высота  активного item
  heightItem;
  // Высота предыдущего активного item
  prevHeight;

  constructor(selector, options) {
    this.options = Object.assign(this.#defaultOptions, options);
    // Главный элемент, в котором ищутся все остальные
    this.tabsEl =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;

    // Если нет элемента на странице, дальше код не выполняется
    if (!this.tabsEl) return;

    this.classes = {
      buttons: 'tabs__button',
      tabsBodyList: 'tabs__body-list',
      tabsBodyItem: 'tabs__body-item',
    };

    this.buttons = this.tabsEl.querySelectorAll(`.${this.classes.buttons}`);
    this.tabsBodyList = this.tabsEl.querySelector(
      `.${this.classes.tabsBodyList}`
    );
    this.tabsBodyItem = this.tabsEl.querySelectorAll(
      `.${this.classes.tabsBodyItem}`
    );

    // Точка входа
    this.#init();
  }

  #init() {
    // Устанавливает текущий индекс при первой загрузке
    this.setCurrentIndex();
    // Инициализирует переменную значением высоты активного item
    this.prevHeight = this.tabsBodyItem[this.currentIndex].offsetHeight;
    // Добавляет класс animate активному tabsBodyItem
    this.addClassAnimate(this.currentIndex);

    // Добавление обработчиков событий
    // Клик по кнопке
    this.clickToButtonHandler = this.clickToButtonHandler.bind(this);
    this.tabsEl.addEventListener('click', this.clickToButtonHandler);
    // Событие окончания анимации height
    this.transitionEndHandler = this.transitionEndHandler.bind(this);
    this.tabsBodyList.addEventListener(
      'transitionend',
      this.transitionEndHandler
    );
  }

  // Устанавливает текущий индекс по классу active, при первой загрузке
  setCurrentIndex() {
    this.buttons.forEach((btn, i) => {
      if (btn.classList.contains('active')) {
        this.currentIndex = i;
      }
    });
  }

  // Добавляет класс animate активному tabsBodyItem
  addClassAnimate(index) {
    this.tabsBodyItem[index].classList.add('animate');
  }

  // Устанавливает высоту контейнера tabsBodyList по высоте текущего tabsBodyItem
  setHeight(index) {
    if (!this.options.isAnimate) return;
    this.heightItem = this.tabsBodyItem[index].offsetHeight;
    this.tabsBodyList.style.height = this.heightItem + 'px';
  }

  // Обработчик клика по кнопкам
  clickToButtonHandler(e) {
    const currentBtn = e.target.closest(`.${this.classes.buttons}`);
    if (!currentBtn) return;

    // Сначала высота устанавливается по предыдущему активному item
    if (this.options.isAnimate) {
      this.tabsBodyList.style.height = this.prevHeight + 'px';
    }

    this.currentIndex = [...this.buttons].indexOf(currentBtn);

    this.buttons.forEach(btn => btn.classList.remove('active'));
    this.tabsBodyItem.forEach(item => {
      item.classList.remove('active', 'animate');
    });
    // this.tabsBodyItem.forEach(item => item.classList.remove('animate'));

    currentBtn.classList.add('active');

    const currentItem = this.tabsBodyItem[this.currentIndex];

    currentItem.classList.add('active');

    // Заставит браузер выполнить перерисовку
    // const triggerLayout = this.tabsEl.offsetHeight;

    const intervalId = setInterval(() => {
      if (currentItem.classList.contains('active')) {
        currentItem.classList.add('animate');
        this.setHeight(this.currentIndex);
        this.prevHeight = this.heightItem;

        clearInterval(intervalId);
      }
    }, 10);
  }

  // Обработчик события окончания анимации height
  transitionEndHandler(e) {
    if (e.currentTarget !== e.target) return;

    if (e.propertyName === 'height') {
      this.tabsBodyList.style.height = '';
    }
  }

  // Удаляет обработчики событий
  destroy() {
    this.tabsEl.removeEventListener('click', this.clickToButtonHandler);
    this.tabsBodyList.removeEventListener(
      'transitionend',
      this.transitionEndHandler
    );
  }

  // End class =====================================================
}

// const tabs = new TabsClass('.tabs1');
// console.log(tabs);

// const tabs = new TabsClass('.tabs1', { isAnimate: false });

// =========================================================================================

// let tabs;

// (function () {
//   // const breakpoint = 768;
//   const mediaQueryList = window.matchMedia(`(max-width: 768px)`);

//   function handleMediaQuery(e) {
//     if (e.matches) {
//       // Если меньше брейкпоинта
//       console.log('меньше');

//       tabs = new TabsClass('.tabs1', { isAnimate: true });
//     } else {
//       // Если больше брейкпоинта
//       console.log('больше');

//       if (tabs) {
//         tabs.destroy();
//       }

//       tabs = new TabsClass('.tabs1', { isAnimate: false });
//     }
//   }

//   // Функция сработает при загрузке
//   handleMediaQuery(mediaQueryList);

//   // Срабатывает каждый раз при пересечении брейкпоинта
//   mediaQueryList.addEventListener('change', handleMediaQuery);
// })();

// =============================================================================================================================
