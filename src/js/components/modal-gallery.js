import { Modal } from '../libs/modal.js';

const thumbnailGalleryItem = document.querySelectorAll(
  '.thumbnail-gallery__item'
);
const modalGallery = document.querySelectorAll('.modal-gallery');

// const modal1 = new Modal({
//   selectorButton: '.thumbnail-gallery__item',
//   selectorModal: '.modal-gallery',
// });

thumbnailGalleryItem.forEach((btn, i) => {
  const modal1 = new Modal({
    selectorButton: btn,
    selectorModal: modalGallery[i],
  });
});
