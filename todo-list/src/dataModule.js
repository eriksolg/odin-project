import Basil from 'basil.js'

const dataModule = (function() {
    const basil = new Basil({ namespace: 'foo', storages: ['local'] });
    let todos;
    let projects;
    let todoID;

    const projectFactory = function(name) {
        return { name }
    }

    function saveToStorage() {
        basil.set('todos', todos);
        basil.set('projects', projects);
        basil.set('todoID', todoID);
    }

    function getFromStorage() {
        //basil.reset();
        todos = basil.get('todos') || [];
        projects = basil.get('projects') || [projectFactory('Default')];
        todoID = basil.get('todoID') || 0;
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
        console.log(todos);
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
                todo.isCompleted = true;
            }
        });
        saveToStorage();
    }

    function markTodoNotDone(id) {
        todos.forEach(todo => {
            if (todo.id == id) {
                todo.isCompleted = false;
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
        todos = todos.filter(todo => !(todo.project == project));
        saveToStorage();
    }

    const todoFactory = function(title, description, dueDate, priority, project) {

        return {
            id: todoID++,
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
        markTodoNotDone,
        deleteTodo,
        deleteProject,
        storeNewTodo,
        storeNewProject
    }

});

export default dataModule