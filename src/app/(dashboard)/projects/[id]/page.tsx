'use client';
import { useEffect, useState } from "react";
import { KanbanBoard, ProjectViewSkeleton, TaskModal } from "@/components"; // Modal to create a new task
import { getProjectById } from "@/actions/projects/getProjectById";
import { useParams } from "next/navigation";
import { getToken } from "@/utils/authHelpers";
import { IProject } from "@/interfaces";
import { ProjectStatus } from "@/utils/enums";
import { EditProjectModal } from "@/components/dashboard/projects/EditProjectModal";

const ProjectPage = () => {
  const [project, setProject] = useState<IProject>({ name: "Proyecto 1", description: "Description 1", id: "1", createdAt: "2021-10-01T00:00:00.000Z", updatedAt: "2021-10-01T00:00:00.000Z", owner: { id: "1", email: "", name: "", roles: [] }, status: ProjectStatus.IN_PROGRESS, tasks: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { id } = useParams<{ id: string }>();

  const openTaskModal = () => setIsTaskModalOpen(true);
  const closeTaskModal = () => setIsTaskModalOpen(false);
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleProjectUpdate = (updatedProject: IProject) => {
    setProject((project) => ({ ...project, ...updatedProject }));
    setIsEditModalOpen(false);
  }

  const handleTaskCreate = (task: any) => {
    setProject((project) => ({ ...project, tasks: [task, ...project.tasks] }));
    setIsTaskModalOpen(false);
  }

  useEffect(() => {
    setIsLoading(true);
    // Fetch project data from the server
    getProjectById(id, getToken() || "").then((project) => {
      setProject(project);
      setIsLoading(false);
    }).catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
  }, [])

  return (
    isLoading ? <ProjectViewSkeleton /> :
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          {/* Create Task Button */}
          <button
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            onClick={openTaskModal}
          >
            + Create New Task
          </button>
        </div>
        {/* Project Status and Dates */}
        <div className="flex items-center space-x-6 mb-6">
          <span className={`text-sm font-semibold rounded-md px-3 py-1 ${project.status === ProjectStatus.COMPLETED ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
            }`}>
            {project.status.toUpperCase()}
          </span>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>Start Date: {project.startDate && new Date(project.startDate).toLocaleDateString() || "Sin asignar"}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>End Date: {project.endDate && new Date(project.endDate).toLocaleDateString() || "Sin asignar"}</span>
          </div>
        </div>

        {/* Button to open edit project modal */}
        <button
          onClick={handleOpenEditModal}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Edit Project
        </button>

        {/* Kanban Board */}
        <KanbanBoard tasks={project.tasks} />

        {/* Task Modal */}
        {isTaskModalOpen && <TaskModal onCreateTask={handleTaskCreate} isOpen={isTaskModalOpen} onClose={closeTaskModal} projectId={project.id} />}
        {/* Modal to edit project */}
        {isEditModalOpen && (
          <EditProjectModal
            isOpen={isEditModalOpen}
            project={project}
            onClose={handleCloseEditModal}
            onSave={handleProjectUpdate}
          />
        )}
      </div>
  );
};

export default ProjectPage;
