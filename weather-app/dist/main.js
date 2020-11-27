/******/
(() => { // webpackBootstrap
    /******/
    "use strict";

    ; // CONCATENATED MODULE: ./src/domModule.js
    const domModule = (function() {

    });

    /* harmony default export */
    const src_domModule = (domModule);; // CONCATENATED MODULE: ./src/weatherModule.js
    const weatherModule = (function() {

    });

    /* harmony default export */
    const src_weatherModule = (weatherModule);; // CONCATENATED MODULE: ./src/controllerModule.js



    const controllerModule = (function() {
        const currentDomModule = new src_domModule;
        const currentWeatherModule = new src_weatherModule;

        function init() {
            console.log(1);
        }

        return {
            init
        }
    });

    /* harmony default export */
    const src_controllerModule = (controllerModule);; // CONCATENATED MODULE: ./src/index.js


    const weatherApp = (function() {
        const currentControllerModule = new src_controllerModule;
        currentControllerModule.init();
    })();
    /******/
})();