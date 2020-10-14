/**
1. a <p> with red text that says “Hey I’m red!”
2. an <h3> with blue text that says “I’m a blue h3!”
3. a <div> with a black border and pink background color with the following elements inside of it:
another <h1> that says “I’m in a div”
a <p> that says “ME TOO!”
Hint for this one: after creating the div with createElement, append the <h1> and <p> to it before adding it to the container.
 */

const container = document.querySelector('#container');
const paragraph = document.createElement('p');
const header = document.createElement('h3');
const div = document.createElement('div');


paragraph.style.color = 'red';
paragraph.textContent = 'Hey I’m red!';
container.appendChild(paragraph);

header.style.color = 'blue';
header.textContent = 'I’m a blue h3!';
container.appendChild(header);

div.style.backgroundColor = 'pink';
div.style.border = '1px solid black';

const childHeader = document.createElement('h1');
const childParagraph = document.createElement('p');

childHeader.textContent = 'I’m in a div”';
childParagraph.textContent = 'ME TOO!';
div.appendChild(childHeader);
div.appendChild(childParagraph);

container.appendChild(div);