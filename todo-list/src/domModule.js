const domModule = (function() {
    let newToDoButton;
    let allProjectsButton;
    let newProjectForm;
    let projectList;
    let todoList;
    let mainSection;
    let projectFormError;

    function queryDomElements() {
        newToDoButton = document.getElementById('new-todo');
        allProjectsButton = document.getElementById('project-select-all-button');
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

    function getAllProjectsButton() {
        if (allProjectsButton != null) {
            return allProjectsButton;
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

    function refreshProjects(projects, projectSelectCallback, projectDeleteCallback) {
        projectList.innerHTML = '';
        projects.forEach(project => {
            let projectSelectEntry = document.createElement('div');
            let projectSelectButton = document.createElement('button');
            let projectDeleteButton = document.createElement('button');
            projectSelectEntry.classList.add('project-select-entry');
            projectSelectButton.classList.add('project-select-button');
            projectDeleteButton.classList.add('delete-project-button');
            projectSelectEntry.setAttribute('data-project-name', project.name);
            projectSelectButton.textContent = project.name;
            projectDeleteButton.textContent = '-';

            projectSelectButton.addEventListener('click', projectSelectCallback);
            projectDeleteButton.addEventListener('click', projectDeleteCallback);
            projectSelectEntry.appendChild(projectSelectButton);
            projectSelectEntry.appendChild(projectDeleteButton);
            projectList.appendChild(projectSelectEntry);
        });
    }

    function refreshTodos(todos, todoDoneCallback, todoEditCallback, todoDeleteCallback, todoNotDoneCallback) {
        todoList.innerHTML = '';
        todoList.style.display = 'block';
        if (todoList.nextSibling != null) {
            todoList.nextSibling.remove();
        }
        todos.sort((a, b) => {
            if (a.dueDate < b.dueDate) {
                return -1;
            } else {
                return 1;
            }
        }).forEach(todo => {
            let todoCard = document.createElement('div');
            let todoCardHeader = document.createElement('div');
            let todoTitle = document.createElement('div');
            let todoDue = document.createElement('div');
            let todoProject = document.createElement('div');
            let todoDetails = document.createElement('div');
            let todoDescriptionLabel = document.createElement('div');
            let todoDescription = document.createElement('div');
            let todoButtonContainer = document.createElement('div');
            let todoDoneButton = document.createElement('button');
            let todoEditButton = document.createElement('button');
            let todoDeleteButton = document.createElement('button');

            todoCard.classList.add('todo-card');
            todoCardHeader.classList.add('todo-card-header');
            if (todo.isCompleted) {
                todoCardHeader.classList.add(`todo-done`);
            } else {
                todoCardHeader.classList.add(`priority-${todo.priority.toLowerCase()}`);
            }
            todoTitle.classList.add('todo-title');
            todoDue.classList.add('todo-due');
            todoProject.classList.add('todo-project');
            todoDetails.classList.add('todo-details-hidden');
            todoDescriptionLabel.classList.add('todo-description-label');
            todoDescription.classList.add('todo-description');
            todoButtonContainer.classList.add('todo-button-container');
            todoDoneButton.classList.add(todo.isCompleted ? 'todo-notdone-button' : 'todo-done-button');
            todoEditButton.classList.add('todo-edit-button');
            todoDeleteButton.classList.add('todo-delete-button');

            todoTitle.textContent = todo.title;
            todoDue.textContent = `Due: ${todo.dueDate}`;
            todoProject.textContent = todo.project;
            todoDescriptionLabel.textContent = 'Description:'
            todoDescription.textContent = todo.description;
            todoDoneButton.textContent = todo.isCompleted ? 'NOT DONE' : 'DONE';
            todoEditButton.textContent = 'EDIT';
            todoDeleteButton.textContent = 'DELETE';

            todoDoneButton.addEventListener('click', todo.isCompleted ? todoNotDoneCallback.bind(this, todo.id) : todoDoneCallback.bind(this, todo.id));
            todoEditButton.addEventListener('click', todoEditCallback.bind(this, todo.title, todo.project));
            todoDeleteButton.addEventListener('click', todoDeleteCallback.bind(this, todo.id));

            todoCard.setAttribute('data-todo-id', todo.id);

            todoCardHeader.addEventListener('click', () => {
                todoDetails.classList.toggle('todo-details');
                todoDetails.classList.toggle('todo-details-hidden');
            });

            todoCardHeader.appendChild(todoTitle);
            todoCardHeader.appendChild(todoDue);
            todoCardHeader.appendChild(todoProject);
            todoButtonContainer.appendChild(todoDoneButton);
            todoButtonContainer.appendChild(todoEditButton);
            todoButtonContainer.appendChild(todoDeleteButton);
            todoDetails.appendChild(todoDescriptionLabel);
            todoDetails.appendChild(todoDescription);
            todoDetails.appendChild(todoButtonContainer);
            todoCard.appendChild(todoCardHeader);
            todoCard.appendChild(todoDetails);
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
        todoDueInput.valueAsDate = new Date();

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
        getAllProjectsButton,
        refreshProjects,
        refreshTodos,
        displayNewTodoForm,
        showProjectFormError
    }
});

export default domModule