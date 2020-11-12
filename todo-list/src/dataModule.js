const dataModule = (function() {
    let todos;
    let projects;
    let todosInProject;

    const projectFactory = function(name) {
        return { name }
    }
    const todoFactory = function() {
        let title;
        let description;
        let dueDate;
        let priority;
        let isCompleted;

        const setCompleted = function() {

        }

        const getInfo = function() {

        }

        return { title, description, dueDate, priority, isCompleted, setCompleted, getInfo }
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

});

export default dataModule