import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const TodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, [todos]);

  const handleEdit = async (id) => {
    setEditingId(id);
    const selectedTodo = await todos.find((todo) => todo._id === id);
    console.log(selectedTodo);
    if (selectedTodo) {
      setEditedTitle(selectedTodo.title);
      setEditedDescription(selectedTodo.description);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`api/todo/${editingId}`, {
        title: editedTitle,
        description: editedDescription,
      });
      toast.success("Todo Updated Successfully");
      
      console.log(response.data);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating todo", error);
      toast.error("Error updating todo");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("api/todo/");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`api/todo/${id}`);
      toast.success("Todo has been deleted!");
      console.log(response.data); // Log the response data
      fetchData();
    } catch (error) {
      console.error("Error deleting todo", error);
      toast.error("Error deleting todo");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {todos.map((todo) => (
        <div key={todo._id} className="bg-white rounded-lg p-6 mb-4 shadow-md">
          {editingId === todo._id ? (
            <div className="my-2">
              <input
                type="text"
                className="w-full mb-3 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full my-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {todo.title}
              </h2>
              <p className="text-gray-600 mb-4">{todo.description}</p>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Click To ADD or DELETE >
                </button>
                <FaEdit
                  onClick={() => handleEdit(todo._id)}
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                />
                <FaTrash
                  onClick={() => handleDelete(todo._id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoComponent;
