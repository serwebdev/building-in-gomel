import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

const heroSlider = new Swiper('.hero-slider', {
  modules: [Pagination, Navigation, Autoplay],

  // Optional parameters
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
  },

  //   breakpoints: {
  //     // when window width is >= 320px
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 20,
  //     },
  //     768: {
  //       slidesPerView: 2,
  //       spaceBetween: 20,
  //     },
  //     992: {
  //       slidesPerView: 3,
  //       spaceBetween: 30,
  //     },
  //     1400: {
  //       slidesPerView: 4,
  //       spaceBetween: 30,
  //     },
  //   },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
