const addBtn = document.getElementById("add");

const taskListContainer = document.querySelector(".taskList");
const taskList = document.querySelector(".taskList ul");
const addInput = document.getElementById("input");
const clear = document.querySelector(".clear");


let todos = [];

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let givenValue = addInput.value.trim();
    if (!givenValue) return;
    todos.push(givenValue);
    
    localStorage.setItem('todos', JSON.stringify(todos));
    
    display();
    addInput.value='';
});

const display = (() => {
    taskList.innerHTML='';
    todos.forEach((todo, index) => {
        const list = document.createElement('li');
        list.innerHTML = list.innerHTML + `
           <span>${todo}</span>
           <input type="text" class="edit-input" style="display: none;">
           <div class="btns">
               <button class="btn edit-btn">Edit</button>
               <button class="btn delete-btn">Delete Task</button>
               <button class="btn save-btn" style="display: none;">Save</button>
            </div>
        `
        const deleteBtn = list.querySelector('.delete-btn');
        const editBtn = list.querySelector('.edit-btn');
        const span = list.querySelector('span');
        const input = list.querySelector('.edit-input');
        const save = list.querySelector('.save-btn')

        deleteBtn.addEventListener('click', () => { 
            deleteItem(index) 
        });
        editBtn.addEventListener('click', () => {
            span.style.display = 'none';
            input.style.display = 'inline-block';
            input.value = todo;
            input.focus();
            save.style.display = 'inline-block';
            editBtn.style.display = 'none';
        });
        save.addEventListener('click', () => {
            const newValue = input.value.trim();
            edit(index, newValue); 
        });
        taskList.append(list);
    });
    
    if(todos.length === 0){
        clear.style.display = 'none'
    } else {
        clear.style.display = 'block'
    }
});

const getFromTodo = (() => {
    const localTodo = JSON.parse(localStorage.getItem('todos'));
    if(!localTodo) return;

    todos = localTodo;
    display();
})
getFromTodo();

const deleteItem = ((todoIndex) => {
    todos.splice(todoIndex, 1);
    display();
    localStorage.setItem('todos', JSON.stringify(todos))
});

const edit = ((index, newValue) => {
    todos[index] = newValue;
    display();
    localStorage.setItem('todos', JSON.stringify(todos))
})

clear.addEventListener('click', () => {
    localStorage.clear();
    todos = [];
    display();
})
