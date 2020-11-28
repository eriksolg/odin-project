const weatherModule = (function() {
    async function queryWeatherData(apiKey, location) {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
            const weatherData = await response.json();
            return weatherData;
        } catch (err) {
            console.log(err);
        }
    }

    return {
        queryWeatherData
    }

});

export default weatherModule