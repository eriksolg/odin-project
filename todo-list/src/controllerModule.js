import dataModule from './dataModule'
import domModule from './domModule'

const controllerModule = (function() {
    const currentDomModule = domModule();
    const currentDataModule = dataModule();

    function todoDone(id) {
        currentDataModule.markTodoDone(id)
        invokeRefreshTodos(this);
    }

    function todoEdit(todoName, todoProject) {
        invokeRefreshTodos(this);
    }

    function todoDelete(id) {
        currentDataModule.deleteTodo(id)
        invokeRefreshTodos(this);
    }

    function selectProject() {
        let project = event.target.parentElement.getAttribute('data-project-name');
        invokeRefreshTodos(this, project);
    }

    function deleteProject() {
        let project = event.target.parentElement.getAttribute('data-project-name');
        currentDataModule.deleteProject(project);
        invokeRefreshProjects();
        invokeRefreshTodos(this);

    }

    function invokeRefreshProjects() {
        let projects = currentDataModule.getProjects();
        currentDomModule.refreshProjects(projects, selectProject, deleteProject);
    }

    function invokeRefreshTodos(context, project) {
        let todos = currentDataModule.getTodos(project);
        currentDomModule.refreshTodos(todos, todoDone, todoEdit, todoDelete);
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

        currentDataModule.storeNewTodo(this.title.value, this.description.value, this.due.value, this.priority.value, this.project.value);
    }

    function newTodoForm() {
        let projects = currentDataModule.getProjects();
        let todoForm = currentDomModule.displayNewTodoForm(projects);
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
        invokeRefreshTodos();
        currentDomModule.getNewTodoButton().addEventListener('click', newTodoForm);
        currentDomModule.getNewProjectForm().addEventListener('submit', newProjectSubmit);
        currentDomModule.getAllProjectsButton().addEventListener('click', invokeRefreshTodos);
    }

    return {
        init
    }
});

export default controllerModule