import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


export function createGallery(images) {
  return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes</b><span>${likes}</span></p>
          <p class="info-item"><b>Views</b><span>${views}</span></p>
          <p class="info-item"><b>Comments</b><span>${comments}</span></p>
          <p class="info-item")<b>Downloads</b><span>${downloads}</span></p>
        </div>
      </a>
    </li>`).join('');
}

export function clearGallery(container) {
  container.innerHTML = '';
}

export function showLoader(loader) {
  loader.style.display = 'block';
}

export function hideLoader(loader) {
  loader.style.display = 'none';
}

export function showLoadMoreButton(button) {
  button.style.display = 'block';
}

export function hideLoadMoreButton(button) {
  button.style.display = 'none';
}

export function refreshLightbox() {
  lightbox.refresh();
}


export function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const { height } = card.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
  }
}