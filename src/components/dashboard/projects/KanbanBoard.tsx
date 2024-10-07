import { ITask } from "@/interfaces/task";
import { TaskStatus } from "@/utils/enums";

interface Props {
  tasks: ITask[];
}

// todo: Missing dark theme
export const KanbanBoard = ({ tasks }: Props) => {
  console.log(tasks);
  console.log(tasks.filter(task => task.status === TaskStatus.TODO));
  console.log(tasks.filter(task => task.status === TaskStatus.IN_PROGRESS));
  console.log(tasks.filter(task => task.status === TaskStatus.COMPLETED));
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* To Do Column */}
      <div>
        <h2 className="text-xl font-bold mb-4">To Do</h2>
        <div className="bg-gray-200 p-4 rounded-lg min-h-[300px]">
          {tasks.filter(task => task.status === TaskStatus.TODO).map(task => (
            <div key={task.id} className="bg-white p-2 mb-2 rounded shadow">
              {task.title}
            </div>
          ))}
        </div>
      </div>

      {/* In Progress Column */}
      <div>
        <h2 className="text-xl font-bold mb-4">In Progress</h2>
        <div className="bg-gray-200 p-4 rounded-lg min-h-[300px]">
          {tasks.filter(task => task.status === TaskStatus.IN_PROGRESS).map(task => (
            <div key={task.id} className="bg-white p-2 mb-2 rounded shadow">
              {task.title}
            </div>
          ))}
        </div>
      </div>

      {/* Completed Column */}
      <div>
        <h2 className="text-xl font-bold mb-4">Completed</h2>
        <div className="bg-gray-200 p-4 rounded-lg min-h-[300px]">
          {tasks.filter(task => task.status === TaskStatus.COMPLETED).map(task => (
            <div key={task.id} className="bg-white p-2 mb-2 rounded shadow">
              {task.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}