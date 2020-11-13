const domModule = (function() {
    let newToDoButton;
    let newProjectForm;
    let todoList;
    let mainSection;
    let newTodoFormContainer;

    function queryDomElements() {
        newToDoButton = document.getElementById('new-todo');
        newProjectForm = document.getElementById('new-project-form')
        todoList = document.getElementById('todo-list');
        mainSection = document.getElementById('main-section');
    }

    function getNewTodoButton() {
        if (newToDoButton != null) {
            return newToDoButton;
        }
        return false;
    }

    function getNewProjectForm() {
        if (newProjectForm != null) {
            return newProjectForm;
        }
        return false;
    }

    function displayNewTodoForm() {
        if (document.getElementById('new-todo-form')) {
            return false;
        }

        let newTodoFormContainer = document.createElement('div');
        let newTodoForm = document.createElement('form');
        let todoTitleLabel = document.createElement('label');
        let todoTitleInput = document.createElement('input');
        let todoDescriptionLabel = document.createElement('label');
        let todoDescriptionInput = document.createElement('textarea');
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
        todoTitleInput.name = 'title';
        todoDescriptionInput.name = 'description';
        todoDueInput.name = 'due';
        todoPriorityInput.name = 'priority';

        todoTitleInput.required = true;
        todoDescriptionInput.required = true;
        //todoDueInput.required = true;
        todoDescriptionInput.required = true;

        newTodoSubmit.type = 'submit';
        todoDueInput.type = 'datetime-local';

        todoTitleInput.maxLength = 20;
        todoDescriptionInput.maxLength = 400;

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

        return newTodoForm;

    }

    return {
        queryDomElements,
        getNewTodoButton,
        getNewProjectForm,
        displayNewTodoForm
    }
});

export default domModule