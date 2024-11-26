import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

import { Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const tasks = useSignal<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const startEditing = (task: Task) => setEditingTask(task);
  const cancelEditing = () => setEditingTask(null);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
    };
    tasks.value = [...tasks.value, newTask];
  };

  const deleteTask = (id: number) => {
    tasks.value = [...tasks.value.filter((t) => t.id !== id)];
  };

  const updateTask = (id: number, title: string, description: string) => {
    tasks.value = tasks.value.map((task) =>
      task.id === id ? { ...task, title, description } : task
    );
  };

  return (
    <main className="max-w-4xl mx-auto p-4 h-full overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <TaskForm
        onAddTask={addTask}
        onUpdateTask={updateTask}
        editingTask={editingTask}
        onCancelEditing={cancelEditing}
      />
      <TaskList
        tasks={tasks.value}
        onDeleteTask={deleteTask}
        onEditTask={startEditing}
      />
    </main>
  );
};

export default App;
