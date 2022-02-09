// DOM ELEMENTS //
const bgtransp = document.querySelector('.bgtransp');
const modalMedia = document.querySelector('#photo_modal');
const photoModal = document.querySelector('#photo_modal .photo');
const videoModal = document.querySelector('#photo_modal .video');
const h3Modal = document.querySelector('#photo_modal h3');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');

// GLOBALS //
let selectedMedia, firstname;


function photosFactory(name, data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  firstname = name.split(' ')[0];
  let mediaType, media;

  // AVAILABLE MEDIA: IMAGE || VIDEO ?
  mediaType = image ? 'image' : 'video';
  // MEDIA SRC
  media = mediaType == 'image' ? `./assets/photos/${firstname}/${image}` : `./assets/photos/${firstname}/${video}`;


  function getPhotoCardDOM() {
    // CREATE ELEMENTS
    const article = document.createElement('article');
    const imgDiv = document.createElement('div');
    const videoDiv = document.createElement('video');
    const canvas = document.createElement('canvas');
    const h3 = document.createElement('h3');
    const articleRating = document.createElement('span');

    // ADDEVENTLISTENER ON IMG
    const dataImg = {
      'mediaType': mediaType,
      'media': media,
      'title': title,
      'image': image,
      'video': video
    }
    Object.keys(dataImg).forEach(key => imgDiv.dataset[key] = dataImg[key]);
    // bind with PointerEvent to identify media to display
    imgDiv.addEventListener('click', showMedia.bind(imgDiv));

    // MAKE IMG
    if (mediaType == 'image') {
      // PLACE IMG TO ARTICLE
      imgDiv.style.background = `#ccc url(${media}) no-repeat`;
      imgDiv.style['background-size'] = 'cover';
      imgDiv.className = 'photo';
      imgDiv.id = mediaType;
      imgDiv.title = image;
    } else {
      // BUILD VIDEO
      videoDiv.src = media;
      videoDiv.type = 'video/mp4';
      // BUILD CANVAS
      videoDiv.onloadedmetadata = () => {
        canvas.width = videoDiv.videoWidth;
        canvas.height = videoDiv.videoHeight;
        canvas.ratio = videoDiv.videoWidth / videoDiv.videoHeight;
      }
      videoDiv.onloadeddata = () => {
        // CENTER CANVAS POS & SNAP TO videoImage
        let xPos = canvas.width > canvas.height ? canvas.width / 2 / canvas.ratio * -1 : 0;
        let yPos = canvas.width < canvas.height ? canvas.height / 2 / canvas.ratio * -1 : 0;
        canvas.getContext('2d').drawImage(videoDiv, xPos, yPos);
        let videoImage = canvas.toDataURL('image/png');
        // MAKE PREVIEW VIDEO FROM CANVAS TO ARTICLE
        imgDiv.innerHTML = '<i class="far fa-play-circle"></i>';
        imgDiv.style.background = `#ccc url(${videoImage}) no-repeat`;
        imgDiv.style['background-size'] = 'cover';
        imgDiv.className = 'photo';
        imgDiv.id = mediaType;
        imgDiv.title = video;
      }
    }
    imgDiv.setAttribute('alt', title);  // WCAG
    imgDiv.ariaLabel = title; //WCAG
    imgDiv.tabIndex = '0';

    // MAKE TITLE + articleRating
    h3.innerText = title;
    articleRating.innerHTML = `${likes} <i class="fas fa-heart" aria-label="icone coeur"></i>`;
    articleRating.className = 'rating';
    articleRating.ariaLabel = 'nombre de likes';
    articleRating.addEventListener('click', ratingIncrement);

    // BUILD ARTICLE
    article.appendChild(imgDiv);
    article.appendChild(h3);
    article.appendChild(articleRating);

    return article;
  }

  return { getPhotoCardDOM }
}

