import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-button');
const endMessage = document.querySelector('.end-message');

let query = '';
let page = 1;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements[0].value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  gallery.innerHTML = '';
  loader.classList.remove('hidden');
  loadMoreButton.classList.add('hidden');
  endMessage.classList.add('hidden');

  try {
    const data = await fetchImages(query, page);
    loader.classList.add('hidden');

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderGallery(data.hits);

    if (data.totalHits > 40) {
      loadMoreButton.classList.remove('hidden');
    }
    if (data.totalHits <= page * 40) {
      loadMoreButton.classList.add('hidden');
      endMessage.classList.remove('hidden');
    }
  } catch (error) {
    loader.classList.add('hidden');
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    loader.classList.add('hidden');

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no more images matching your search query.',
      });
      return;
    }
    renderGallery(data.hits, true);

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (data.totalHits <= page * 40) {
      loadMoreButton.classList.add('hidden');
      endMessage.classList.remove('hidden');
    }
  } catch (error) {
    loader.classList.add('hidden');
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  }
});
