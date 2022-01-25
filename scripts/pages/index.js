// PARSE JSON
function getPhotographers() {
    const photographers = fetch('./data/photographers.json')
                            .then(data => data.json())
                            .then(data => data.photographers)
                            .catch(err => console.log('Error parsing photographers:', err));
    return photographers;
}

function getProfiles() {
    const profiles = fetch('./data/profiles.json')
                        .then(data => data.json())
                        .then (data => data.profiles)
                        .catch(err => console.log('Error parsing profiles:', err));
    return profiles;
}

// DISPLAY DATA
function displayData(photographers, profiles) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const [ profile ] = profiles.filter(profile => profile.photographerId == photographer.id);
        const photographerModel = photographerFactory(photographer, profile);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// INIT
async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    const profiles = await getProfiles();
    displayData(photographers, profiles);
};

init();
