import React, { useState, useRef } from "react";
import Card from "./Card";
import { motion, AnimatePresence } from "motion/react";
import { MdAdd, MdViewModule, MdViewList } from "react-icons/md";

function Foreground({ todos, onDeleteTodo, onUpdateTodo }) {
  const ref = useRef(null);
  const [activeFolder, setActiveFolder] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "stack"
  const [stackedCards, setStackedCards] = useState([]);

  const folders = ["All", "Work", "Personal", "Shopping", "Health"];

  const filteredTodos = todos.filter(todo => {
    if (!showCompleted && todo.completed) return false;
    if (activeFolder !== "All" && todo.folder !== activeFolder) return false;
    return true;
  });

  const handleAddFolder = (e) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      folders.push(newFolderName.trim());
      setNewFolderName("");
      setIsAddingFolder(false);
    }
  };

  const handleToggleComplete = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      onUpdateTodo({ ...todo, completed: !todo.completed });
    }
  };

  const handleStackCard = (cardId) => {
    if (!stackedCards.includes(cardId)) {
      setStackedCards([...stackedCards, cardId]);
    }
  };

  const handleUnstackCard = (cardId) => {
    setStackedCards(stackedCards.filter(id => id !== cardId));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Controls Section */}
      <div className="mb-8 space-y-4">
        {/* View Mode Toggle */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("grid")}
            className={`glass px-4 py-2 hover-glow transition-all ${
              viewMode === "grid" ? "ring-2 ring-purple-500" : ""
            }`}
          >
            <MdViewModule className="h-6 w-6 text-purple-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("stack")}
            className={`glass px-4 py-2 hover-glow transition-all ${
              viewMode === "stack" ? "ring-2 ring-purple-500" : ""
            }`}
          >
            <MdViewList className="h-6 w-6 text-purple-400" />
          </motion.button>
        </div>

        {/* Folder Navigation */}
        <div className="flex flex-wrap gap-3 justify-center">
          {folders.map(folder => (
            <motion.button
              key={folder}
              className={`folder glass px-6 py-3 hover-glow transition-all cursor-pointer ${
                activeFolder === folder ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setActiveFolder(folder)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                {folder}
              </h2>
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingFolder(true)}
            className="glass p-3 hover-glow transition-all cursor-pointer"
          >
            <MdAdd className="h-6 w-6 text-purple-400" />
          </motion.button>
        </div>

        {/* Add Folder Form */}
        <AnimatePresence>
          {isAddingFolder && (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleAddFolder}
              className="glass p-4 w-64 mx-auto flex gap-2"
            >
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="New Folder Name"
                className="bg-zinc-900/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1"
              />
              <button
                type="submit"
                className="glass px-4 py-2 hover-glow transition-all text-purple-400 font-medium"
              >
                Add
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Filter Toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="glass px-6 py-2 hover-glow transition-all text-purple-400 font-medium"
          >
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[60vh]">
        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="hover-float transition-all"
                >
                  <Card
                    data={todo}
                    reference={ref}
                    onDelete={onDeleteTodo}
                    onToggleComplete={handleToggleComplete}
                    onStack={handleStackCard}
                    onUnstack={handleUnstackCard}
                    isStacked={stackedCards.includes(todo.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          // Stack View
          <div className="relative h-[60vh] flex justify-center items-center">
            <div className="absolute inset-0 glass rounded-2xl overflow-hidden">
              <div className="p-8 h-full flex flex-col">
                <h3 className="text-xl text-purple-400 font-medium mb-4">
                  Stacked Cards
                </h3>
                <div className="flex-1 relative">
                  <AnimatePresence>
                    {stackedCards.map((cardId, index) => {
                      const todo = todos.find(t => t.id === cardId);
                      if (!todo) return null;
                      
                      return (
                        <motion.div
                          key={cardId}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            x: index * 20,
                            rotate: index * 5,
                            zIndex: stackedCards.length - index
                          }}
                          exit={{ opacity: 0, y: -50 }}
                          className="absolute top-0 left-0 w-full"
                          style={{
                            transformOrigin: "center center"
                          }}
                        >
                          <Card
                            data={todo}
                            reference={ref}
                            onDelete={onDeleteTodo}
                            onToggleComplete={handleToggleComplete}
                            onStack={handleStackCard}
                            onUnstack={handleUnstackCard}
                            isStacked={true}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTodos.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-purple-400 font-medium">
              No todos found in this folder
            </h3>
            <p className="text-zinc-400 mt-2">
              {activeFolder === "All" 
                ? "Add a new todo to get started"
                : `No todos in the ${activeFolder} folder`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Foreground;