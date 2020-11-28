const weatherModule = (function() {
    async function queryWeatherData(apiKey, location, errorCallback) {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
            const weatherData = await response.json();
            return weatherData;
        } catch (err) {
            errorCallback(err);
        }
    }

    return {
        queryWeatherData
    }

});

export default weatherModule