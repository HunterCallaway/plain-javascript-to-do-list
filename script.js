//Key for local storage
const storageKey = "tutorial todos";

//Since local storage can only store strings,
// we must convert the strings to objects when we pull them out of local storage
//or return an empty array if nothing is currently in local storage.
const convertStringToObj = (str) => JSON.parse(str) || [];

//To pass data into local storage, we have to convert it from an object to a string.
//or pass an empty string if there is nothing to be converted.
const convertObjToString = (obj) => JSON.stringify(obj) || '';

//Return either an array of To-dos or an empty array.
const getTodos = () => convertStringToObj(localStorage.getItem(storageKey));

//localStorage.setItem() takes two arguments: the key and the item to be set.
//Use the spread operator to add the new to-do to the to-dos we already have.
const addTodo = (todo) => localStorage.setItem(storageKey, convertObjToString([...getTodos(), todo]));

//This function will essentially return the same array except the specified to-do will be deleted.
//In order to accomplish this task, we will use the filter method to return all of the items that pass our test.
//Note: the argument in the filter function begins with an underscore to differentiate it from the earlier argument.
const deleteTodo = (todo) => localStorage
	.setItem(storageKey, convertObjToString(getTodos().filter(_todo => _todo !== todo)));

//Build a to-do element and return it.
const buildTodoEl = (todo) => {
	//Create a list item element.
	const el = document.createElement('li');
	//Add a Bootstrap list-group-item class.
	el.classList.add('list-group-item');
	//Set the text inside of the list item equal to to-do.
	el.innerText = todo;
	//Return the list item.
	return el;
};

//The following function injects the list item into the unordered list.
//Grab the unordered list from the DOM and append the el element onto it.
const appendLiToDom = (el) => document.getElementById('todo-list-container').appendChild(el);

//This function clears the to-do list.
//Grab the unordered list from the DOM and set that piece of HTML to an empty string.
const clearTodoListDisplay = () => document.getElementById('todo-list-container').innerHTML = '';

//This function clears what the user enters in the input area.
//Grab the value attribute of the new-to-do-input id and set it equal to an empty string.
const clearInput = () => document.getElementById('new-todo-input').value = '';

//
const displayTodos = () => {
	clearInput();
	clearTodoListDisplay();
	//Pass in the current _todo as we iterate through the array and pass what that gives us to the DOM.
	getTodos().forEach(_todo => appendLiToDom(buildTodoEl(_todo)));
	initClickListeners();
};

//This function initializes all of the 'click' event listeners for the to-dos.
const initClickListeners = () => {
	//Take the list-group-item class, push it into a query list, and create an array from the query list.
	Array.from(document.getElementsByClassName('list-group-item')).forEach(item => {
		item.addEventListener('click', ($event) => {
			const todo = $event.target.innerText;
		});
	});
};