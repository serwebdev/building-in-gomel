function transitionEvent(
  selectorBox,
  selectorItems,
  delay = 1.5,
  duration = 0.5
) {
  let boxEl = document.querySelector(selectorBox);
  let itemsEl = boxEl.querySelectorAll(selectorItems);

  const cloneItem1 = itemsEl[0].cloneNode(true);
  boxEl.append(cloneItem1);

  boxEl = document.querySelector(selectorBox);
  itemsEl = boxEl.querySelectorAll(selectorItems);

  let step = itemsEl[0].getBoundingClientRect().height;
  let countSteps = 0;

  function animate() {
    countSteps++;

    step = itemsEl[0].getBoundingClientRect().height;

    const offsetBox = step * countSteps;

    boxEl.style.transition = `${duration}s ${delay}s`;
    boxEl.style.transform = `translateY(${-offsetBox}px)`;
  }

  animate();

  function handleTransitionend() {
    if (countSteps >= itemsEl.length - 1) {
      countSteps = 0;
      boxEl.style.transition = ``;
      boxEl.style.transform = ``;
      // Заставит браузер выполнить перерисовку
      const triggerLayout = boxEl.offsetHeight;
    }

    animate();
  }

  boxEl.addEventListener('transitionend', handleTransitionend);
}

transitionEvent(
  '.about__progress-center-wrapper',
  '.about__progress-number',
  1,
  0.5
);
transitionEvent(
  '.about__progress-bottom-wrapper',
  '.about__progress-bottom-text',
  1,
  0.5
);
