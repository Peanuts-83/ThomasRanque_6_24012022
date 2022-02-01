function photographerFactory(data, profile) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const firstname = name.split(' ')[0];
    const picture = `assets/photos/${firstname}/${profile.image}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // ARTICLE HAUT + <a></a>
        const link = document.createElement('a');
        const divImg = document.createElement('div');
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

        return article;
    }

    function getPhotographerPage() {
        const divText = document.createElement('div');
        divText.className = 'info';
        const divImg = document.createElement('div');
        divImg.className = 'profile';

        const h1 = document.createElement('h1');
        const address = document.createElement('address');
        const blockquote = document.createElement('blockquote');
        const img = document.createElement('div');

        h1.innerText = name;
        address.innerText = `${city}, ${country}`;
        blockquote.innerText = `${tagline}`;
        img.className = 'photo-profile';
        img.style.background = `#FAFAFA url(${picture}) no-repeat`;
        img.style["background-size"] = 'cover';
        // CLONE divImg
        const shadow = img.cloneNode(true);
        shadow.className = 'shadow';

        divText.appendChild(h1);
        divText.appendChild(address);
        divText.appendChild(blockquote);
        divImg.appendChild(shadow);
        divImg.appendChild(img);

        return [divText, divImg];
    }

    return { getUserCardDOM, getPhotographerPage };
}
