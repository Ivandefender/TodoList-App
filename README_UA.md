<h1 align="center">Todo List App</h1>

<div align="center">
    <a href="https://ivandefender.github.io/QuizApp/">View Project |</a>
    <a href="https://github.com/Ivandefender/QuizApp/tree/main/js">View Code</a>
</div>

<p align="center">
<img src="https://img.shields.io/badge/HTML-orange?style=for-the-badge&logo=html&logoColor=orange">
<img src="https://img.shields.io/badge/css-blue?style=for-the-badge&logo=css&logoColor=blue">
<img src="https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=JavaScript&logoColor=yellow&labelColor=black">
</p>

### **Застосунок, який дає можливість занотовувати свої справи на цілий день.**

## Можливості проекту:

1. Додавати свої денні справи
2. Видаляти денні справи
3. Сортувати свої справи
4. Змінювати колірну тему
5. Адаптивний дизайн

## Структура застосунку:

### HTML:

`Index.html` - головна сторінка

### CSS:

`Style.css` - файл стилів, який примінюється для всіх сторінок. В ньому і є адаптивний дизайн

### JavaScript:

`Script.js` - файл, в якому є функціонал редагування своїх справ, та їх перетягування, за яке відповідає функція `updateDraggablesItems`

Функція перетягування та отримання елемента над, яким пересувається блок із вашою справою

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

### Дизайн був взятий з [FrontendMentor.io](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW);

### Розробив: [Ivan Krysak (github: Ivandefender)](https://github.com/Ivandefender);
