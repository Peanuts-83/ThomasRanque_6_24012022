/////////////////////////
// INITIALISATION PAGE //

// GLOBALS //
let photographer, photos, profile;

// DOM elements //
const header = document.querySelector('.photograph-header');
const contact = document.querySelector('.contact_button');
const contactModal = document.querySelector('#contact_modal');
const contactForm = document.querySelector('#contact_form');
const portfolioImgs = document.querySelector('.portfolio-imgs');
const counter = document.querySelector('.counter');
const [ rating, price ] = counter.children;

// PARSE JSON
function getPhotographers() {
  const photographers = fetch('./data/photographers.json')
    .then(data => data.json())
    .then(data => data.photographers)
    .catch(err => console.log('Error parsing photographers:', err));
  return photographers;
}

function getProfiles() {
  const profiles = fetch('./data/profiles.json')
    .then(data => data.json())
    .then(data => data.profiles)
    .catch(err => console.log('Error parsing profiles:', err));
  return profiles;
}

function getPhotos() {
  const photos = fetch('./data/photographers.json')
    .then(data => data.json())
    .then(data => data.media)
    .catch(err => console.log('Error parsing photos', err));
  return photos;
}

// DISPLAY DATAS
// photograph-header
function displayData(photographer, profile) {
  const photographerModel = photographerFactory(photographer, profile);
  const [headerText, headerImg] = photographerModel.getPhotographerPage();
  header.insertBefore(headerText, header.firstElementChild);
  header.append(headerImg);
}

// portfolio photos
function displayPhotos(name, photos) {
  photos.forEach(photo => {
    const photoModel = photosFactory(name, photo);
    const photoCardDOM = photoModel.getPhotoCardDOM();
    portfolioImgs.appendChild(photoCardDOM);
  })
}

// INIT
async function init() {
  // Récupère les datas des photographes
  photographers = await getPhotographers();
  // Récupère l'id de l'URL || SET default id si accès direct
  let idRequested = window.location.href.split('?')[1];
  if (!idRequested) {
    idRequested = 243;
  }
  // Récupère le photographe demandé
  [photographer] = await photographers.filter(photographer => photographer.id == idRequested);
  // Récupère le profil du photographe
  const profiles = await getProfiles();
  [profile] = profiles.filter(profile => profile.photographerId == idRequested);
  displayData(photographer, profile);

  // Récupère les datas des photos
  photos = await getPhotos();
  // Récupère les photos du photographe sélectionné et son nom
  photos = photos.filter(photo => photo.photographerId == idRequested);
  // sortPhotos -> displayPhotos by default SORT (popularite)
  sortMedia();
  // FEED COUNTER
  rating.innerHTML = sumRatings();
  price.innerHTML = `${photographer.price}€ / jour`
};


init();


////////////////////
// FUNCTIONS PAGE //

// DOM selectors
const sort = document.querySelector('.sort-by');
const options = sort.querySelectorAll('li');
const inputs = sort.querySelectorAll('input');
const labels = sort.querySelectorAll('label');
const [ arrow ] = [...labels].filter(label => label.control.checked);


// SUM RATINGS
function sumRatings() {
  let totalLikes = photos.reduce((sum, photo) => sum += photo.likes, 0);
  return `${totalLikes} <i class="fas fa-heart"></i>`;
}


// SORT PHOTOS
sort.addEventListener('change', sortMedia);
function sortMedia() {
  setOption();
  portfolioImgs.innerHTML = '';
  switch (sort.target) {
    case 'popularite':
      photos = photos.sort((a, b) => a.likes - b.likes);
      displayPhotos(photographer.name, photos);
      break;
    case 'date':
      photos = photos.sort((a, b) => a.date > b.date ? 1 : -1);
      displayPhotos(photographer.name, photos);
      break;
    case 'titre':
      photos = photos.sort( (a, b) => a.title > b.title ? 1 : -1 );
      displayPhotos(photographer.name, photos);
      break;
  }
}

// SELECT OPTION & ACTIVATE SORT FUNCTION
function setOption() {
  options.forEach(li => {
    li.classList.remove('selected');
    const input = li.querySelector('input');
    if (input.checked == true) {
      li.classList.add('selected');
      sort.target = input.title;
    }
  })
}

// SORT MENU TOGGLE
sort.addEventListener('click', toggleSortMenu);
labels.forEach(label => label.addEventListener('click', toggleSortMenu));
function toggleSortMenu() {
    options.forEach(li => {
    li.classList.contains('active') ?
      li.classList.replace('active', 'inactive')
      :
      li.classList.replace('inactive', 'active');
  })
}