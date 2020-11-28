import cloudyImage from './assets/cloudy.jpg'
import clearImage from './assets/clear.jpg'
import brokenImage from './assets/broken.jpg'
import overcastImage from './assets/overcast.jpg'
import fewImage from './assets/few.jpg'
import scatteredImage from './assets/scattered.jpg'



const domModule = (function() {
    const body = document.querySelector('body');
    const weatherPanel = document.getElementById('weather-panel');
    const getWeatherButton = document.getElementById('get-weather-button');
    const getWeatherInput = document.getElementById('get-weather-input');
    const infoBox = document.getElementById('info-box');
    const city = document.getElementById('city');
    const clouds = document.getElementById('clouds');
    const temperature = document.getElementById('temperature');
    const pressure = document.getElementById('pressure');
    const humidity = document.getElementById('humidity');




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
            case 'broken clouds':
                body.style.backgroundImage = `url(${brokenImage})`;
                break;
            case 'overcast clouds':
                body.style.backgroundImage = `url(${overcastImage})`;
                break;
            case 'few clouds':
                body.style.backgroundImage = `url(${fewImage})`;
                break;
            case 'scattered clouds':
                body.style.backgroundImage = `url(${scatteredImage})`;
                break;
        }
    }

    function getGetWeatherInput() {
        return getWeatherInput;
    }

    function clearInfoBox() {
        infoBox.style.display = 'none';
        [city, clouds, temperature, pressure, humidity].forEach(element => {
            element.innerHTML = '';
        });

    }

    function displayInfoBox(parsedWeatherData) {
        let loadingText = document.getElementById('loading');
        weatherPanel.removeChild(loadingText);
        infoBox.style.display = 'block';
        city.innerHTML = parsedWeatherData.locationName;
        clouds.innerHTML = parsedWeatherData.clouds;
        temperature.innerHTML = `${parsedWeatherData.temperature} °C`;
        pressure.innerHTML = `${parsedWeatherData.pressure} hPa`;
        humidity.innerHTML = `${parsedWeatherData.humidity} %`;
    }

    function displayLoading() {
        if (document.getElementById('loading')) {
            return;
        }
        infoBox.style.display = 'none';
        let loadingText = document.createElement('h1');
        loadingText.id = 'loading';
        loadingText.innerHTML = 'Loading...';
        weatherPanel.appendChild(loadingText);
    }

    return {
        setBackground,
        getGetWeatherButton,
        getGetWeatherInput,
        clearInfoBox,
        displayInfoBox,
        displayLoading,
    }
});

export default domModule