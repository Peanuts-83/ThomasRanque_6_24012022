function photographerFactory(data, profile) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const firstname = name.split(' ')[0];
    const picture = `assets/photos/${firstname}/${profile.image}`;

    // PHOTOGRAPHER CARD ON INDEX
    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // ARTICLE ICONE + NAME
        const link = document.createElement('a');
        const divImg = document.createElement('div');
        const h1 = document.createElement( 'h1' );
        link.href = `./photographer.html?${id}`;

        divImg.className = 'photo-profile';
        divImg.ariaLabel = `vignette de ${name}`;
        divImg.style.background = `#FAFAFA url(${picture}) no-repeat`;
        divImg.style["background-size"] = 'cover';
        divImg.setAttribute('alt', name); // WCAG: accessibility
        // CLONE divImg
        const shadow = divImg.cloneNode(true);
        shadow.className = 'shadow';

        h1.textContent = name;
        link.appendChild(shadow);
        link.appendChild(divImg);
        link.appendChild(h1);
        // INSERT shadow as divImg::after
        //divImg.before(shadow);

        // ARTICLE INFOS
        const address = document.createElement('address');
        const blockquote = document.createElement('blockquote');
        const data = document.createElement('data');
        address.innerText = `${city}, ${country}`; // WCAG
        blockquote.innerText = `${tagline}`; // WCAG
        data.innerText = `${price}€/jour`;
        data.value = price; // WCAG

        // BUILD ARTICLE
        const elements = [link, address, blockquote, data];
        elements.forEach(element => article.appendChild(element));

        return article;
    }

    // HEADER FOR PHOTOGRAPHER PAGE
    function getPhotographerPage() {
        const divText = document.createElement('div');
        divText.className = 'info';
        const divImg = document.createElement('div');
        divImg.className = 'profile';
        divImg.ariaLabel = `vignette de ${name}`;

        const h1 = document.createElement('h1');
        const address = document.createElement('address');
        const blockquote = document.createElement('blockquote');
        const img = document.createElement('div');

        h1.innerText = name;
        address.innerText = `${city}, ${country}`; // WCAG
        blockquote.innerText = `${tagline}`; // WCAG
        img.className = 'photo-profile';
        img.style.background = `#FAFAFA url(${picture}) no-repeat`;
        img.style["background-size"] = 'cover';
        img.setAttribute('alt', name); // WCAG
        // CLONE divImg
        const shadow = img.cloneNode(true);
        shadow.className = 'shadow';

        // BUILD HEADER
        divText.appendChild(h1);
        divText.appendChild(address);
        divText.appendChild(blockquote);
        divImg.appendChild(shadow);
        divImg.appendChild(img);

        return [divText, divImg];
    }

    return { getUserCardDOM, getPhotographerPage };
}
