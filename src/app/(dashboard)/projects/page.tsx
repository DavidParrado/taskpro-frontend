'use client';
import { useEffect, useState } from "react";

import { ProjectModal, ProjectList, ProjectFormInputs } from '@/components';
import { getDecodedToken, getToken } from "@/utils/authHelpers";
import { createProject, getProjectsByUser } from "@/actions";
import { IJwtPayload, IProject } from "@/interfaces";

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState<IProject[]>([]);

  const onClose = () => {
    setIsModalOpen(false);
  }

  // Handler to create a new project
  const handleCreateProject = async (projectFormData: ProjectFormInputs) => {
    const token = getToken() || "";
    try {
      const newProject = await createProject(projectFormData, token);
      setProjectList((projects) => [newProject, ...projects]);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = getToken() || "";
    const decoded = getDecodedToken() as IJwtPayload;

    getProjectsByUser(decoded.user.id, token).then((projects) => {
      setProjectList(projects);
    }).catch((err) => {
      console.error(err);
    });

  }, []);

  return (
    <div className="w-full h-full p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>

        {/* Button to trigger the modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Project
        </button>

      </div>
      {/* Modal for creating a new project */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={onClose}
        handleProjectSubmit={handleCreateProject}
      />

      {/* List of projects (you will replace this with actual fetched data) */}
      {
        projectList.length > 0 ? (<ProjectList projects={projectList} />) : (<p className="mt-2">No projects found</p>)
      }

    </div>
  );
}

export default ProjectsPage;