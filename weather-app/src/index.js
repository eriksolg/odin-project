import controllerModule from './controllerModule'

const weatherApp = (function() {
    const currentControllerModule = new controllerModule;
    currentControllerModule.init();
})();