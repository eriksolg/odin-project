import dataModule from './dataModule'
import domModule from './domModule'

const controllerModule = (function() {
    const currentDomModule = domModule();
    const currentDataModule = dataModule();

    function invokeRefreshTodos(context, project) {
        let todos = currentDataModule.getTodos(project);
        currentDomModule.refreshTodos(todos, todoDone, todoEditForm, todoDelete, todoNotDone);
    }

    function invokeRefreshProjects() {
        let projects = currentDataModule.getProjects();
        currentDomModule.refreshProjects(projects, selectProject, deleteProject);
    }

    function todoDone(id) {
        currentDataModule.markTodoDone(id)
        invokeRefreshTodos(this);
    }

    function todoNotDone(id) {
        currentDataModule.markTodoNotDone(id)
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

    function todoEditSubmit(id) {
        validateNewTodoForm(this);
        currentDataModule.editExistingTodo(id, this.elements.title.value, this.elements.description.value, this.elements.due.value, this.elements.priority.value, this.elements.project.value);
    }

    function newTodoForm() {
        let projects = currentDataModule.getProjects();
        let todoForm = currentDomModule.displayNewTodoForm(projects);
        if (todoForm) {
            todoForm.addEventListener('submit', newTodoSubmit);
        }
    }

    function todoEditForm(id) {
        let todos = currentDataModule.getTodos();
        let projects = currentDataModule.getProjects();
        let todo = todos.find(element => element.id == id);
        let todoEditForm = currentDomModule.displayTodoEditForm(todo, projects);
        todoEditForm.addEventListener('submit', todoEditSubmit.bind(todoEditForm, id));
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