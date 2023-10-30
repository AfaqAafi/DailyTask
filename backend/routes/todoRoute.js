const express = require("express");
const {
  getAllTodo,
  postCreateTodo,
  putUpdateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


/**
 * @route GET api/todo
 * @description get all todo
 * @access private
 */
router.get("/", protect, getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access private
 */
router.post("/", protect, postCreateTodo);


/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access private 
 */

router.put("/:id", protect, putUpdateTodo);


/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access private
 */

router.delete("/:id", protect, deleteTodo);


module.exports = router;