function photosFactory(name, data) {
  const { id,photographerId, title, image, likes, date, price } = data;
  const firstname = name.split(' ')[0];
  const picture = `assets/photos/${firstname}/${image}`;

  function getPhotoCardDOM() {
    const article = document.createElement('article');
    const divImg = document.createElement('div');
    const h3 = document.createElement('h3');
    const rating = document.createElement('span');

    divImg.style.background = `#fff url(${picture}) no-repeat`;
    divImg.style['background-size'] = 'cover';
    divImg.className = 'photo';
    h3.innerText = title;
    rating.innerHTML = `${likes} <i class="fas fa-heart"></i>`;

    article.appendChild(divImg);
    article.appendChild(h3);
    article.appendChild(rating);
    return article;
  }

  return { getPhotoCardDOM }
}