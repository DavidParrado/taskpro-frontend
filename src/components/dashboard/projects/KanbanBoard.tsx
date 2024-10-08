'use client';
import { useDrag, useDrop } from 'react-dnd';
import { ITask } from '@/interfaces/task';
import { TaskStatus } from '@/utils/enums';
import { useState } from 'react';
import { TaskFormInputs, TaskModal } from './TaskModal';

const ITEM_TYPE = 'TASK';

interface Props {
  tasks: ITask[];
  moveTask: (taskId: string, status: TaskStatus) => void;
  handleUpdateTask: (taskId: string, task: TaskFormInputs) => Promise<void>;
  handleDeleteTask?: (taskId: string) => Promise<void>;
}

export const KanbanBoard = ({ tasks, moveTask, handleUpdateTask, handleDeleteTask }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">

      {/* To Do Column */}
      <KanbanColumn
        status={TaskStatus.TODO}
        tasks={tasks.filter((task) => task.status === TaskStatus.TODO)}
        moveTask={moveTask}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />

      {/* In Progress Column */}
      <KanbanColumn
        status={TaskStatus.IN_PROGRESS}
        tasks={tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS)}
        moveTask={moveTask}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />

      {/* Completed Column */}
      <KanbanColumn
        status={TaskStatus.COMPLETED}
        tasks={tasks.filter((task) => task.status === TaskStatus.COMPLETED)}
        moveTask={moveTask}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />

    </div>
  );
};

interface ColumnProps {
  status: TaskStatus;
  tasks: ITask[];
  moveTask: (taskId: string, status: TaskStatus) => void;
  handleUpdateTask: (taskId: string, task: TaskFormInputs) => Promise<void>;
  handleDeleteTask?: (taskId: string) => Promise<void>;
}

const KanbanColumn = ({ status, tasks, moveTask, handleUpdateTask, handleDeleteTask }: ColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { id: string }) => {
      moveTask(item.id, status); // Move task to this column
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop as any} className={`p-4 rounded-lg min-h-[300px] ${isOver ? 'bg-indigo-100' : 'bg-gray-200 dark:bg-gray-600'}`}>
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      {tasks.map((task) => (
        <KanbanTask key={task.id} task={task} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} />
      ))}
    </div>
  );
};

interface TaskProps {
  task: ITask;
  handleUpdateTask: (taskId: string, task: TaskFormInputs) => Promise<void>;
  handleDeleteTask?: (taskId: string) => Promise<void>;
}

const KanbanTask = ({ task, handleUpdateTask, handleDeleteTask }: TaskProps) => {
  const [isTaskModalOpen, setisTaskModalOpen] = useState(false);

  const openTaskModal = () => setisTaskModalOpen(true);
  const closeTaskModal = () => setisTaskModalOpen(false);

  const handleSubmitTask = async (taskFormData: TaskFormInputs) => {
    // Update task in the server
    await handleUpdateTask(task.id, taskFormData);
    closeTaskModal();
  }

  // Delete task
  const deleteTask = async () => {
    // Delete task in the server
    if (handleDeleteTask === undefined && task || handleDeleteTask === undefined)
      return;
    await handleDeleteTask(task.id);
    closeTaskModal();
  }

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <div
        ref={drag as any}
        className={`p-2 mb-2 rounded shadow bg-white dark:text-black cursor-pointer hover:bg-opacity-80 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        onClick={openTaskModal}
      >
        {task.title}
      </div>
      {/* Task Modal */}
      {isTaskModalOpen && <TaskModal handleSubmitTask={handleSubmitTask} isOpen={isTaskModalOpen} onClose={closeTaskModal} task={task} handleDeleteTask={deleteTask} />}
    </>
  );
};
