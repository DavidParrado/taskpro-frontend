'use client';
import React, { useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z, { ZodType } from 'zod';

import Modal from 'react-modal';

import { ProjectStatus } from '@/utils/enums';
import { ProjectModalSkeleton } from './skeletons/ProjectModalSkeleton';
import { IProject } from '@/interfaces';

Modal.setAppElement('#root'); // To bind modal to the Next.js app

// Define the form inputs for the project creation
export type ProjectFormInputs = {
  name: string;
  status: ProjectStatus;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}
const schemaValidator: ZodType<ProjectFormInputs> = z.object({
  name: z.string().min(1, "Project name is required"),
  status: z.nativeEnum(ProjectStatus),
  description: z.string().optional(),
  // Add custom validations for the dates, like the start date should be before the end date
  startDate: z.date().optional(),
  endDate: z.date().optional(),
}).refine(({ startDate, endDate }) => {
  if (!startDate || !endDate) return true;
  return endDate >= startDate;
}, {
  message: "End date should be after start date",
  path: ['endDate']
})


interface Props {
  isOpen: boolean;
  project?: IProject;
  handleProjectSubmit: (project: ProjectFormInputs) => Promise<void>;
  onClose: () => void;
}

export const ProjectModal = ({ isOpen, onClose, handleProjectSubmit, project }: Props) => {
  let modalRef = React.useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormInputs>({
    resolver: zodResolver(schemaValidator), defaultValues: {
      name: project?.name || "",
      status: project?.status,
      description: project?.description || "",
      startDate: project?.startDate ? new Date(project?.startDate).toLocaleDateString("af-ZA") as any : undefined,
      endDate: project?.endDate ? new Date(project?.endDate).toLocaleDateString("af-ZA") as any : undefined
    }
  });

  const onSubmit: SubmitHandler<ProjectFormInputs> = async (data) => {
    setErrorMessage('');
    console.log(data)
    try {
      await handleProjectSubmit(data);
    } catch (error) {
      console.log(error);
      setErrorMessage("No se pudo actualizar/crear el proyecto");
    }
    reset();
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? <ProjectModalSkeleton /> : (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Create Project Modal"
    >
      <div ref={modalRef} className="bg-white dark:bg-trueGray-900 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">{project ? 'Edit project' : 'Create New Project'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Project Name</label>
            <input
              type="text"
              id="project-name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              {...register('name')}
            />
            {
              errors.name?.message && (
                <span className="text-indigo-900 dark:text-white text-sm">{errors.name.message}</span>
              )
            }
          </div>
          <div>
            <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              id="project-description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('description')}
            ></textarea>
          </div>
          {/* Select for project status */}
          <div>
            <label htmlFor="project-status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
            <select
              id="project-status"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              {...register('status')}
            >
              {/* Use the enum values for the options */}
              <option value="">Select Status</option>
              {Object.values(ProjectStatus).map((status) => (
                // capitalize the first letter of the status
                <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
            {
              errors.status?.message && (
                <span className="text-indigo-900 dark:text-white text-sm">{errors.status.message}</span>
              )
            }
          </div>

          {/* Date picker for startDate and endDate of the project */}
          <div>
            <label htmlFor="project-start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Start Date</label>
            <input
              type="date"
              id="project-start-date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('startDate', {
                setValueAs: (value) => {
                  if (value)
                    return new Date(value.split('-'))
                },
              })}
            />
            {errors.startDate?.message && (<span className="text-indigo-900 dark:text-white text-sm">{errors.startDate.message}</span>)}
          </div>
          <div>
            <label htmlFor="project-end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-200">End Date</label>
            <input
              type="date"
              id="project-end-date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('endDate', {
                setValueAs: (value) => {
                  if (value)
                    return new Date(value.split('-'))
                },
              })}
            />
            {errors.endDate?.message && (<span className="text-indigo-900 dark:text-white text-sm">{errors.endDate.message}</span>)}
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className={`px-4 py-2 rounded-md border ${project ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-white text-indigo-900 border-indigo-700 hover:bg-trueGray-50'}`}>
              Cancel
            </button>
            <button type="submit" className={`px-4 py-2 text-white rounded-md ${project ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
              {project ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
          {
            errorMessage && (
              <span className="text-indigo-900 dark:text-white">{errorMessage}</span>
            )
          }
        </form>
      </div>
    </Modal>
  );
};
