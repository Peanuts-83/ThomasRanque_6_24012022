//Mettre le code JavaScript lié à la page photographer.html
function getPhotographers() {
  const photographers = fetch('./data/photographers.json')
                          .then(data => data.json())
                          .then(data => data.photographers)
                          .catch(err => console.log('Error parsing photographers:', err));
  return photographers;
}

async function displayData(photographer) {
  const header = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const photographHeader = photographerModel.setPhotographerPage();
  header.appendChild(photographHeader);
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  // Récupère l'id de l'URL
  const idRequested = window.location.href.split('?')[1];
  // Récupère le photographe demandé
  const photographer = photographers.filter(photographer => photographer.id == idRequested)[0];
  displayData(photographer);
};

init();