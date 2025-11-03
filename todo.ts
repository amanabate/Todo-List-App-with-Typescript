interface TodoItem {
  text: string;
}

const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

addBtn.addEventListener('click', addTask);

function addTask(): void {
  const taskText: string = taskInput.value.trim();
  if (!taskText) return;

  const task: TodoItem = { text: taskText };

  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = task.text;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';

  editBtn.onclick = () => editTask(li, span, editBtn);
  delBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  taskList.appendChild(li);
  taskInput.value = '';
}

function editTask(li: HTMLLIElement, span: HTMLSpanElement, editBtn: HTMLButtonElement): void {
  const input = document.createElement('input');
  input.value = span.textContent || '';

  li.replaceChild(input, span);
  editBtn.textContent = 'Save';

  editBtn.onclick = () => {
    span.textContent = input.value.trim() || span.textContent;
    li.replaceChild(span, input);
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(li, span, editBtn);
  };

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') editBtn.click();
  });

  input.focus();
}
