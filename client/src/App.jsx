import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        console.error('Failed to fetch todos:', response.statusText);
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = { title, description };

    try {
      if (editMode) {
        const response = await fetch(`/api/todos/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        });
        if (!response.ok) {
          const result = await response.json();
          const errorMessages = result.error.map(err => err.message).join('\n');
          alert(errorMessages);
        }
      } else {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        });
        if (!response.ok) {
          const result = await response.json();
          const errorMessages = result.error.map(err => err.message).join('\n');
          alert(errorMessages);
        }
      }
      await fetchTodos();
      setTitle('');
      setDescription('');
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`);
      const todo = await response.json();
      setTitle(todo.title);
      setDescription(todo.description);
      setEditMode(true);
      setEditId(id);
    } catch (error) {
      console.error('Error fetching todo for edit:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-center">Todo List</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-5 rounded-lg shadow mb-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-700 text-gray-100"/>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-700 text-gray-100"/>
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
          {editMode ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>
      <ul className="list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="bg-gray-800 p-4 mb-3 rounded-lg shadow flex justify-between items-center">
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{todo.title}</h3>
              <p className="text-gray-400">{todo.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(todo._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-yellow-600">
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
