'use client';
import React, { useState, useEffect, useRef, use } from 'react';
import Modal from 'react-modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z, { set, ZodType } from 'zod';

import Select from 'react-select';
import { getTags } from '@/actions';
import { getToken } from '@/utils/authHelpers';
import { ITag } from '@/interfaces';
import { createTask } from '@/actions/task/createTask';
import { TaskStatus } from '@/utils/enums';

// Modal setup
Modal.setAppElement('#root');

// Define the form inputs for the task creation
type TaskFormInputs = {
  title: string;
  description?: string;
  dueDate?: Date;
  status: TaskStatus;
  tags?: string[];
};

const taskSchema: ZodType<TaskFormInputs> = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  status: z.nativeEnum(TaskStatus),
  tags: z.string().array().optional(),
}).refine(({ dueDate }) => {
  if (!dueDate) return true;
  return dueDate.toLocaleDateString() >= new Date().toLocaleDateString();;
}, {
  message: "Due date cannot be in the past",
  path: ['dueDate']
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: TaskFormInputs) => void;
  projectId: string;
}

export const TaskModal = ({ isOpen, onClose, onCreateTask, projectId }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [availableTags, setAvailableTags] = useState<ITag[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, setValue, reset, trigger } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema)
  });

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    setErrorMessage('');
    const token = getToken() || "";
    console.log(data)
    // Server action
    const resp = await createTask({ ...data, projectId }, token);
    if (!resp) {
      setErrorMessage(resp.message);
      return;
    };
    onCreateTask(resp);
    reset();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const setTags = async () => {
      // Fetch tags from the server
      const tags = await getTags(getToken() || "");
      setAvailableTags(tags);
    }
    setTags();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Create Task Modal"
    >
      <div ref={modalRef} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Task Title */}
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Task Title</label>
            <input
              type="text"
              id="task-title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              {...register('title')}
            />
            {errors.title && <span className="text-indigo-800 text-sm">{errors.title.message}</span>}
          </div>

          {/* Task Description */}
          <div>
            <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              id="task-description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('description')}
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Due Date</label>
            <input
              type="date"
              id="task-due-date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('dueDate', {
                setValueAs: (value) => {
                  if (value)
                    return new Date(value.split('-'))
                },
              })}
            />
            {errors.dueDate && <span className="text-indigo-800 text-sm">{errors.dueDate.message}</span>}
          </div>

          {/* Multi-select for Tags */}
          <div>
            <label htmlFor="task-tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Tags</label>
            <Select
              isMulti
              className='mt-1 text-black'
              inputId='task-tags'
              options={availableTags.map(tag => ({ label: tag.name, value: tag.id }))}
              onChange={(selected) => setValue('tags', selected.map(s => s.value))}
            />
          </div>

          {/* Status of the task */}
          <div>
            <label htmlFor="task-status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
            <Select
              className='mt-1 text-black'
              inputId='task-status'
              options={Object.values(TaskStatus).map(status => ({ label: status, value: status }))}
              onChange={(selected) => {
                setValue('status', selected!.value);
                trigger('status');
              }}
            />
            {errors.status && <span className="text-indigo-800 text-sm">{errors.status.message}</span>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white text-indigo-900 rounded-md border border-indigo-700">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Create Task
            </button>
          </div>
          {errorMessage && <span className="text-indigo-800 text-sm">{errorMessage}</span>}
        </form>
      </div>
    </Modal>
  );
};
