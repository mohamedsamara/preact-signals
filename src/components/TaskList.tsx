import { Task } from "../types";

interface Props {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onEditTask: (task: Task) => void;
}

const TaskList = ({ tasks, onDeleteTask, onEditTask }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-slate-700">No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center mb-2 p-3 border rounded"
            >
              <div className="space-y-1">
                <h3>{task.title}</h3>
                <p className="text-slate-700">{task.description}</p>
              </div>
              <div>
                <button
                  onClick={() => onEditTask(task)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
