<h1 align="center">Todo List App</h1>

<div align="center">
 <a href="">View Project |</a>
 <a href="">View Code</a>
</div>

<p align="center">
<img src="https://img.shields.io/badge/HTML-orange?style=for-the-badge&logo=html&logoColor=orange">
<img src="https://img.shields.io/badge/css-blue?style=for-the-badge&logo=css&logoColor=blue">
<img src="https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=JavaScript&logoColor=yellow&labelColor=black">
</p>

### **An application that allows you to note down your activities for the whole day.**

## Project possibilities:

1. Add your daily tasks
2. Delete daily tasks
3. Sort your affairs
4. Change the color theme
5. Adaptive design

## Structure of the application:

### HTML:

`Index.html` is the main page

### CSS:

`Style.css` is a style file that applies to all pages. It has an adaptive design

### JavaScript:

`Script.js` - a file that contains the functionality of editing your items and dragging them, for which the `updateDraggablesItems` function is responsible

A drag-and-drop function to get the element over which the block with your case moves

```javascript

let draggedItem = null;

function updateDraggablesItems() {
 allItems = document.querySelectorAll(".item");

 allItems.forEach((item) => {
 item.addEventListener("dragstart", (e) => {
 draggedItem = item;
 item.classList.add("hold");
 });
 item.addEventListener("dragend", (e) => {
 draggedItem = null;
 item.classList.remove("hold");
 });
 item.addEventListener("dragover", (e) => {
 e.preventDefault();
 const afterElem = getAfterElement(e.clientY);

 if (afterElem === null) {
 todoItemsInner.appendChild(draggedItem);
 } else {
 todoItemsInner.insertBefore(draggedItem, afterElem);
 }
 });
 });
}

function getAfterElement(positionY) {
 const notDraggableElements = [
 ...document.querySelectorAll(".item:not(.hold)"),
 ];
 return notDraggableElements.reduce(
 (closestElem, childElem) => {
 const box = childElem.getBoundingClientRect();
 const positionCursor = positionY - box.top - box.height / 2;
 if (positionCursor < 0 && positionCursor > closestElem.offset) {
 return { offset: positionCursor, element: childElem };
 } else {
 return closestElem;
 }
 },
 { offset: Number.NEGATIVE_INFINITY }
 ).element;
}

```

### The design was taken from [FrontendMentor.io](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW);

### Developed by: [Ivan Krysak (github: Ivandefender)](https://github.com/Ivandefender);