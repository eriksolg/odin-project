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

    function validateNewProjectForm(form) {
        if ((form.title.value == '') ||
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

    function newProjectSubmit() {
        validateNewProjectForm(this);
        if (!currentDataModule.storeNewProject(this.title.value)) {
            this.title.setCustomValidity('Project with this name already exists!');
            event.preventDefault();
        }
    }

    function init() {
        currentDataModule.getFromStorage();
        currentDomModule.queryDomElements();
        currentDomModule.getNewTodoButton().addEventListener('click', newTodoForm);
        currentDomModule.getNewProjectForm().addEventListener('submit', newProjectSubmit);
    }

    return {
        init
    }
});

export default controllerModule