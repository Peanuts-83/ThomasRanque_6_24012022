function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // ARTICLE HAUT + <a></a>
        const link = document.createElement('a');
        link.href = id;
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        link.appendChild(img);
        link.appendChild(h2);

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

    return { name, picture, getUserCardDOM };
}