import populateEsileht from './esilehtTab'
import populateRestoranist from './restoranistTab'
import populateMenuu from './menuuTab'
import populateKontakt from './kontaktTab'


const populate = (function() {
    let content;


    function queryDomElements() {
        content = document.querySelector('#content');
    }

    const create = (element) => document.createElement(element);

    function createTopBar() {
        let topBar = create('div');
        let topBarLinks = create('div');
        let socialIcons = create('div');

        let esilehtLink = create('a');
        let fbLink = create('a');
        let instagramLink = create('a');
        let twitterLink = create('a');

        let fbImage = create('img');
        let instagramImage = create('img');
        let twitterImage = create('img');

        topBar.id = 'top-bar';
        topBarLinks.id = 'top-bar-links';
        socialIcons.id = 'social-icons';

        esilehtLink.classList.add('top-bar-link');
        [fbImage, instagramImage, twitterImage].forEach(function(element) {
            element.classList.add('social-logo');
            element.alt = '';
        });

        esilehtLink.href = '#';
        fbLink.href = 'https://facebook.com';
        instagramLink.href = 'https://instagram.com';
        twitterLink.href = 'https://twitter.com';

        fbImage.src = 'https://i.pinimg.com/originals/30/99/af/3099aff4115ee20f43e3cdad04f59c48.png';
        instagramImage.src = 'https://i.pinimg.com/originals/b4/14/76/b414768e7af1948afcbafb9bd4b0fd12.png';
        twitterImage.src = 'https://i.pinimg.com/originals/28/90/ba/2890bac9ba41e52707f36268231dfe9e.png';

        esilehtLink.textContent = 'ESILEHT';

        topBarLinks.appendChild(esilehtLink);
        fbLink.appendChild(fbImage);
        instagramLink.appendChild(instagramImage);
        twitterLink.appendChild(twitterImage);
        socialIcons.appendChild(fbLink);
        socialIcons.appendChild(instagramLink);
        socialIcons.appendChild(twitterLink);
        topBar.appendChild(topBarLinks);
        topBar.appendChild(socialIcons);
        content.appendChild(topBar);

    }

    function createHeader() {
        let header = create('div');
        let headerTitle = create('h1');

        header.id = 'header';
        headerTitle.id = 'header-title';

        headerTitle.textContent = 'LENDAV TALDRIK';

        header.appendChild(headerTitle);
        content.appendChild(header);
    }

    function createMainContent() {
        let mainContent = create('div');
        let menuBar = create('div');
        let infoBox = create('div');
        let esilehtButton = create('button');
        let restoranistButton = create('button');
        let menuuButton = create('button');
        let kontaktButton = create('button');

        let infoHeader = create('h1');
        let infoText = create('div');
        let infoSpan1 = create('span');
        let infoSpan2 = create('span');

        mainContent.id = 'main-content';
        menuBar.id = 'menu-bar';
        infoBox.id = 'info-box';
        infoText.id = 'info-text';


        [esilehtButton, restoranistButton, menuuButton, kontaktButton].forEach((element) => element.classList.add('menu-bar-button'));

        esilehtButton.textContent = 'Esileht';
        restoranistButton.textContent = 'Restoranist';
        menuuButton.textContent = 'Menüü';
        kontaktButton.textContent = 'Kontakt';
        infoHeader.textContent = 'Tere tulemast lendavasse taldrikusse!';
        infoSpan1.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat, quam sit amet pharetra sagittis, arcu massa scelerisque purus, eget tempor purus lacus a dolor. Phasellus nec turpis in odio tincidunt vestibulum. Nunc et finibus elit. Pellentesque suscipit lectus quis risus rutrum, sit amet imperdiet tortor curs us.';
        infoSpan2.textContent = 'Quisque nibh enim, lobortis sed imperdiet eu, sodales a leo. Sed aliquet hendrerit sapien, at eleifend metus pretium a. Phasellus erat elit, mattis sit amet nisl id, finibus volutpat metus. Sed non iaculis nisi. Nunc sit amet tristique nisl. Curabitur sit amet lobortis ante. S uspendisse egestas at lectus vitae dapibus. Aliquam id quam nunc. Vivamus laoreet libero nisi, feugiat vestibulum ipsum blandit sed. Nunc sodales velit a sapien pharetra lobortis. Maecenas molestie nisi sit amet turpis luctus, at trist ique enim posuere. Aenean tincidunt luctus facilisis. Mauris porttitor tortor at nisl blandit, in elementum ex ornare.';

        menuBar.appendChild(esilehtButton);
        menuBar.appendChild(restoranistButton);
        menuBar.appendChild(menuuButton);
        menuBar.appendChild(kontaktButton);
        infoText.appendChild(infoSpan1);
        infoText.appendChild(create('br'));
        infoText.appendChild(create('br'));
        infoText.appendChild(infoSpan2);
        infoBox.appendChild(infoHeader);
        infoBox.appendChild(infoText);
        mainContent.appendChild(menuBar);
        mainContent.appendChild(infoBox);
        content.appendChild(mainContent);
    }

    function createSideBar() {
        let sideBar = create('div');
        let menu = create('div');
        let menuHeader = create('h1');
        let menuEntry1 = create('span');
        let menuEntry2 = create('span');
        let menuEntry3 = create('span');
        let menuEntry4 = create('span');
        let menuEntry5 = create('span');
        let menuEntry6 = create('span');
        let menuEntry7 = create('span');
        let menuEntry8 = create('span');

        sideBar.id = 'side-bar';
        menu.id = 'menu';

        menuHeader.textContent = 'Menüü';
        menuEntry1.textContent = 'Pitsa - - - 5€';
        menuEntry2.textContent = 'Pitsa - - - 5€';
        menuEntry3.textContent = 'Pitsa - - - 5€';
        menuEntry4.textContent = 'Pitsa - - - 5€';
        menuEntry5.textContent = 'Pitsa - - - 5€';
        menuEntry6.textContent = 'Pitsa - - - 5€';
        menuEntry7.textContent = 'Pitsa - - - 5€';
        menuEntry8.textContent = 'Pitsa - - - 5€';

        [menuEntry1, menuEntry2, menuEntry3, menuEntry4, menuEntry5, menuEntry6, menuEntry7, menuEntry8].forEach((element) => element.classList.add('menu-entry'))

        menu.appendChild(menuHeader);
        menu.appendChild(menuEntry1);
        menu.appendChild(menuEntry2);
        menu.appendChild(menuEntry3);
        menu.appendChild(menuEntry4);
        menu.appendChild(menuEntry5);
        menu.appendChild(menuEntry6);
        menu.appendChild(menuEntry7);
        menu.appendChild(menuEntry8);
        sideBar.appendChild(menu);
        content.appendChild(sideBar);

    }

    function createFooterBar() {
        let footerBar = create('div');
        let contactBox = create('contact-box');
        let footerHeader = create('h1');
        let footerAddress = create('h2');
        let footerPhone = create('h2');

        footerBar.id = 'footer-bar';
        contactBox.id = 'contact-box';

        footerHeader.textContent = 'LENDAV TALDRIK OÜ';
        footerAddress.textContent = 'Telliskivi 60a-6, 10412 Tallinn';
        footerPhone.textContent = '+372 621 4222';

        contactBox.appendChild(footerHeader);
        contactBox.appendChild(footerAddress);
        contactBox.appendChild(footerPhone);
        footerBar.appendChild(contactBox);
        content.appendChild(footerBar);
    }


    function init() {
        queryDomElements();
        createTopBar();
        createHeader();
        createMainContent();
        createSideBar();
        createFooterBar();
    }

    init()
})

export default populate