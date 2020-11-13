import dataModule from './dataModule'
import domModule from './domModule'

const controllerModule = (function() {
    const currentDomModule = domModule();

    function newTodo() {
        currentDomModule.displayNewTodoForm();
    }

    function init() {
        currentDomModule.queryDomElements();
        currentDomModule.getNewTodoButton().addEventListener('click', newTodo);
    }

    return {
        init
    }
});

export default controllerModule