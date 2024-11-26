import { useEffect, useState } from "preact/hooks";

import { Task } from "../types";

interface Props {
  onAddTask: (title: string, description: string) => void;
  onUpdateTask: (id: number, title: string, description: string) => void;
  editingTask: Task | null;
  onCancelEditing: () => void;
}

const TaskForm = ({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEditing,
}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
    }
  }, [editingTask]);

  const handleOnCancelEditing = () => {
    onCancelEditing();
    resetForm();
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (editingTask) {
      onUpdateTask(editingTask.id, title, description);
      onCancelEditing();
    } else {
      onAddTask(title, description);
    }
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-6 space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-6 space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="flex justify-end">
        {editingTask ? (
          <>
            <button
              type="button"
              onClick={handleOnCancelEditing}
              className="mr-2 bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
