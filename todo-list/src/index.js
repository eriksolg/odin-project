import controllerModule from './controllerModule';

const todoList = (function() {
    const currentControllerModule = controllerModule();
    currentControllerModule.init();
})();