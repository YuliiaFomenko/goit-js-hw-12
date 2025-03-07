import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

export function renderGallery(images, isLoadMore = false) {
  const markup = images
    .map(
      image =>
        `<a href="${image.largeImageURL}" class="gallery-item">
                <img src="${image.webformatURL}" alt="${image.tags}">
                <div class="info">
                    <p><b>Likes:</b> ${image.likes}</p>
                    <p><b>Views:</b> ${image.views}</p>
                    <p><b>Comments:</b> ${image.comments}</p>
                    <p><b>Downloads:</b> ${image.downloads}</p>
                </div>
            </a>`
    )
    .join('');

  if (isLoadMore) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
