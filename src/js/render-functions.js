import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryLightbox;

function createCardsMarkup(cards, append = false) {
  const cartItem = cards
    .map(
      ({
        tags,
        webformatURL,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-card">
        <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
            <div class="values-container">
                <ul class="labels">
                    <li>Likes</li>
                    <li>${likes}</li>
                </ul>
                <ul class="labels">
                    <li>Views</li>
                    <li>${views}</li>
                </ul>
                <ul class="labels">
                    <li>Comments</li>
                    <li>${comments}</li>
                </ul>
                <ul class="labels">
                    <li>Downloads</li>
                    <li>${downloads}</li>
                </ul>
            </div>
        </a>
      </li>`
    )
    .join('');

  loadSimpleLitebox(cartItem, append);
}

function loadSimpleLitebox(cartItem, append) {
  const gallery = document.querySelector('ul.images-div');

  if (append) {
    // Dokładamy nowe elementy do istniejącej galerii
    gallery.insertAdjacentHTML('beforeend', cartItem);
  } else {
    // Zastępujemy istniejącą galerię nowymi elementami
    gallery.innerHTML = cartItem;
  }

  // Odświeżenie SimpleLightbox lub inicjalizacja
  if (galleryLightbox) {
    galleryLightbox.refresh();
  } else {
    galleryLightbox = new SimpleLightbox('.images-div a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export { createCardsMarkup };