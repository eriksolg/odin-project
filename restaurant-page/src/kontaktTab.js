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

    infoHeader.textContent = 'Kontakt';
    infoSpan1.textContent = 'LENDAV TALDRIK OÜ';
    infoSpan2.textContent = 'Telliskivi 60a-6, 10412 Tallinn';
    infoSpan3.textContent = '+372 621 4222';

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