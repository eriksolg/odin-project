const populate = (function() {

    const create = (element) => document.createElement(element);

    let infoBox = create('div');
    let infoHeader = create('h1');
    let infoText = create('div');
    infoBox.id = 'info-box';
    infoText.id = 'info-text';

    infoHeader.textContent = 'Tere tulemast lendavasse taldrikusse!';
    infoText.textContent = 'Tule ja vaata ise, milles kogu kära!';
    infoBox.appendChild(infoHeader);
    infoBox.appendChild(infoText);

    return infoBox;
});

export default populate