import { useState } from "react";
import TodoComponent from "./TodoComponent";
import axios from "axios";
import { toast } from "react-toastify";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    try {
      const response = await axios.post("api/todo/", {
        title,
        description,
      });
      toast.success("Todo Created!");
      console.log(response.data); // Log the response data
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error("Error adding todo!");
      console.error("Error adding todo", error);
    }
  };

  return (
    <>
      <h1 className="text-center my-4 text-gray-700 font-bold">Todo List</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl shadow-xl p-7 rounded mt-12 mb-12 w-full mx-auto"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="text-gray-700 text-sm font-bold mb-2 block"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="text-gray-700 text-sm font-bold mb-2 block"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            placeholder="Enter description"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Todo
        </button>
      </form>
      <TodoComponent />
    </>
  );
};

export default TodoForm;
