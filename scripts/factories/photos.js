function photosFactory(name, data) {
  const { id,photographerId, title, image, likes, date, price } = data;
  const firstname = name.split(' ')[0];
  const picture = `assets/photos/${firstname}/${image}`;

  function getPhotoCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const rating = document.createElement('span');

    img.src = picture;
    h3.innerText = title;
    rating.innerHTML = `${likes} <i class="fas fa-heart"></i>`;

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(rating);
    return article;
  }

  return { getPhotoCardDOM }
}