var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addBtn');
var taskList = document.getElementById('taskList');
addBtn.addEventListener('click', addTask);
function addTask() {
    var taskText = taskInput.value.trim();
    if (!taskText)
        return;
    var task = { text: taskText };
    var li = document.createElement('li');
    var span = document.createElement('span');
    span.textContent = task.text;
    var editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    var delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    editBtn.onclick = function () { return editTask(li, span, editBtn); };
    delBtn.onclick = function () { return li.remove(); };
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
    taskInput.value = '';
}
function editTask(li, span, editBtn) {
    var input = document.createElement('input');
    input.value = span.textContent || '';
    li.replaceChild(input, span);
    editBtn.textContent = 'Save';
    editBtn.onclick = function () {
        span.textContent = input.value.trim() || span.textContent;
        li.replaceChild(span, input);
        editBtn.textContent = 'Edit';
        editBtn.onclick = function () { return editTask(li, span, editBtn); };
    };
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter')
            editBtn.click();
    });
    input.focus();
}
