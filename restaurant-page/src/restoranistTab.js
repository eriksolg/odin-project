const populate = (function() {
    const create = (element) => document.createElement(element);

    let infoBox = create('div');
    let infoHeader = create('h1');
    let infoText = create('div');
    infoBox.id = 'info-box';
    infoText.id = 'info-text';

    infoHeader.textContent = 'Restoranist';
    infoText.textContent = 'Restoran Lendav Taldrik Telliskivi Loomelinnaku südames - see on kunst ja meelelahutus, põnev ööelu ning Aasiast inspireeritud köök. Lendava Taldriku aknast avaneb ebaharilik vaade möödasõitvatele kaubarongidele ja tegemist pole siiski tüüpilise Aasia restoraniga - see on avatum, linnalikum ning täielikus kontrastis Tallinna vanalinnaga.';
    infoBox.appendChild(infoHeader);
    infoBox.appendChild(infoText);

    return infoBox;
});

export default populate