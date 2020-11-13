const dataModule = (function() {
    let todos;
    let projects;
    let todosInProject;

    const projectFactory = function(name) {
        return { name }
    }

    function storeNewTodo(title, description, due, priority) {
        let newTodo = todoFactory(title, description, due, priority);
        console.log(newTodo);

    }

    const todoFactory = function(title, description, dueDate, priority) {

        const setCompleted = function() {

        }

        const getInfo = function() {

        }

        return { title, description, dueDate, priority, setCompleted, getInfo }
    }

    function newTodo() {
        assignTodoToProject();
    }

    function removeTodo() {

    }

    function newProject() {

    }

    function assignTodoToProject() {

    }

    function getTodos() {

    }

    function getProjects() {

    }

    return {
        storeNewTodo
    }

});

export default dataModule