const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const { validateTodo } = require('../middleware/validation');

// Routes for CRUD operations
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', validateTodo, createTodo);
router.put('/:id', validateTodo, updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
