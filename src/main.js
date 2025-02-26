import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements[0].value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  gallery.innerHTML = '';
  loader.classList.remove('hidden');

  fetchImages(query)
    .then(images => {
      loader.classList.add('hidden');

      if (images.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      renderGallery(images);
    })
    .catch(() => {
      loader.classList.add('hidden');
      iziToast.error({ message: 'Something went wrong. Please try again.' });
    });
});
