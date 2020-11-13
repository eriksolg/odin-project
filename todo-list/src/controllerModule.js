import dataModule from './dataModule'
import domModule from './domModule'

const controllerModule = (function() {
    const currentDomModule = domModule();
    const currentDataModule = dataModule();

    function validateNewTodoForm(form) {
        if ((form.description.value == '') ||
            (form.description.value.length > 400)) {
            form.description.focus();
            event.preventDefault();
        } else if ((form.title.value == '') ||
            (form.title.value.length > 20)) {
            form.title.focus();
            event.preventDefault();
        }
    }

    function newTodoSubmit() {
        validateNewTodoForm(this);
        currentDataModule.storeNewTodo(this.title.value, this.description.value, this.due.value, this.priority.value);
    }

    function newTodoForm() {
        let todoForm = currentDomModule.displayNewTodoForm();
        if (todoForm) {
            todoForm.addEventListener('submit', newTodoSubmit);
        }
    }





    function newTodoSubmitted() {

    }

    function init() {
        currentDomModule.queryDomElements();
        currentDomModule.getNewTodoButton().addEventListener('click', newTodoForm);
    }

    return {
        init
    }
});

export default controllerModule