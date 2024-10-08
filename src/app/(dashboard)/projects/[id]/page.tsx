'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getToken } from "@/utils/authHelpers";
import { IProject } from "@/interfaces";
import { ProjectStatus, TaskStatus } from "@/utils/enums";

import { KanbanBoard, ProjectModal, ProjectViewSkeleton, TaskFormInputs, TaskModal } from "@/components"; // Modal to create a new task
import { updateTaskStatus, getProjectById, updateProject, createTask, deleteTask, deleteProject } from "@/actions";
import { updateTask } from '../../../../actions/task/updateTask';
import { useRouter } from "next/navigation";

const ProjectPage = () => {
  const [project, setProject] = useState<IProject>({ name: "Proyecto 1", description: "Description 1", id: "1", createdAt: "2021-10-01T00:00:00.000Z", updatedAt: "2021-10-01T00:00:00.000Z", owner: { id: "1", email: "", name: "", roles: [] }, status: ProjectStatus.IN_PROGRESS, tasks: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const openTaskModal = () => setIsTaskModalOpen(true);
  const closeTaskModal = () => setIsTaskModalOpen(false);
  const handleOpenEditModal = () => setIsProjectModalOpen(true);
  const handleCloseEditModal = () => setIsProjectModalOpen(false);

  const handleProjectUpdate = async (updatedProject: any) => {
    try {
      await updateProject(project.id, updatedProject, getToken() || "");
      setProject((project) => ({ ...project, ...updatedProject }));
      setIsProjectModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleProjectDelete = async () => {
    // Delete project in the server
    try {
      await deleteProject(project.id, getToken() || "");
      // Redirect to the projects page
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  }

  // Function to create a new task
  const handleTaskCreate = async (task: any) => {
    try {
      const resp = await createTask({ ...task, projectId: project.id }, getToken() || "");
      console.log(resp);
      setProject((project) => ({ ...project, tasks: [resp, ...project.tasks] }));
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error(error);
      setIsTaskModalOpen(false);
    }
  }
  // Function to update a task
  const handleTaskUpdate = async (taskId: string, task: TaskFormInputs) => {
    try {
      const resp = await updateTask(taskId, task, getToken() || "");
      setProject((project) => ({
        ...project,
        tasks: project.tasks.map((t) => t.id === resp.id ? resp : t)
      }));
    } catch (error) {
      console.error(error);
    }
  }

  // Function to delete a task
  const handleTaskDelete = async (taskId: string) => {
    // Delete task in the server
    try {
      const resp = await deleteTask(taskId, getToken() || "");
      if (resp) {
        setProject((project) => ({
          ...project,
          tasks: project.tasks.filter((task) => task.id !== taskId)
        }));
      }
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  const moveTask = async (taskId: string, newStatus: TaskStatus) => {
    // Verify if the status is not the same
    if (project.tasks.find((task) => task.id === taskId)?.status === newStatus) return;
    setProject((project) => ({
      ...project,
      tasks: project.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    }));
    // Update task status in the server
    await updateTaskStatus(taskId, newStatus, getToken() || "");
  };

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
        <DndProvider backend={HTML5Backend}>
          <KanbanBoard tasks={project.tasks} moveTask={moveTask} handleUpdateTask={handleTaskUpdate} handleDeleteTask={handleTaskDelete} />
        </DndProvider>

        {/* Task Modal */}
        {isTaskModalOpen && <TaskModal handleSubmitTask={handleTaskCreate} isOpen={isTaskModalOpen} onClose={closeTaskModal} />}
        {/* Modal to edit project */}
        {isProjectModalOpen && (
          <ProjectModal
            isOpen={isProjectModalOpen}
            project={project}
            onClose={handleCloseEditModal}
            handleProjectSubmit={handleProjectUpdate}
            handleDeleteProject={handleProjectDelete}
          />
        )}
      </div>
  );
};

export default ProjectPage;
