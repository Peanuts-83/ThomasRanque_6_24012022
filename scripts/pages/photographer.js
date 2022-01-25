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
                        .then (data => data.profiles)
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
  const header = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer, profile);
  const [ headerText, headerImg ] = photographerModel.getPhotographerPage();
  header.insertBefore(headerText, header.firstElementChild);
  header.append(headerImg);
}

// portfolio photos
function displayPhotos(name, photos) {
  const portfolioImgs = document.querySelector('.portfolio-imgs');
  photos.forEach (photo => {
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
  const [ photographer ] = photographers.filter(photographer => photographer.id == idRequested);
  // Récupère le profil du photographe
  const profiles = await getProfiles();
  const [ profile ] = profiles.filter(profile => profile.photographerId == idRequested);
  displayData(photographer, profile);

  // Récupère les datas des photos
  const photos = await getPhotos();
  // Récupère les photos du photographe sélectionné et son nom
  const photographerPhotos = photos.filter(photo => photo.photographerId == idRequested);
  const name = photographer.name;
  displayPhotos(name, photographerPhotos);
};

init();