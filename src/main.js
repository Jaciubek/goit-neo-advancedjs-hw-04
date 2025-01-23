import { getImg } from './js/pixabay-api';
import { createCardsMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const fetchUsersButton = document.querySelector('button[type=submit]');
const imgs = document.querySelector('.images-div');
const loaderClass = document.querySelector('.loaderClass');

// Added a Load More button
const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load more';
loadMoreButton.style.display = 'none'; // Hidden at the beginning
loadMoreButton.classList.add('load-more');
imgs.insertAdjacentElement('afterend', loadMoreButton);

let searchValue = '';
let currentPage = 1;
const perPage = 15; // Number of images per page

fetchUsersButton.addEventListener('click', handleSearch);
loadMoreButton.addEventListener('click', handleLoadMore);

function handleSearch(e) {
  e.preventDefault();
  const searchInput = document.querySelector('input[name="search"]');
  const notFoundTextEl = document.querySelector('.not-found-img');

  searchValue = searchInput.value.trim();
  currentPage = 1; // Pagination reset

  if (searchValue === '') {
    iziToast.show({
      title: '❌',
      message: 'Sorry, there are no images matching your search query. Please try again!',
      color: 'ef4040',
    });
    return;
  }

  imgs.innerHTML = ''; // Clearing previous results
  notFoundTextEl.innerHTML = '';
  loaderClass.style.display = 'flex';
  loadMoreButton.style.display = 'none'; // Hide Load More from loading

  getImg(searchValue, currentPage, perPage)
    .then(data => {
      if (data.totalHits === 0) {
        notFoundTextEl.innerHTML = `Results for query <span>${searchValue}</span> not found!`;
        iziToast.show({
          title: '❌',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#ef4040',
          messageColor: 'white',
        });
        return;
      }

      createCardsMarkup(data.hits);

      if (data.totalHits > perPage) {
        loadMoreButton.style.display = 'block'; // Show Load More
      }
    })
    .catch(console.error)
    .finally(() => {
      loaderClass.style.display = 'none';
    });

  searchInput.value = '';
}

function handleLoadMore() {
  currentPage += 1; // Go to the next page
  loaderClass.style.display = 'flex';
  loadMoreButton.style.display = 'none'; // Hide button while loading

  getImg(searchValue, currentPage, perPage)
    .then(data => {
      createCardsMarkup(data.hits, true); // Add new photos instead of clearing the gallery

      const totalPages = Math.ceil(data.totalHits / perPage);
      if (currentPage >= totalPages) {
        loadMoreButton.style.display = 'none'; // Hide the button when you reach the end
        iziToast.show({
          title: 'ℹ️',
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#4E75FF',
          messageColor: 'white',
        });
      } else {
        loadMoreButton.style.display = 'block';
      }
    })
    .catch(console.error)
    .finally(() => {
      loaderClass.style.display = 'none';
    });
}