const populate = (function() {
    const create = (element) => document.createElement(element);

    let infoBox = create('div');
    let infoHeader = create('h1');
    let infoText = create('div');
    let infoSpan1 = create('span');
    let infoSpan2 = create('span');
    let infoSpan3 = create('span');
    infoBox.id = 'info-box';
    infoText.id = 'info-text';

    infoHeader.textContent = 'Menüü';
    infoSpan1.textContent = 'Pitsa - - - 5€';
    infoSpan2.textContent = 'Pitsa - - - 5€';
    infoSpan3.textContent = 'Pitsa - - - 5€';

    infoText.appendChild(infoSpan1);
    infoText.appendChild(create('br'));
    infoText.appendChild(create('br'));
    infoText.appendChild(infoSpan2);
    infoText.appendChild(create('br'));
    infoText.appendChild(create('br'));
    infoText.appendChild(infoSpan3);
    infoBox.appendChild(infoHeader);
    infoBox.appendChild(infoText);

    return infoBox;
});

export default populate