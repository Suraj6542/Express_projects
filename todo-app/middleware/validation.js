const { z } = require('zod');

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  completed: z.boolean().optional(),
});

const validateTodo = (req, res, next) => {
  try {
    req.body = todoSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};

module.exports = { validateTodo };
