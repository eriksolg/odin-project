const domModule = (function() {
    let newToDoButton;
    let newProjectForm;
    let projectList;
    let todoList;
    let mainSection;
    let projectFormError;

    function queryDomElements() {
        newToDoButton = document.getElementById('new-todo');
        newProjectForm = document.getElementById('new-project-form');
        projectFormError = document.getElementById('project-form-error');
        projectList = document.getElementById('project-list');
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

    function showProjectFormError(text) {
        projectFormError.textContent = text;
    }

    function refreshProjects(projects) {
        projectList.innerHTML = '';
        projects.forEach(project => {
            let projectSelectButton = document.createElement('button');
            projectSelectButton.classList.add('project-select-button');
            projectSelectButton.setAttribute('data-project-name', project.name);
            projectSelectButton.textContent = project.name;
            projectList.appendChild(projectSelectButton);
        });
    }

    function refreshTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            let todoCard = document.createElement('div');
            let todoTitle = document.createElement('div');
            let todoDue = document.createElement('div');
            let todoProject = document.createElement('div');

            todoCard.classList.add('todo-card');
            todoTitle.classList.add('todo-title');
            todoDue.classList.add('todo-due');
            todoProject.classList.add('todo-project');


            todoTitle.textContent = todo.title;
            todoDue.textContent = todo.dueDate;
            todoProject.textContent = todo.project;

            todoCard.setAttribute('data-todo-name', todo.title);

            todoCard.appendChild(todoTitle);
            todoCard.appendChild(todoDue);
            todoCard.appendChild(todoProject);
            todoList.appendChild(todoCard);
        });
    }

    function displayNewTodoForm(projects) {
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
        let todoProjectLabel = document.createElement('label');
        let todoProjectInput = document.createElement('select');
        let newTodoSubmit = document.createElement('input');

        newTodoFormContainer.id = 'new-todo-form-container';
        newTodoForm.id = 'new-todo-form';
        todoTitleInput.name = 'title';
        todoDescriptionInput.name = 'description';
        todoDueInput.name = 'due';
        todoPriorityInput.name = 'priority';
        todoProjectInput.name = 'project';

        todoTitleInput.required = true;
        todoDescriptionInput.required = true;
        //todoDueInput.required = true;
        todoDescriptionInput.required = true;

        newTodoSubmit.type = 'submit';
        todoDueInput.type = 'date';

        todoTitleInput.maxLength = 20;
        todoDescriptionInput.maxLength = 400;

        todoTitleLabel.textContent = 'Title';
        todoDescriptionLabel.textContent = 'Description';
        todoDueLabel.textContent = 'Due';
        todoPriorityLabel.textContent = 'Priority';
        todoProjectLabel.textContent = 'Project';

        todoPriorityLow.textContent = 'Low';
        todoPriorityMedium.textContent = 'Medium';
        todoPriorityHigh.textContent = 'High';

        projects.forEach(project => {
            let projectElement = document.createElement('option');
            projectElement.textContent = project.name;
            todoProjectInput.appendChild(projectElement);
        });

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
        newTodoForm.appendChild(todoProjectLabel);
        newTodoForm.appendChild(todoProjectInput);
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
        refreshProjects,
        refreshTodos,
        displayNewTodoForm,
        showProjectFormError
    }
});

export default domModule