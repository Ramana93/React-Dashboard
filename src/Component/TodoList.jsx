import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function TodoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const updatedTodos = [...todos, { text: newTodo, completed: false }];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Todo List</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 bg-transparent border rounded-lg px-4 py-2"
        />
        <button 
          onClick={addTodo}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-2">
        {todos.map((todo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between bg-white/20 dark:bg-gray-700/20 p-3 rounded-lg"
          >
            <span className={todo.completed ? 'line-through opacity-50' : ''}>
              {todo.text}
            </span>
            <button 
              onClick={() => removeTodo(index)}
              className="text-red-500 hover:text-red-600"
            >
              <FaTrash />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}