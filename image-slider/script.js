const image_slider = (function() {

    let pictureSlider;
    let pictureFrame;
    let images = [];
    let position = 0;
    let imageSize = 600;
    let moveLeftButton;
    let moveRightButton;

    function queryElements() {
        pictureFrame = document.getElementById('picture-frame');
        moveLeftButton = document.getElementById('move-left');
        moveRightButton = document.getElementById('move-right');
    }

    function addEventListeners() {
        moveLeftButton.addEventListener('click', moveLeft);
        moveRightButton.addEventListener('click', moveRight);
    }

    function createSlider() {
        pictureSlider = document.createElement('div');
        pictureSlider.id = 'picture-slider';
        pictureSlider.style.height = `${imageSize}px`;
        pictureSlider.style.width = `${images.length * imageSize}px`;

        images.forEach(image => {
            let pictureSlide = document.createElement('div');
            pictureSlide.style.width = `${imageSize}px`;
            pictureSlide.style.height = `${imageSize}px`;
            pictureSlide.style.backgroundImage = `url(${image}`;
            pictureSlider.appendChild(pictureSlide);
        });
        pictureFrame.appendChild(pictureSlider);
    }

    function createNavBar() {
        let navBar = document.createElement('div');
        navBar.id = 'nav-bar';
        images.forEach((image, index) => {
            let navButton = document.createElement('button');
            navButton.classList.add('nav-button');
            navButton.setAttribute('data-nav-position', index);
            navButton.addEventListener('click', setPosition.bind(this, index))
            navBar.appendChild(navButton);
        })
        pictureFrame.appendChild(navBar);
    }

    function setPosition(index) {
        position = index;
        pictureSlider.style.right = `${index * imageSize}px`;
        let navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.classList.remove('nav-active');
            if (button.getAttribute('data-nav-position') == index) {
                button.classList.add('nav-active');
            }
        });
    }

    function moveLeft() {
        if (position == 0) {
            setPosition(images.length - 1);
            return;
        }
        setPosition(position - 1);
    }

    function moveRight() {
        if (position == images.length - 1) {
            setPosition(0);
            return;
        }
        setPosition(position + 1);
    }

    function populateImages() {
        images.push('assets/image1.jpg');
        images.push('assets/image2.jpg');
        images.push('assets/image3.jpg');
        images.push('assets/image4.jpg');
    }

    function init() {
        queryElements();
        populateImages();
        createSlider();
        addEventListeners();
        createNavBar();
        setPosition(0);
    }

    init();

})();