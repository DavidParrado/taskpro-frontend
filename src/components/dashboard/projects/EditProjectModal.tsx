'use client';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z, { ZodType } from 'zod';
import { ProjectStatus } from '@/utils/enums';
import { IProject } from '@/interfaces';
import { ProjectModalSkeleton } from '@/components';
import { updateProject } from '@/actions';
import { getToken } from '@/utils/authHelpers';

Modal.setAppElement('#root');

type FormInputs = {
  name: string;
  status: ProjectStatus;
  description?: string;
  startDate?: Date;
  endDate?: Date;
};

interface Props {
  isOpen: boolean;
  project: IProject;
  onSave: (updatedProject: IProject) => void;
  onClose: () => void;
}

const schemaValidator: ZodType<FormInputs> = z.object({
  name: z.string().min(1, "Project name is required"),
  status: z.nativeEnum(ProjectStatus),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
}).refine(({ startDate, endDate }) => {
  if (!startDate || !endDate) return true;
  return endDate >= startDate;
}, {
  message: "End date should be after start date",
  path: ['endDate']
});

export const EditProjectModal = ({ isOpen, project, onSave, onClose }: Props) => {
  let modalRef = React.useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { register, handleSubmit, formState: { errors, defaultValues }, reset } = useForm<FormInputs>({
    resolver: zodResolver(schemaValidator),
    defaultValues: {
      ...project,
      startDate: project.startDate ? new Date(project.startDate).toLocaleDateString("af-ZA") as any : undefined,
      endDate: project.endDate ? new Date(project.endDate).toLocaleDateString("af-ZA") as any : undefined
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const token = getToken() || "";
    // Server action
    const resp = await updateProject(project.id, data, token);
    if (!resp) {
      setErrorMessage(resp.message);
      return;
    };
    onSave(resp);
    reset();
  };

  useEffect(() => {
    console.log(defaultValues)
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
  }, [defaultValues]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? <ProjectModalSkeleton /> : (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div ref={modalRef} className="bg-white dark:bg-trueGray-900 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Project Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('name')}
            />
            {errors.name && <span className="text-indigo-800 dark:text-white">{errors.name.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('description')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('status')}
            >
              <option value="">Select Status</option>
              {Object.values(ProjectStatus).map(status => (
                <option key={status} value={status}>{status.toLocaleUpperCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('startDate', { valueAsDate: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('endDate', { valueAsDate: true })}
            />
            {errors.endDate && <span className="text-indigo-800 dark:text-white">{errors.endDate.message}</span>}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
          {errorMessage && <span className="text-indigo-800 dark:text-white">{errorMessage}</span>}
        </form>
      </div>
    </Modal>
  );
};
