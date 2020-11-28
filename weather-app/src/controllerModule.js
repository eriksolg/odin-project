import domModule from './domModule'
import weatherModule from './weatherModule'

const controllerModule = (function() {
    const currentDomModule = new domModule;
    const currentWeatherModule = new weatherModule;
    const weatherApiKey = 'cf793a2c77c50f7ed140b28244dbcb20';

    function setListeners() {
        const getWeatherInput = currentDomModule.getGetWeatherInput();
        const getWeatherButton = currentDomModule.getGetWeatherButton();
        getWeatherButton.addEventListener('click', newWeatherQuery);
        getWeatherInput.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                getWeatherButton.click();
            }
        });

    }

    async function newWeatherQuery() {
        let userInput = currentDomModule.getGetWeatherInput().value;
        if (!userInput) {
            return;
        }
        currentDomModule.displayLoading();
        let weatherData = await currentWeatherModule.queryWeatherData(weatherApiKey, userInput);
        let parsedWeatherData = {
            locationName: weatherData.name,
            clouds: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            temperature: weatherData.main.temp,
            wind: weatherData.wind.speed,
        };


        currentDomModule.setBackground(parsedWeatherData.clouds);
        currentDomModule.displayInfoBox(parsedWeatherData);

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