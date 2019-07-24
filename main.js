const inputElement = document.getElementsByClassName('input-task')[0];
const addTaskButton = document.getElementsByClassName('add-task-btn')[0];
const listContainer = document.getElementsByClassName('list-container')[0];
const footerContainer = document.getElementsByClassName('footer')[0];

const mockArr = [];

// function init(htmlMock) {
//   listContainer.innerHTML
// }

function addTask() {
  const text = inputElement.value;
  if (!text) return;
  const listId = +new Date().getTime();

  mockArr.push({
    listId,
    text
  });

  renderTask(listId);
  inputElement.value = '';
}

function renderTask(listId) {
  const { text } = mockArr.find(el => el.listId === listId);
  const html = `
    <p class="list-checkbox">+</p>
    <p class="list-element-text">${text}</p>
    <p class="list-delete-btn">delete</p>
  `;

  const listDivElement = document.createElement('div');
  listDivElement.innerHTML = html;
  listDivElement.classList.add('list-element');

  listContainer.appendChild(listDivElement);

  // renderTasksInfo();

  const checkBox = listDivElement.getElementsByClassName('list-checkbox')[0];
  const taskTextElement = listDivElement.getElementsByClassName('list-element-text')[0];
  const deleteBtn = listDivElement.getElementsByClassName('list-delete-btn')[0];

  checkBox.addEventListener('click', () => clickOnCheckBox(listId, checkBox));
  taskTextElement.addEventListener('click', () => editTask(listId, taskTextElement));
  deleteBtn.addEventListener('click', () => clickToDeleteBtn(listId, listDivElement));
}

function renderTasksInfo() {
  const taskCount = listContainer.getElementsByClassName('list-element');

  const html = `
    <p>all: ${taskCount.length}</p>
    <p>done:3</p>
    <p>delete done tasks</p>
  `;
}

function clickOnCheckBox(listId, checkBox) {
  const listElement = mockArr.find(el => el.listId === listId);
  listElement.done = true;
  checkBox.style.backgroundColor = 'red';
}

function clickToDeleteBtn(listId, listDivElement) {
  mockArr.splice(listId, 1);
  listDivElement.remove();
}

function editTask(listId, taskTextElement) {
  let text = taskTextElement.innerText;
  taskTextElement.outerHTML  = `
    <input type="text" placeholder="edit text" class="input-task-edit" value="${text}">
  `;
}

addTaskButton.addEventListener('click', addTask);
