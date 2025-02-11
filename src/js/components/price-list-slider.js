import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  FreeMode,
} from 'swiper/modules';

const priceListSlider = new Swiper('.price-list-slider', {
  modules: [Pagination, Navigation, Scrollbar, Mousewheel, FreeMode],

  // Optional parameters
  slidesPerView: 'auto',

  // speed: 300,

  // mousewheel: {
  //   releaseOnEdges: true,
  // },

  freeMode: true,

  // And if we need scrollbar
  scrollbar: {
    // el: '.swiper-scrollbar',
    el: '.price-list-slider-scrollbar',
    draggable: true,
    // dragSize: 50,
    // hide: true,
  },
});

priceListSlider.on('scrollbarDragEnd', (swiper, e) => {
  // console.log(swiper, e.target);

  const currentScroll = e.target.style.transform;
  const currentSwiper = swiper.getTranslate();
  // console.log(currentScroll, currentSwiper);

  setTimeout(() => {
    e.target.style.transform = currentScroll;
    swiper.setTranslate(currentSwiper);
  }, 0);
});
