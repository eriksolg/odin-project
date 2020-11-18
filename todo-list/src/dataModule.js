import Basil from 'basil.js'

const dataModule = (function() {
    const basil = new Basil({ namespace: 'foo', storages: ['local'] });
    let todos;
    let projects;

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
        projects = basil.get('projects') || [projectFactory('Default')];
    }

    function storeNewTodo(title, description, due, priority, project) {
        let newTodo = todoFactory(title, description, due, priority, project);
        todos.push(newTodo);
        saveToStorage();
    }

    function getProjects() {
        return projects;
    }

    function getTodos(project) {
        if (project) {
            return todos.filter(todo => todo.project == project);
        }
        return todos;
    }

    function storeNewProject(title) {

        let newProject = projectFactory(title);
        projects.push(newProject);
        saveToStorage();
        return true;
    }

    function markTodoDone(id) {
        todos.forEach(todo => {
            if (todo.id == id) {
                console.log(todo);
                todo.isCompleted = true;
            }
        });
        saveToStorage();
    }

    function deleteTodo(id) {
        todos = todos.filter(element => !(element.id == id));
        saveToStorage();
    }

    function deleteProject(project) {
        projects = projects.filter(element => !(element.name == project));
        console.log(projects);
        todos = todos.filter(todo => !(todo.project == project));
        saveToStorage();
    }

    const todoFactory = function(title, description, dueDate, priority, project) {

        return {
            id: todos.length,
            title,
            description,
            dueDate,
            priority,
            project,
            isCompleted: false,
            setCompleted() {
                this.isCompleted = true;
            }
        }
    }


    return {
        getFromStorage,
        getProjects,
        getTodos,
        markTodoDone,
        deleteTodo,
        deleteProject,
        storeNewTodo,
        storeNewProject
    }

});

export default dataModule