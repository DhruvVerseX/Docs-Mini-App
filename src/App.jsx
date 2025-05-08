import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Foreground from "./components/Foreground";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Complete Project",
      description: "Finish the React project with all features",
      completed: false,
      folder: "Work",
      dueDate: "2024-03-20"
    },
    {
      id: 2,
      title: "Buy Groceries",
      description: "Get milk, eggs, and bread",
      completed: true,
      folder: "Shopping",
      dueDate: "2024-03-18"
    }
  ]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-zinc-900 via-purple-900 to-zinc-900 overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse" />
      <div className="absolute inset-0 backdrop-blur-[100px] bg-black/20" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onAddTodo={handleAddTodo} />
        <main className="flex-1 pt-32 pb-10 px-4">
          <Foreground 
            todos={todos} 
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
