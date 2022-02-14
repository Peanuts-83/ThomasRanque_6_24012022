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
const [rating, price] = counter.children;

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
    // Get photographers data
    photographers = await getPhotographers();
    // Get ID || SET default ID if direct access
    let idRequested = window.location.href.split('?')[1];
    if (!idRequested) {
        idRequested = 243;
    }
    // Get right photographer datas
    [photographer] = await photographers.filter(photographer => photographer.id == idRequested);
    // Get photographer profile
    const profiles = await getProfiles();
    [profile] = profiles.filter(profile => profile.photographerId == idRequested);
    displayData(photographer, profile);

    // Get PHOTOS datas
    photos = await getPhotos();
    // Get PHOTOS for right photographer
    photos = photos.filter(photo => photo.photographerId == idRequested);
    // SORT PHOTOS (default = 'Popularité')
    sortMedia();
    // Feed COUNTER of likes
    rating.innerHTML = sumRatings();
    price.innerHTML = `${photographer.price}€ / jour`
};


init();


////////////////////
// FUNCTIONS PAGE //

// DOM selectors
const sort = document.querySelector('.sort-by');
const optionsGroup = sort.querySelector('ul');
const options = sort.querySelectorAll('li');
const inputs = sort.querySelectorAll('input');
const labels = sort.querySelectorAll('label');
const [arrow] = [...labels].filter(label => label.control.checked);


// SUM RATINGS
function sumRatings() {
    let totalLikes = photos.reduce((sum, photo) => sum += photo.likes, 0);
    return `${totalLikes} <i class="fas fa-heart" aria-label="icone coeur"></i>`;
}

// RATING INCREMENT
function ratingIncrement() {
    this.innerHTML = `${+this.innerText + 1} <i class="fas fa-heart" aria-label="icone coeur"></i>`;
    rating.innerHTML = `${+rating.innerText + 1} <i class="fas fa-heart" aria-label="icone coeur"></i>`;
  }


// SORT PHOTOS
sort.addEventListener('change', sortMedia);
function sortMedia() {
    setOption();
    portfolioImgs.innerHTML = '';
    switch (sort.target) {
        case 'popularite':
            photos = photos.sort((a, b) => b.likes - a.likes);
            displayPhotos(photographer.name, photos);
            break;
        case 'date':
            photos = photos.sort((a, b) => b.date > a.date ? 1 : -1);
            displayPhotos(photographer.name, photos);
            break;
        case 'titre':
            photos = photos.sort((a, b) => a.title > b.title ? 1 : -1);
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
    Array.from(options).every(li => li.classList.contains('active')) ?
        desactivateMenu() : activateMenu();
}

// ACTIVATE SORT MENU
function activateMenu() {
    options.forEach(li => li.classList.replace('inactive', 'active'));
}

// DESACTIVATE SORT MENU
function desactivateMenu() {
    options.forEach(li => li.classList.replace('active', 'inactive'));
}


/////////////////////////
// KEYBOARD NAVIGATION //

// SORT MENU ACTIVATE / DESACTIVATE WITH TAB FOCUS
optionsGroup.addEventListener('focus', activateMenu);
options[2].addEventListener('focusout', desactivateMenu);
contact.addEventListener('focus', desactivateMenu); // for SHIFT TAB NAV

// WCAG KEYBOARD NAVIGATION
document.onkeydown = (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            // NEXT PHOTO photoModal
            if (modalMedia.style.display == 'flex') {
                changeMedia('prev');
            }
            break;
        // PREV PHOTO photoModal
        case 'ArrowRight':
            if (modalMedia.style.display == 'flex') {
                changeMedia('next');
            }
            break;
        case 'Enter':
            // SELECT SORT OPTION
            if (Array.from(options).every(li => li.classList.contains('active'))
                &&
                Array.from(options).some(li => li == document.activeElement)) {
                const selectElt = document.activeElement;
                inputs.forEach(input => input.checked = false);
                selectElt.querySelector('input').checked = true;
                sortMedia();
                toggleSortMenu();
            }
            // SHOW MEDIA
            if (document.activeElement.className == 'photo'
                && (!modalMedia.style.display || modalMedia.style.display == 'none')) {
                    if (!contactModal.style.display || contactModal.style.display == 'none') {
                        let me = document.activeElement;
                        showMedia(me);
                        modalMedia.focus();
                    } else {
                        modalMedia.style.display = 'none';
                    }
            }
            // SHOW CONTACT
            if (document.activeElement.className == 'contact_button'
                && (!contactModal.style.display || contactModal.style.display == 'none')) {
                    if (!photoModal.style.display || photoModal.style.display == 'none') {
                        displayModal('contact_modal',null)
                        contactForm.focus();
                    } else {
                        contactModal.style.display = 'none';
                    }
            }
            // TOGGLE PLAY/PAUSE VIDEO
            if (modalMedia.style.display != 'none') {
                if (videoModal.style.display != 'none') {
                    !videoModal.paused ? videoModal.pause() : videoModal.play();
                }
            }
            break;
        case 'Escape':
            // CLOSE photoModal & contactModal
            document.querySelectorAll('.modal').forEach(modal => {
                closeModal(modal.parentElement);
            });
            // CLOSE sort-by
            if (Array.from(options).every(li => li.classList.contains('active'))) {
                toggleSortMenu();
            }
            break;
    }
};