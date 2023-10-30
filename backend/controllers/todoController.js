const Todo = require("../models/todosModel");

// Getting All todo
exports.getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(400).json({ message: `Todo not found: ${err.message}` });
  }
};

// Create Todo
exports.postCreateTodo = async (req, res) => {
  try {
    const createdTodo = await Todo.create(req.body);
    res.json({ message: "Todo added successfully", data: createdTodo });
  } catch (err) {
    res.status(400).json({ message: "Failed to add todo", error: err.message });
  }
};

// Update todo
exports.putUpdateTodo = async (req, res) => {
  try {
    if (!req.body.description) {
      return res
        .status(400)
        .json({ message: "Description is required for updating the todo" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Updated successfully", data: updatedTodo });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update todo", error: err.message });
  }
};


// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "Todo ID is required for deletion" });
    }

    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to delete todo", error: err.message });
  }
};
