import domModule from './domModule'
import weatherModule from './weatherModule'

const controllerModule = (function() {
    const currentDomModule = new domModule;
    const currentWeatherModule = new weatherModule;
    const weatherApiKey = 'cf793a2c77c50f7ed140b28244dbcb20';

    function setListeners() {
        const getWeatherButton = currentDomModule.getGetWeatherButton();
        getWeatherButton.addEventListener('click', newWeatherQuery);
    }

    async function newWeatherQuery() {
        let userInput = currentDomModule.getUserInput();
        if (!userInput) {
            return;
        }
        let weatherData = await currentWeatherModule.queryWeatherData(weatherApiKey, userInput);
        console.log(weatherData);
        let locationName = weatherData.name;
        let clouds = weatherData.weather[0].description;
        let humidity = weatherData.main.humidity;
        let pressure = weatherData.main.pressure;
        let temperature = weatherData.main.temp;
        let wind = weatherData.wind.speed;


        currentDomModule.setBackground(clouds);
        console.log(clouds);
    }

    function init() {
        currentDomModule.setBackground('clear sky');
        setListeners();
    }

    return {
        init
    }
});

export default controllerModule;