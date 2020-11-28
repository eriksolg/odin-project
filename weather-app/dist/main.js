/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 885:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d23dca44c04207dae5f3.jpg";

/***/ }),

/***/ 440:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a928263c8a16b66bcce7.jpg";

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
;// CONCATENATED MODULE: ./src/domModule.js



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
                body.style.backgroundImage = `url(${cloudy})`;
                break;
            case 'clear sky':
                body.style.backgroundImage = `url(${clear})`;
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

/* harmony default export */ const src_domModule = (domModule);
;// CONCATENATED MODULE: ./src/weatherModule.js
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

/* harmony default export */ const src_weatherModule = (weatherModule);
;// CONCATENATED MODULE: ./src/controllerModule.js



const controllerModule = (function() {
    const currentDomModule = new src_domModule;
    const currentWeatherModule = new src_weatherModule;
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

/* harmony default export */ const src_controllerModule = (controllerModule);
;// CONCATENATED MODULE: ./src/index.js


const weatherApp = (function() {
    const currentControllerModule = new src_controllerModule;
    currentControllerModule.init();
})();
})();

/******/ })()
;