/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 632:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;(function () {
	// Basil
	var Basil = function (options) {
		return Basil.utils.extend({}, Basil.plugins, new Basil.Storage().init(options));
	};

	// Version
	Basil.version = '0.4.11';

	// Utils
	Basil.utils = {
		extend: function () {
			var destination = typeof arguments[0] === 'object' ? arguments[0] : {};
			for (var i = 1; i < arguments.length; i++) {
				if (arguments[i] && typeof arguments[i] === 'object')
					for (var property in arguments[i])
						destination[property] = arguments[i][property];
			}
			return destination;
		},
		each: function (obj, fnIterator, context) {
			if (this.isArray(obj)) {
				for (var i = 0; i < obj.length; i++)
					if (fnIterator.call(context, obj[i], i) === false) return;
			} else if (obj) {
				for (var key in obj)
					if (fnIterator.call(context, obj[key], key) === false) return;
			}
		},
		tryEach: function (obj, fnIterator, fnError, context) {
			this.each(obj, function (value, key) {
				try {
					return fnIterator.call(context, value, key);
				} catch (error) {
					if (this.isFunction(fnError)) {
						try {
							fnError.call(context, value, key, error);
						} catch (error) {}
					}
				}
			}, this);
		},
		registerPlugin: function (methods) {
			Basil.plugins = this.extend(methods, Basil.plugins);
		},
		getTypeOf: function (obj) {
			if (typeof obj === 'undefined' || obj === null)
				return '' + obj;
			return Object.prototype.toString.call(obj).replace(/^\[object\s(.*)\]$/, function ($0, $1) { return $1.toLowerCase(); });
		}
	};

	// Add some isType methods: isArguments, isBoolean, isFunction, isString, isArray, isNumber, isDate, isRegExp, isUndefined, isNull.
	var types = ['Arguments', 'Boolean', 'Function', 'String', 'Array', 'Number', 'Date', 'RegExp', 'Undefined', 'Null'];
	for (var i = 0; i < types.length; i++) {
		Basil.utils['is' + types[i]] = (function (type) {
			return function (obj) {
				return Basil.utils.getTypeOf(obj) === type.toLowerCase();
			};
		})(types[i]);
	}

	// Plugins
	Basil.plugins = {};

	// Options
	Basil.options = Basil.utils.extend({
		namespace: 'b45i1',
		storages: ['local', 'cookie', 'session', 'memory'],
		expireDays: 365,
		keyDelimiter: '.'
	}, window.Basil ? window.Basil.options : {});

	// Storage
	Basil.Storage = function () {
		var _salt = 'b45i1' + (Math.random() + 1)
				.toString(36)
				.substring(7),
			_storages = {},
			_isValidKey = function (key) {
				var type = Basil.utils.getTypeOf(key);
				return (type === 'string' && key) || type === 'number' || type === 'boolean';
			},
			_toStoragesArray = function (storages) {
				if (Basil.utils.isArray(storages))
					return storages;
				return Basil.utils.isString(storages) ? [storages] : [];
			},
			_toStoredKey = function (namespace, path, delimiter) {
				var key = '';
				if (_isValidKey(path)) {
					key += path;
				} else if (Basil.utils.isArray(path)) {
					path = Basil.utils.isFunction(path.filter) ? path.filter(_isValidKey) : path;
					key = path.join(delimiter);
				}
				return key && _isValidKey(namespace) ? namespace + delimiter + key : key;
 			},
			_toKeyName = function (namespace, key, delimiter) {
				if (!_isValidKey(namespace))
					return key;
				return key.replace(new RegExp('^' + namespace + delimiter), '');
			},
			_toStoredValue = function (value) {
				return JSON.stringify(value);
			},
			_fromStoredValue = function (value) {
				return value ? JSON.parse(value) : null;
			};

		// HTML5 web storage interface
		var webStorageInterface = {
			engine: null,
			check: function () {
				try {
					window[this.engine].setItem(_salt, true);
					window[this.engine].removeItem(_salt);
				} catch (e) {
					return false;
				}
				return true;
			},
			set: function (key, value, options) {
				if (!key)
					throw Error('invalid key');
				window[this.engine].setItem(key, value);
			},
			get: function (key) {
				return window[this.engine].getItem(key);
			},
			remove: function (key) {
				window[this.engine].removeItem(key);
			},
			reset: function (namespace) {
				for (var i = 0, key; i < window[this.engine].length; i++) {
					key = window[this.engine].key(i);
					if (!namespace || key.indexOf(namespace) === 0) {
						this.remove(key);
						i--;
					}
				}
			},
			keys: function (namespace, delimiter) {
				var keys = [];
				for (var i = 0, key; i < window[this.engine].length; i++) {
					key = window[this.engine].key(i);
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key, delimiter));
				}
				return keys;
			}
		};

		// local storage
		_storages.local = Basil.utils.extend({}, webStorageInterface, {
			engine: 'localStorage'
		});
		// session storage
		_storages.session = Basil.utils.extend({}, webStorageInterface, {
			engine: 'sessionStorage'
		});

		// memory storage
		_storages.memory = {
			_hash: {},
			check: function () {
				return true;
			},
			set: function (key, value, options) {
				if (!key)
					throw Error('invalid key');
				this._hash[key] = value;
			},
			get: function (key) {
				return this._hash[key] || null;
			},
			remove: function (key) {
				delete this._hash[key];
			},
			reset: function (namespace) {
				for (var key in this._hash) {
					if (!namespace || key.indexOf(namespace) === 0)
						this.remove(key);
				}
			},
			keys: function (namespace, delimiter) {
				var keys = [];
				for (var key in this._hash)
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key, delimiter));
				return keys;
			}
		};

		// cookie storage
		_storages.cookie = {
			check: function (options) {
				if (!navigator.cookieEnabled)
					return false;
				if (window.self !== window.top) {
					// we need to check third-party cookies;
					var cookie = 'thirdparty.check=' + Math.round(Math.random() * 1000);
					document.cookie = cookie + '; path=/';
					return document.cookie.indexOf(cookie) !== -1;
				}
				// if cookie secure activated, ensure it works (not the case if we are in http only)
				if (options && options.secure) {
					try {
						this.set(_salt, _salt, options);
						var hasSecurelyPersited = this.get(_salt) === _salt;
						this.remove(_salt);
						return hasSecurelyPersited;
					} catch (error) {
						return false;
					}
				}
				return true;
			},
			set: function (key, value, options) {
				if (!this.check())
					throw Error('cookies are disabled');
				options = options || {};
				if (!key)
					throw Error('invalid key');
				var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
				// handle expiration days
				if (options.expireDays) {
					var date = new Date();
					date.setTime(date.getTime() + (options.expireDays * 24 * 60 * 60 * 1000));
					cookie += '; expires=' + date.toGMTString();
				}
				// handle domain
				if (options.domain && options.domain !== document.domain) {
					var _domain = options.domain.replace(/^\./, '');
					if (document.domain.indexOf(_domain) === -1 || _domain.split('.').length <= 1)
						throw Error('invalid domain');
					cookie += '; domain=' + options.domain;
				}
				// handle same site
				if (options.sameSite && ['lax','strict','none'].includes(options.sameSite.toLowerCase())) {
					cookie += '; SameSite=' + options.sameSite;
				}
				// handle secure
				if (options.secure === true) {
					cookie += '; Secure';
				}
				document.cookie = cookie + '; path=/';
			},
			get: function (key) {
				if (!this.check())
					throw Error('cookies are disabled');
				var encodedKey = encodeURIComponent(key);
				var cookies = document.cookie ? document.cookie.split(';') : [];
				// retrieve last updated cookie first
				for (var i = cookies.length - 1, cookie; i >= 0; i--) {
					cookie = cookies[i].replace(/^\s*/, '');
					if (cookie.indexOf(encodedKey + '=') === 0)
						return decodeURIComponent(cookie.substring(encodedKey.length + 1, cookie.length));
				}
				return null;
			},
			remove: function (key) {
				// remove cookie from main domain
				this.set(key, '', { expireDays: -1 });
				// remove cookie from upper domains
				var domainParts = document.domain.split('.');
				for (var i = domainParts.length; i > 1; i--) {
					this.set(key, '', { expireDays: -1, domain: '.' + domainParts.slice(- i).join('.') });
				}
			},
			reset: function (namespace) {
				var cookies = document.cookie ? document.cookie.split(';') : [];
				for (var i = 0, cookie, key; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					key = cookie.substr(0, cookie.indexOf('='));
					if (!namespace || key.indexOf(namespace) === 0)
						this.remove(key);
				}
			},
			keys: function (namespace, delimiter) {
				if (!this.check())
					throw Error('cookies are disabled');
				var keys = [],
					cookies = document.cookie ? document.cookie.split(';') : [];
				for (var i = 0, cookie, key; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					key = decodeURIComponent(cookie.substr(0, cookie.indexOf('=')));
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key, delimiter));
				}
				return keys;
			}
		};

		return {
			init: function (options) {
				this.setOptions(options);
				return this;
			},
			setOptions: function (options) {
				this.options = Basil.utils.extend({}, this.options || Basil.options, options);
			},
			support: function (storage) {
				return _storages.hasOwnProperty(storage);
			},
			check: function (storage) {
				if (this.support(storage))
					return _storages[storage].check(this.options);
				return false;
			},
			set: function (key, value, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key, options.keyDelimiter)))
					return false;
				value = options.raw === true ? value : _toStoredValue(value);
				var where = null;
				// try to set key/value in first available storage
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					_storages[storage].set(key, value, options);
					where = storage;
					return false; // break;
				}, null, this);
				if (!where) {
					// key has not been set anywhere
					return false;
				}
				// remove key from all other storages
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					if (storage !== where)
						_storages[storage].remove(key);
				}, null, this);
				return true;
			},
			get: function (key, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key, options.keyDelimiter)))
					return null;
				var value = null;
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					if (value !== null)
						return false; // break if a value has already been found.
					value = _storages[storage].get(key, options) || null;
					value = options.raw === true ? value : _fromStoredValue(value);
				}, function (storage, index, error) {
					value = null;
				}, this);
				return value;
			},
			remove: function (key, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key, options.keyDelimiter)))
					return;
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					_storages[storage].remove(key);
				}, null, this);
			},
			reset: function (options) {
				options = Basil.utils.extend({}, this.options, options);
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					_storages[storage].reset(options.namespace);
				}, null, this);
			},
			keys: function (options) {
				options = options || {};
				var keys = [];
				for (var key in this.keysMap(options))
					keys.push(key);
				return keys;
			},
			keysMap: function (options) {
				options = Basil.utils.extend({}, this.options, options);
				var map = {};
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					Basil.utils.each(_storages[storage].keys(options.namespace, options.keyDelimiter), function (key) {
						map[key] = Basil.utils.isArray(map[key]) ? map[key] : [];
						map[key].push(storage);
					}, this);
				}, null, this);
				return map;
			}
		};
	};

	// Access to native storages, without namespace or basil value decoration
	Basil.memory = new Basil.Storage().init({ storages: 'memory', namespace: null, raw: true });
	Basil.cookie = new Basil.Storage().init({ storages: 'cookie', namespace: null, raw: true });
	Basil.localStorage = new Basil.Storage().init({ storages: 'local', namespace: null, raw: true });
	Basil.sessionStorage = new Basil.Storage().init({ storages: 'session', namespace: null, raw: true });

	// browser export
	window.Basil = Basil;

	// AMD export
	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return Basil;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	// commonjs export
	} else {}

})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/basil.js/build/basil.js
var build_basil = __webpack_require__(632);
var basil_default = /*#__PURE__*/__webpack_require__.n(build_basil);
// CONCATENATED MODULE: ./src/dataModule.js
;

const dataModule = (function() {
    const basil = new (basil_default())({ namespace: 'foo', storages: ['local'] });
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

    function editExistingTodo(id, title, description, due, priority, project) {
        todos.forEach(todo => {
            if (todo.id == id) {
                todo.title = title;
                todo.description = description;
                todo.dueDate = due;
                todo.priority = priority;
                todo.project = project;
            }
        })
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
        storeNewProject,
        editExistingTodo
    }

});

/* harmony default export */ const src_dataModule = (dataModule);
// CONCATENATED MODULE: ./src/domModule.js
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
            todoEditButton.addEventListener('click', todoEditCallback.bind(this, todo.id));
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

    function displayTodoEditForm(todo, projects) {

        let todoEditFormContainer = document.createElement('div');
        let todoEditForm = document.createElement('form');
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
        let todoEditSubmit = document.createElement('input');

        todoEditFormContainer.id = 'todo-edit-form-container';
        todoEditForm.id = 'todo-edit-form';
        todoTitleInput.name = 'title';
        todoDescriptionInput.name = 'description';
        todoDueInput.name = 'due';
        todoPriorityInput.name = 'priority';
        todoProjectInput.name = 'project';

        todoTitleInput.required = true;
        todoDescriptionInput.required = true;
        todoDueInput.required = true;

        todoEditSubmit.type = 'submit';
        todoDueInput.type = 'date';

        todoDueInput.value = todo.dueDate;
        todoTitleInput.value = todo.title;
        todoDescriptionInput.value = todo.description;
        todoEditSubmit.value = 'Edit';

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
            if (todo.project == project.name) {
                projectElement.selected = true;
            }
            todoProjectInput.appendChild(projectElement);
        });

        switch (todo.priority) {
            case 'Low':
                todoPriorityLow.selected = true;
                break;
            case 'Medium':
                todoPriorityMedium.selected = true;
                break;
            case 'High':
                todoPriorityHigh.selected = true;
                break;
        }

        todoPriorityInput.appendChild(todoPriorityLow);
        todoPriorityInput.appendChild(todoPriorityMedium);
        todoPriorityInput.appendChild(todoPriorityHigh);

        todoEditForm.appendChild(todoTitleLabel);
        todoEditForm.appendChild(todoTitleInput);
        todoEditForm.appendChild(todoDescriptionLabel);
        todoEditForm.appendChild(todoDescriptionInput);
        todoEditForm.appendChild(todoDueLabel);
        todoEditForm.appendChild(todoDueInput);
        todoEditForm.appendChild(todoPriorityLabel);
        todoEditForm.appendChild(todoPriorityInput);
        todoEditForm.appendChild(todoProjectLabel);
        todoEditForm.appendChild(todoProjectInput);
        todoEditForm.appendChild(todoEditSubmit);

        todoEditFormContainer.appendChild(todoEditForm);

        todoList.style.display = 'none';
        mainSection.appendChild(todoEditFormContainer);

        return todoEditForm;
    }

    function displayNewTodoForm(projects) {
        if (document.getElementById('new-todo-form') || document.getElementById('todo-edit-form')) {
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
        displayTodoEditForm,
        showProjectFormError
    }
});

/* harmony default export */ const src_domModule = (domModule);
// CONCATENATED MODULE: ./src/controllerModule.js
;


const controllerModule = (function() {
    const currentDomModule = src_domModule();
    const currentDataModule = src_dataModule();

    function todoDone(id) {
        currentDataModule.markTodoDone(id)
        invokeRefreshTodos(this);
    }

    function todoNotDone(id) {
        currentDataModule.markTodoNotDone(id)
        invokeRefreshTodos(this);
    }


    function todoDelete(id) {
        currentDataModule.deleteTodo(id)
        invokeRefreshTodos(this);
    }

    function selectProject() {
        let project = event.target.parentElement.getAttribute('data-project-name');
        invokeRefreshTodos(this, project);
    }

    function deleteProject() {
        let project = event.target.parentElement.getAttribute('data-project-name');
        currentDataModule.deleteProject(project);
        invokeRefreshProjects();
        invokeRefreshTodos(this);
    }

    function invokeRefreshProjects() {
        let projects = currentDataModule.getProjects();
        currentDomModule.refreshProjects(projects, selectProject, deleteProject);
    }

    function invokeRefreshTodos(context, project) {
        let todos = currentDataModule.getTodos(project);
        currentDomModule.refreshTodos(todos, todoDone, todoEditForm, todoDelete, todoNotDone);
    }



    function checkIfProjectExists(title) {
        let projects = currentDataModule.getProjects();
        return projects.some(element => element.name == title);
    }

    function validateNewTodoForm(form) {
        if ((form.description.value == '') ||
            (form.description.value.length > 400)) {
            form.description.focus();
            event.preventDefault();
        } else if ((form.title.value == '') ||
            (form.title.value.length > 20)) {
            form.title.focus();
            event.preventDefault();
        }
    }

    function validateNewProjectForm(form) {
        if ((form.title.value == '') ||
            (form.title.value.length > 20)) {
            form.title.focus();
            event.preventDefault();
        }
    }

    function newTodoSubmit() {
        validateNewTodoForm(this);

        currentDataModule.storeNewTodo(this.title.value, this.description.value, this.due.value, this.priority.value, this.project.value);
    }

    function todoEditSubmit(id) {
        validateNewTodoForm(this);
        currentDataModule.editExistingTodo(id, this.elements.title.value, this.elements.description.value, this.elements.due.value, this.elements.priority.value, this.elements.project.value);
    }

    function newTodoForm() {
        let projects = currentDataModule.getProjects();
        let todoForm = currentDomModule.displayNewTodoForm(projects);
        if (todoForm) {
            todoForm.addEventListener('submit', newTodoSubmit);
        }
    }


    function todoEditForm(id) {
        let todos = currentDataModule.getTodos();
        let projects = currentDataModule.getProjects();
        let todo = todos.find(element => element.id == id);
        let todoEditForm = currentDomModule.displayTodoEditForm(todo, projects);
        todoEditForm.addEventListener('submit', todoEditSubmit.bind(todoEditForm, id));
    }

    function newProjectSubmit() {
        validateNewProjectForm(this);

        if (checkIfProjectExists(this.title.value)) {
            currentDomModule.showProjectFormError('This project already exists!');
            event.preventDefault();
        } else {
            currentDomModule.showProjectFormError('');
            currentDataModule.storeNewProject(this.title.value)
        }

        invokeRefreshProjects();
    }

    function init() {
        currentDataModule.getFromStorage();
        currentDomModule.queryDomElements();
        invokeRefreshProjects();
        invokeRefreshTodos();
        currentDomModule.getNewTodoButton().addEventListener('click', newTodoForm);
        currentDomModule.getNewProjectForm().addEventListener('submit', newProjectSubmit);
        currentDomModule.getAllProjectsButton().addEventListener('click', invokeRefreshTodos);
    }

    return {
        init
    }
});

/* harmony default export */ const src_controllerModule = (controllerModule);
// CONCATENATED MODULE: ./src/index.js
;


const todoList = (function() {
    const currentControllerModule = src_controllerModule();
    currentControllerModule.init();
})();
})();

/******/ })()
;