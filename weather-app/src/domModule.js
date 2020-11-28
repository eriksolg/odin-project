import cloudyImage from './assets/cloudy.jpg'
import clearImage from './assets/clear.jpg'

const domModule = (function() {
    const body = document.querySelector('body');
    const getWeatherButton = document.getElementById('get-weather-button');
    const getWeatherInput = document.getElementById('get-weather-input');

    function getGetWeatherButton() {
        return getWeatherButton;
    }

    function setBackground(clouds) {
        switch (clouds) {
            case 'cloudy':
                body.style.backgroundImage = `url(${cloudyImage})`;
                break;
            case 'clear sky':
                body.style.backgroundImage = `url(${clearImage})`;
                break;
        }
    }

    function getUserInput() {
        return getWeatherInput.value;
    }

    return {
        setBackground,
        getGetWeatherButton,
        getUserInput
    }
});

export default domModule