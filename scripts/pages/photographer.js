/////////////////////////
// INITIALISATION PAGE //

// GLOBALS //
const contact = document.querySelector('.contact_button');
const contactModal = document.querySelector('#contact_modal');
let photographer, photos, profile;

// DOM elements //
const portfolioImgs = document.querySelector('.portfolio-imgs');
const header = document.querySelector('.photograph-header');

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
  const photographers = await getPhotographers();
  // Récupère l'id de l'URL
  const idRequested = window.location.href.split('?')[1];
  // Récupère le photographe demandé
  [photographer] = photographers.filter(photographer => photographer.id == idRequested);
  // Récupère le profil du photographe
  const profiles = await getProfiles();
  [profile] = profiles.filter(profile => profile.photographerId == idRequested);
  displayData(photographer, profile);

  // Récupère les datas des photos
  photos = await getPhotos();
  // Récupère les photos du photographe sélectionné et son nom
  photos = photos.filter(photo => photo.photographerId == idRequested);
  // sortPhotos -> displayPhotos by default SORT (popularite)
  sortPhotos();
};


init();


////////////////////
// FUNCTIONS PAGE //

// DOM selectors
const sortBy = document.querySelector('#sort-by');

// SORT PHOTOS
sortBy.addEventListener('change', sortPhotos);
function sortPhotos() {
  portfolioImgs.innerHTML = '';
  switch (sortBy.value) {
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

//