//Mettre le code JavaScript lié à la page photographer.html
function getPhotographers() {
  const photographers = fetch('./data/photographers.json')
                          .then(data => data.json())
                          .then(data => data.photographers)
                          .catch(err => console.log('Error parsing photographers:', err));
  return photographers;
}

function getPhotos() {
  const photos = fetch('./data/photographers.json')
                  .then(data => data.json())
                  .then(data => data.media)
                  .catch(err => console.log('Error parsing photos', err));
  return photos;
}

function displayData(photographer) {
  const header = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const photographHeader = photographerModel.getPhotographerPage();
}

function displayPhotos(name, photos) {
  const portfolioImgs = document.querySelector('.portfolio-imgs');

  photos.forEach (photo => {
    const photoModel = photosFactory(name, photo);
    const photoCardDOM = photoModel.getPhotoCardDOM();
    portfolioImgs.appendChild(photoCardDOM);
  })

}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  // Récupère l'id de l'URL
  const idRequested = window.location.href.split('?')[1];
  // Récupère le photographe demandé
  const photographer = photographers.filter(photographer => photographer.id == idRequested)[0];
  displayData(photographer);

  const photos = await getPhotos();
  console.log(photos)
  const photographerPhotos = photos.filter(photo => photo.photographerId == idRequested);
  const name = photographer.name;
  displayPhotos(name, photographerPhotos);
};

init();