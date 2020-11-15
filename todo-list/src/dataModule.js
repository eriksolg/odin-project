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

    function storeNewTodo(title, description, due, priority) {
        let newTodo = todoFactory(title, description, due, priority);
        todos.push(newTodo);
        saveToStorage();
    }

    function getProjects() {
        return projects;
    }


    function storeNewProject(title) {

        let newProject = projectFactory(title);
        projects.push(newProject);
        saveToStorage();
        return true;
    }

    const todoFactory = function(title, description, dueDate, priority) {

        const setCompleted = function() {

        }

        const getInfo = function() {

        }

        return { title, description, dueDate, priority, setCompleted, getInfo }
    }

    return {
        getFromStorage,
        getProjects,
        storeNewTodo,
        storeNewProject
    }

});

export default dataModule