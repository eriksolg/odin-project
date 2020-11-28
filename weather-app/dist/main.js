/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 982:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e41aaa50186d7fdfdecb.jpg";

/***/ }),

/***/ 885:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d23dca44c04207dae5f3.jpg";

/***/ }),

/***/ 440:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a928263c8a16b66bcce7.jpg";

/***/ }),

/***/ 70:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "33b4d54d826c53158d71.jpg";

/***/ }),

/***/ 161:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fe5c6aeb0f3e7847cda3.jpg";

/***/ }),

/***/ 579:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cce1f47cd11a7476876c.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {

// EXTERNAL MODULE: ./src/assets/cloudy.jpg
var cloudy = __webpack_require__(440);
// EXTERNAL MODULE: ./src/assets/clear.jpg
var clear = __webpack_require__(885);
// EXTERNAL MODULE: ./src/assets/broken.jpg
var broken = __webpack_require__(982);
// EXTERNAL MODULE: ./src/assets/overcast.jpg
var overcast = __webpack_require__(161);
// EXTERNAL MODULE: ./src/assets/few.jpg
var few = __webpack_require__(70);
// EXTERNAL MODULE: ./src/assets/scattered.jpg
var scattered = __webpack_require__(579);
;// CONCATENATED MODULE: ./src/domModule.js









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
                body.style.backgroundImage = `url(${cloudy})`;
                break;
            case 'clear sky':
                body.style.backgroundImage = `url(${clear})`;
                break;
            case 'broken clouds':
                body.style.backgroundImage = `url(${broken})`;
                break;
            case 'overcast clouds':
                body.style.backgroundImage = `url(${overcast})`;
                break;
            case 'few clouds':
                body.style.backgroundImage = `url(${few})`;
                break;
            case 'scattered clouds':
                body.style.backgroundImage = `url(${scattered})`;
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

/* harmony default export */ const src_domModule = (domModule);
;// CONCATENATED MODULE: ./src/weatherModule.js
const weatherModule = (function() {
    async function queryWeatherData(apiKey, location) {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
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

/* harmony default export */ const src_weatherModule = (weatherModule);
;// CONCATENATED MODULE: ./src/controllerModule.js



const controllerModule = (function() {
    const currentDomModule = new src_domModule;
    const currentWeatherModule = new src_weatherModule;
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

/* harmony default export */ const src_controllerModule = (controllerModule);
;// CONCATENATED MODULE: ./src/index.js


const weatherApp = (function() {
    const currentControllerModule = new src_controllerModule;
    currentControllerModule.init();
})();
})();

/******/ })()
;