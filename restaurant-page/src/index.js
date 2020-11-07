import populateContent from './populate'
import getEsilehtContent from './esilehtTab'
import getRestoranistContent from './restoranistTab'
import getMenuuContent from './menuuTab'
import getKontaktContent from './kontaktTab'


const pageIndex = (function() {

    let mainContent;
    let infoBox;
    let esilehtButton;
    let restoranistButton;
    let menuuButton;
    let kontaktButton;

    function queryDomElements() {
        esilehtButton = document.querySelector('#esileht-button');
        restoranistButton = document.querySelector('#restoranist-button');
        menuuButton = document.querySelector('#menuu-button');
        kontaktButton = document.querySelector('#kontakt-button');
    }

    function populateInfobox(element) {
        mainContent = document.querySelector('#main-content');
        infoBox = mainContent.querySelector('#info-box');
        if (infoBox) {
            mainContent.removeChild(infoBox);
        }
        mainContent.appendChild(element);

    }

    function addMenuListeners() {
        esilehtButton.addEventListener('click', populateInfobox.bind(this, getEsilehtContent()));
        restoranistButton.addEventListener('click', populateInfobox.bind(this, getRestoranistContent()));
        menuuButton.addEventListener('click', populateInfobox.bind(this, getMenuuContent()));
        kontaktButton.addEventListener('click', populateInfobox.bind(this, getKontaktContent()));
    }

    function init() {
        populateContent();
        queryDomElements();
        addMenuListeners();
        populateInfobox(getEsilehtContent());
    }

    init();

})()