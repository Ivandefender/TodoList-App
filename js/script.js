const themeStart = document.documentElement.setAttribute("data-theme", "light");
const themeBtn = document.querySelector(".todo__theme");
themeBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});

const itemsLeft = document.querySelector(".todo__count");
let todoItemsLength = document.querySelectorAll(".item").length;
updateTodosCount();

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const filterBtns = [allBtn, activeBtn, completedBtn];
filterBtns.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    btn.classList.add("btn__active");
    const todoItems = document.querySelectorAll(".item");
    todoItems.forEach((item) => {
      const checkbox = item.querySelector(".item__checkbox");
      switch (i) {
        case 0:
          activeBtn.classList.remove("btn__active");
          completedBtn.classList.remove("btn__active");
          item.style.display = "flex";
          break;
        case 1:
          allBtn.classList.remove("btn__active");
          completedBtn.classList.remove("btn__active");
          item.style.display = !checkbox.checked ? "flex" : "none";
          break;
        case 2:
          allBtn.classList.remove("btn__active");
          activeBtn.classList.remove("btn__active");
          item.style.display = !checkbox.checked ? "none" : "flex";
          break;
      }
    });
  });
});

let allItems = document.querySelectorAll(".item");
const todoItemsInner = document.querySelector(".todo__items");
const inputValue = document.querySelector(".todo__input");
const btnsCloseTodo = document.querySelectorAll(".close__todo");
inputValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    filterBtns.forEach((btn) => {
      btn.disabled = false;
    });
    const newTodo = document.createElement("li");
    newTodo.classList.add("item");
    newTodo.setAttribute("draggable", "true");
    newTodo.innerHTML = `
        <input class="item__checkbox" type="checkbox" name="itemInput" id="itemInput${
          todoItemsLength + 1
        }">
        <label class="item__text" for="itemInput${todoItemsLength + 1}">
              <button class="checkItem"></button>
              <span class="todoText">${inputValue.value}</span>
        </label>
        <button class="close__todo"></button>
        `;
    if (inputValue.value === "") {
      alert("Todo is empty");
    } else {
      todoItemsInner.insertBefore(newTodo, null);
      inputValue.value = "";
      todoItemsLength++;
      allItems = document.querySelectorAll(".item");
      updateDraggablesItems();
      updateTodosCount();
    }
  }
});

todoItemsInner.addEventListener("click", (e) => {
  if (e.target.classList.contains("close__todo")) {
    const parentItem = e.target.closest(".item");
    parentItem.remove();
    todoItemsLength--;
    updateTodosCount();
  }
  e.target.checked;

  if (todoItemsLength === 0) {
    filterBtns.forEach((btn) => {
      btn.disabled = true;
    });
  }
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  const todoItems = document.querySelectorAll(".item");
  todoItems.forEach((item) => {
    const checkbox = item.querySelector(".item__checkbox");
    if (checkbox.checked) {
      item.remove();
      todoItemsLength--;
    }
  });
  updateTodosCount();
});

function updateTodosCount() {
  itemsLeft.textContent = `${todoItemsLength} items left`;
}

// Перетягування

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
updateDraggablesItems();

// Sortable.create(sortList);//todoItemsInner
