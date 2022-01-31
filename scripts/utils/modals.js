function initModals() {
    contact.onclick = () => { displayModal('contact_modal') };
    previous.onclick = () => { changeMedia('prev') };
    next.onclick = () => { changeMedia('next') };
    document.querySelectorAll('.modal').forEach(modal => {
        const parent = modal.parentElement;
        const close = modal.querySelector('.close');
        close.onclick = () => { closeModal(parent) };
    })
}


function displayModal(name, mediaType) {
    const modal = document.querySelector(`#${name}`);
    // DETECT TYPE OF MEDIA TO SHOW IF mediaType PROVIDED
    if (mediaType) {
        mediaType == 'video' ?
            (videoModal.style.display = 'block',
            videoModal.controls = true)
            :
            photoModal.style.display = 'block';
    }
    modal.style.display = 'flex';
    bgtransp.style.display = 'block';
}

function closeModal(parent) {
    bgtransp.style.display = 'none';
    parent.style.display = 'none';
}


function changeMedia(way) {
    // GET INDEX OF ACTUAL MEDIA IN ARRAY
    const id = photos.indexOf(photos.filter(photo => photo.image == selectedMedia || photo.video == selectedMedia)[0]);

    // SELECT NEW MEDIA DEPENDING ON WAY
    if (way == 'prev' && id > 0) {
        const newMedia = photos[id - 1];
        operate(newMedia);
    } else if (way == 'next' && id < photos.length - 1) {
        const newMedia = photos[id + 1];
        operate(newMedia);
    }

    function operate(newMedia) {
        clearMedia();
        const mediaType = newMedia.image ? 'image' : 'video';
        const windowWidth = window.innerWidth;

        // SET NEW MEDIA SRC & WIDTH
        mediaType == 'image' ?
            (photoModal.src = `./assets/photos/${firstname}/${newMedia[mediaType]}`,
            photoModal.style.width = windowWidth - 395 + 'px')
            :
            (videoModal.src = `./assets/photos/${firstname}/${newMedia[mediaType]}`,
            videoModal.style.width = windowWidth - 395 + 'px');
        h3Modal.innerText = newMedia.title;
        selectedMedia = newMedia[mediaType];

        // DISPLAY NEW MEDIA
        displayModal('photo_modal', mediaType);
    }
}


function clearMedia() {
    // SET BOTH PHOTO & VIDEO TO HIDDEN
    photoModal.src = '';
    photoModal.style.display = 'none';
    videoModal.src = '';
    videoModal.style.display = 'none';
}

initModals();