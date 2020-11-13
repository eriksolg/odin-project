import controllerModule from './controllerModule';
import constrollerModule from './controllerModule'

const todoList = (function() {
    const currentControllerModule = constrollerModule();
    currentControllerModule.init();
})();