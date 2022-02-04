

////////////
// MODALS //
function initModals() {
    contact.onclick = () => { displayModal('contact_modal') };
    previous.onclick = () => { changeMedia('prev') };
    next.onclick = () => { changeMedia('next') };
    document.onkeydown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                changeMedia('prev');
                break;
            case 'ArrowRight':
                changeMedia('next');
                break;
            case 'Escape':
                document.querySelectorAll('.modal').forEach(modal => {
                        closeModal(modal.parentElement);
                });
                break;
        }
    };
    document.querySelectorAll('.modal').forEach(modal => {
        const parent = modal.parentElement;
        const close = modal.querySelector('.close');
        close.onclick = () => { closeModal(parent) };
    });
}

function displayModal(name, mediaType) {
    const modal = document.querySelector(`#${name}`);
    // DETECT TYPE OF MEDIA TO SHOW IF mediaType PROVIDED
    if (name == 'photo_modal' && mediaType) {
        mediaType == 'video' ?
            (videoModal.style.display = 'block',
                videoModal.controls = true)
            :
            photoModal.style.display = 'block';
    } else if (name == 'contact_modal') {
        feedContact();
    }
    modal.style.display = 'flex';
    bgtransp.style.display = 'block';
}

function closeModal(parent) {
    bgtransp.style.display = 'none';
    parent.style.display = 'none';
}

initModals();


/////////////////
// PHOTO MODAL //
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

        // SET NEW MEDIA SRC & WIDTH
        mediaType == 'image' ?
            photoModal.src = `./assets/photos/${firstname}/${newMedia[mediaType]}`
            :
            videoModal.src = `./assets/photos/${firstname}/${newMedia[mediaType]}`;
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


///////////////////
// CONTACT MODAL //

// POSITION & CONTENT FORM
function feedContact() {
    const windowWidth = window.innerWidth;
    const h2 = contactModal.querySelector('h2');

    // SET MODAL POSITION X Y
    contactModal.style.left = `${windowWidth / 2 - 330}px`;
    contactModal.style.top = `${window.scrollY + 60}px`;
    // ADD PHOTOGRAPHER NAME
    h2.innerText = `Contactez-moi ${photographer.name}`;
}

// FAKE FORM DATA SEND
contactForm.addEventListener('submit', readForm);
function readForm(event) {
    event.preventDefault();
    // GET form data & diplay
    let data = new FormData(contactForm);
    let contactObj = {};
    for (const [name, value] of data) {
        contactObj[name] = value;
    }

    // FORM VALIDATION
    if (validateForm(contactObj)) {
        // VALIDATION OK
        console.table(contactObj);
        // CLEAR data & close
        contactForm.querySelectorAll('.fieldText').forEach(elt => elt.value = '');
        closeModal(contactModal);
    }
}

// VALIDATE FORM // Return true|false
function validateForm(data) {
    const [prenom, nom, email, message] = Object.values(data);
    const validator = {}
    for (let elt of [prenom, nom, email, message]) {
        validator[elt] = false;
    }

    // NAME VALIDATION
    // required: {string} && string.length >= 2
    const regex1 = new RegExp('^[a-z]{2,}', 'i');

    !regex1.test(prenom) ?
        (setComment('prenom'), validator[prenom] = false)
        :
        (unsetComment('prenom'), validator[prenom] = true);

    !regex1.test(nom) ?
        (setComment('nom'), validator[nom] = false)
        :
        (unsetComment('nom'), validator[nom] = true);

    // EMAIL VALIDATION
    // required: {string} && 'mail@domain.xx'
    const regex2 = new RegExp('[0-9a-z._%+-]+@[a-z0-9.-]+\\.[a-z]{2,64}', 'i');

    !regex2.test(email) ?
        (setComment('email'), validator[email] = false)
        :
        (unsetComment('email'), validator[email] = true)

    // MESSAGE VALIDATION
    // required: {string} && string.length >= 2
    const regex3 = new RegExp('.{2,}', 'i');

    !regex3.test(message) ?
        (setComment('message'), validator[message] = false)
        :
        (unsetComment('message'), validator[message] = true)


    // ERROR MESSAGES
    function setComment(target) {
        const comment = document.querySelector(`.comment[id=${target}-comment]`);
        comment.style.display = 'flex';
    }

    function unsetComment(target) {
        const comment = document.querySelector(`.comment[id=${target}-comment]`);
        comment.style.display = 'none';
    }


    // FINAL VALIDATION
    if (Object.values(validator).every(val => val == true)) {
        return true;
    } else {
        return false;
    }
}