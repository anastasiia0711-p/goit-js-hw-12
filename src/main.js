import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import * as renderFunc from './js/render-functions.js'; // Імпортуємо все як об'єкт

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const loader = document.querySelector('.loader-container');

let page = 1;
let currentQuery = '';
const perPage = 15;

form.addEventListener('submit', handleSearch);
btnLoadMore.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  currentQuery = event.currentTarget.elements.searchQuery.value.trim();
  
  if (!currentQuery) {
    iziToast.warning({ message: 'Please enter a search query' });
    return;
  }

  page = 1;
  renderFunc.clearGallery(gallery);
  renderFunc.hideLoadMoreButton(btnLoadMore);
  renderFunc.showLoader(loader);

  try {
    const data = await getImagesByQuery(currentQuery, page);
    
    if (data.hits.length === 0) {
      iziToast.error({ message: 'Sorry, there are no images matching your search query.' });
      return;
    }

    gallery.innerHTML = renderFunc.createGallery(data.hits);
    renderFunc.refreshLightbox();

  
    if (data.totalHits > perPage) {
      renderFunc.showLoadMoreButton(btnLoadMore);
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong!' });
  } finally {
    renderFunc.hideLoader(loader);
    form.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  renderFunc.hideLoadMoreButton(btnLoadMore);
  renderFunc.showLoader(loader);

  try {
    const data = await getImagesByQuery(currentQuery, page);
    
   
    gallery.insertAdjacentHTML('beforeend', renderFunc.createGallery(data.hits));
    
    renderFunc.refreshLightbox();
    renderFunc.smoothScroll();

    
    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      renderFunc.hideLoadMoreButton(btnLoadMore);
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      renderFunc.showLoadMoreButton(btnLoadMore);
    }
  } catch (error) {
    iziToast.error({ message: 'Error loading more images!' });
  } finally {
    renderFunc.hideLoader(loader);
  }
}