const domModule = (function() {
    let newToDoButton;
    let todoList;
    let mainSection;
    let newTodoFormContainer;

    function queryDomElements() {
        newToDoButton = document.querySelector('#new-todo');
        todoList = document.querySelector('#todo-list');
        mainSection = document.querySelector('#main-section');
    }

    function getNewTodoButton() {
        if (newToDoButton != null) {
            return newToDoButton;
        }
        return false;
    }

    function displayNewTodoForm() {
        let newTodoFormContainer = document.createElement('div');
        let newTodoForm = document.createElement('form');
        let todoTitleLabel = document.createElement('label');
        let todoTitleInput = document.createElement('input');
        let todoDescriptionLabel = document.createElement('label');
        let todoDescriptionInput = document.createElement('input');
        let todoDueLabel = document.createElement('label');
        let todoDueInput = document.createElement('input');
        let todoPriorityLabel = document.createElement('label');
        let todoPriorityInput = document.createElement('select');
        let todoPriorityLow = document.createElement('option');
        let todoPriorityMedium = document.createElement('option');
        let todoPriorityHigh = document.createElement('option');
        let newTodoSubmit = document.createElement('input');

        newTodoFormContainer.id = 'new-todo-form-container';
        newTodoForm.id = 'new-todo-form';
        todoTitleInput.id = 'todo-title-input'
        todoDescriptionInput.id = 'todo-description-input'
        todoDueInput.id = 'todo-due-input'
        todoPriorityInput.id = 'todo-priority-input'

        newTodoSubmit.type = 'submit';
        todoDueInput.type = 'datetime-local';


        todoTitleLabel.textContent = 'Title';
        todoDescriptionLabel.textContent = 'Description';
        todoDueLabel.textContent = 'Due';
        todoPriorityLabel.textContent = 'Priority';

        todoPriorityLow.textContent = 'Low';
        todoPriorityMedium.textContent = 'Medium';
        todoPriorityHigh.textContent = 'High';

        todoTitleLabel.htmlFor = 'todo-title-input';
        todoDescriptionLabel.htmlFor = 'todo-description-input';
        todoDueLabel.htmlFor = 'todo-due-input';
        todoPriorityLabel.htmlFor = 'todo-priority-input';

        todoPriorityInput.appendChild(todoPriorityLow);
        todoPriorityInput.appendChild(todoPriorityMedium);
        todoPriorityInput.appendChild(todoPriorityHigh);

        newTodoForm.appendChild(todoTitleLabel);
        newTodoForm.appendChild(todoTitleInput);
        newTodoForm.appendChild(todoDescriptionLabel);
        newTodoForm.appendChild(todoDescriptionInput);
        newTodoForm.appendChild(todoDueLabel);
        newTodoForm.appendChild(todoDueInput);
        newTodoForm.appendChild(todoPriorityLabel);
        newTodoForm.appendChild(todoPriorityInput);
        newTodoForm.appendChild(newTodoSubmit);


        newTodoFormContainer.appendChild(newTodoForm);

        todoList.style.display = 'none';
        mainSection.appendChild(newTodoFormContainer);

    }

    return {
        queryDomElements,
        getNewTodoButton,
        displayNewTodoForm
    }
});

export default domModule