const API_BASE = '/api/todos';

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
    setupFormSubmit();
});

function setupFormSubmit() {
    document.getElementById('todoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const isEditMode = e.target.dataset.editMode === 'true';
        
        const todo = {
            title: document.getElementById('title').value.trim(),
            description: document.getElementById('description').value.trim()
        };

        try {
            if (isEditMode) {
                await handleEditSubmit(e.target.dataset.editId, todo);
            } else {
                await handleCreateSubmit(todo);
            }
            e.target.reset();
            delete e.target.dataset.editId;
            e.target.dataset.editMode = 'false';
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

async function fetchTodos() {
    try {
        const response = await fetch(API_BASE);
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <div class="todo-content">
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
                ${todo.completed ? '<span>(Completed)</span>' : ''}
            </div>
            <div class="todo-actions">
                <button onclick="editTodo('${todo._id}')">Edit</button>
                <button class="delete" onclick="deleteTodo('${todo._id}')">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

window.deleteTodo = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchTodos();
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

window.editTodo = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/${id}`);
        const todo = await response.json();
        
        document.getElementById('title').value = todo.title;
        document.getElementById('description').value = todo.description;
        
        const form = document.getElementById('todoForm');
        form.dataset.editMode = 'true';
        form.dataset.editId = id;
    } catch (error) {
        console.error('Error:', error);
    }
};

async function handleCreateSubmit(todo) {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });

    if (response.ok) {
        fetchTodos();
    } else {
        const result = await response.json();
        const errorMessages = result.error.map(err => err.message).join('\n');
        alert(errorMessages);
    }
}

async function handleEditSubmit(id, todo) {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });

    if (response.ok) {
        fetchTodos();
    } else {
        const result = await response.json();
        const errorMessages = result.error.map(err => err.message).join('\n');
        alert(errorMessages);
    }
}
