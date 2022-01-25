function photographerFactory(data, profile) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photos/${name.split(' ')[0]}/${profile.image}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // ARTICLE HAUT + <a></a>
        const link = document.createElement('a');
        const divImg = document.createElement('div');
        const img = document.createElement( 'img' );
        const h1 = document.createElement( 'h1' );
        link.href = `./photographer.html?${id}`;

        divImg.className = 'photo-profile';
        divImg.style.background = `#FAFAFA url(${picture}) no-repeat`;
        divImg.style["background-size"] = 'cover';
        // CLONE divImg
        const shadow = divImg.cloneNode(true);
        shadow.className = 'shadow';

        h1.textContent = name;
        link.appendChild(divImg);
        link.appendChild(h1);
        // INSERT shadow as divImg::after
        divImg.after(shadow);

        // ARTICLE BAS
        const address = document.createElement('address');
        const blockquote = document.createElement('blockquote');
        const data = document.createElement('data');
        address.innerText = `${city}, ${country}`;
        blockquote.innerText = `${tagline}`;
        data.innerText = `${price}€/jour`;

        // ASSEMBLAGE ARTICLE
        const elements = [link, address, blockquote, data];
        elements.forEach(element => article.appendChild(element));
        return (article);
    }

    function getPhotographerPage() {
        const header = document.querySelector('.photograph-header');

        const h1 = document.createElement('h1');
        const address = document.createElement('address');
        const blockquote = document.createElement('blockquote');
        const img = document.createElement('img');

        h1.innerText = name;
        address.innerText = `${city}, ${country}`;
        blockquote.innerText = `${tagline}`;
        img.src = picture;
        img.className = 'header-photo';

        header.insertBefore(blockquote, header.firstElementChild);
        header.insertBefore(address, header.firstElementChild);
        header.insertBefore(h1, header.firstElementChild);
        header.appendChild(img);
    }

    return { getUserCardDOM, getPhotographerPage };
}
