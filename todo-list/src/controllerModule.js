import dataModule from './dataModule'
import domModule from './domModule'

const controllerModule = (function() {
    const currentDomModule = domModule();
    const currentDataModule = dataModule();

    function invokeRefreshProjects() {
        let projects = currentDataModule.getProjects();
        currentDomModule.refreshProjects(projects);
    }

    function checkIfProjectExists(title) {
        let projects = currentDataModule.getProjects();
        return projects.some(element => element.name == title);
    }

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

        if (checkIfProjectExists(this.title.value)) {
            currentDomModule.showProjectFormError('This project already exists!');
            event.preventDefault();
        } else {
            currentDomModule.showProjectFormError('');
            currentDataModule.storeNewProject(this.title.value)
        }

        invokeRefreshProjects();
    }

    function init() {
        currentDataModule.getFromStorage();
        currentDomModule.queryDomElements();
        invokeRefreshProjects();
        currentDomModule.getNewTodoButton().addEventListener('click', newTodoForm);
        currentDomModule.getNewProjectForm().addEventListener('submit', newProjectSubmit);
    }

    return {
        init
    }
});

export default controllerModule