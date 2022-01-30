function initModals() {
    const contact = document.querySelector('.contact_button');
    const previous = document.querySelector('.previous');
    const next = document.querySelector('.next');

    contact.onclick = () => { displayModal('contact_modal') };
    previous.onclick = () => { previousPhoto() };
    next.onclick = () => { nextPhoto() };
    document.querySelectorAll('.modal').forEach(modal => {
        const parent = modal.parentElement;
        const close = modal.querySelector('.close');
        close.onclick = () => { closeModal(parent) };
    })
}


function displayModal(name) {
    const modal = document.querySelector(`#${name}`);
    const bgtransp = document.querySelector('.bgtransp');
    modal.style.display = 'flex';
    bgtransp.style.display = 'block';
}

function closeModal(parent) {
    const bgtransp = document.querySelector('.bgtransp');
    bgtransp.style.display = 'none';
    parent.style.display = 'none';
}

function previousPhoto() {
    const photo = document.querySelector('#photo_modal .photo');
    const h3 = document.querySelector('#photo_modal h3');
    const id = photos.indexOf(photos.filter(photo => photo.image == selectedMedia)[0]);

    if (id > 0) {
        const newMedia = photos[id - 1];
        const media = newMedia.image ? 'image' : 'video';
        photo.src = `assets/photos/${firstname}/${newMedia[media]}`;
        h3.innerText = newMedia.title;
        selectedMedia = newMedia[media];
    }
}

function nextPhoto() {
    const photo = document.querySelector('#photo_modal .photo');
    const h3 = document.querySelector('#photo_modal h3');
    const id = photos.indexOf(photos.filter(photo => photo.image == selectedMedia)[0]);

    if (id < photos.length - 1) {
        const newMedia = photos[id + 1];
        const media = newMedia.image ? 'image' : 'video';
        photo.src = `assets/photos/${firstname}/${newMedia[media]}`;
        h3.innerText = newMedia.title;
        selectedMedia = newMedia[media];
    }
}



initModals();