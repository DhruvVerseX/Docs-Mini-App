import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MdAdd, MdClose } from "react-icons/md";

function Navbar({ onAddTodo }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    folder: "Work",
    priority: "medium"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title.trim()) {
      onAddTodo({
        ...newTodo,
        id: Date.now(),
        completed: false
      });
      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
        folder: "Work",
        priority: "medium"
      });
      setIsFormOpen(false);
    }
  };

  const priorityColors = {
    high: "red",
    medium: "yellow",
    low: "green"
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/50 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass px-8 py-4 hover-glow transition-all"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text tracking-wider">
              Todo App
            </h1>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="glass px-6 py-2 hover-glow transition-all text-purple-400 font-medium flex items-center gap-2"
          >
            {isFormOpen ? (
              <>
                <MdClose className="h-5 w-5" />
                Close Form
              </>
            ) : (
              <>
                <MdAdd className="h-5 w-5" />
                Add New Todo
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {isFormOpen && (
              <motion.form
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="glass p-6 w-full max-w-md flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-purple-400 font-medium">Title</label>
                  <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="bg-zinc-900/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-purple-400 font-medium">Description</label>
                  <textarea
                    placeholder="Add details..."
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="bg-zinc-900/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-purple-400 font-medium">Due Date</label>
                    <input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                      className="bg-zinc-900/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-purple-400 font-medium">Priority</label>
                    <select
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                      className="bg-zinc-900/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-purple-400 font-medium">Folder</label>
                  <select
                    value={newTodo.folder}
                    onChange={(e) => setNewTodo({ ...newTodo, folder: e.target.value })}
                    className="bg-zinc-900/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="glass px-6 py-3 hover-glow transition-all text-purple-400 font-medium mt-2"
                >
                  Add Todo
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;