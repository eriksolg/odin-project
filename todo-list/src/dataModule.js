import Basil from 'basil.js'

const dataModule = (function() {
    const basil = new Basil({ namespace: 'foo', storages: ['local'] });
    let todos;
    let projects;
    let todosInProject;

    const projectFactory = function(name) {
        return { name }
    }

    function saveToStorage() {
        basil.set('todos', todos);
        basil.set('projects', projects);
    }

    function getFromStorage() {
        //basil.reset();
        todos = basil.get('todos') || [];
        projects = basil.get('projects') || [];
    }

    function storeNewTodo(title, description, due, priority, project) {
        let newTodo = todoFactory(title, description, due, priority, project);
        todos.push(newTodo);
        saveToStorage();
    }

    function getProjects() {
        return projects;
    }

    function getTodos() {
        return todos;
    }

    function storeNewProject(title) {

        let newProject = projectFactory(title);
        projects.push(newProject);
        saveToStorage();
        return true;
    }

    const todoFactory = function(title, description, dueDate, priority, project) {

        return { title, description, dueDate, priority, project }
    }

    return {
        getFromStorage,
        getProjects,
        getTodos,
        storeNewTodo,
        storeNewProject
    }

});

export default dataModule