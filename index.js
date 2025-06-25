const formElement = document.querySelector(".form");

const InputElement = document.querySelector(".input");

const ulElement = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
console.log(list);

if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = InputElement.value;
  if (task) {
    newTask = task.name;
  }

  const listItemElement = document.createElement("li");

  if (task && task.checked) {
    listItemElement.classList.add("checked");
  }

  listItemElement.innerText = newTask;

  ulElement.appendChild(listItemElement);
  InputElement.value = "";

  const checkButtonElement = document.createElement("div");
  checkButtonElement.innerHTML = `
  <i class="fas fa-square-check"></i>

  `;
  listItemElement.appendChild(checkButtonElement);

  const deleteButtonElement = document.createElement("div");
  deleteButtonElement.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
  listItemElement.appendChild(deleteButtonElement);

  checkButtonElement.addEventListener("click", () => {
    listItemElement.classList.toggle("checked");
    updateLocalStorage();
  });

  deleteButtonElement.addEventListener("click", () => {
    listItemElement.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
}

function updateLocalStorage() {
  const listItemElements = document.querySelectorAll("li");
  list = [];
  listItemElements.forEach((liElement) => {
    list.push({
      name: liElement.innerText,
      checked: liElement.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
