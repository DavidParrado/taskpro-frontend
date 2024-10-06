'use client';
import { useEffect, useState } from "react";

import { CreateProjectModal } from '@/components';
import { getDecodedToken, getToken } from "@/utils/authHelpers";
import { getProjectsByUser } from "@/actions";
import { IJwtPayload, IProject } from "@/interfaces";
import { ProjectList } from "./ProjectList";

interface Props {
  projects?: IProject[];
}

export const Projects = ({ projects }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState<IProject[]>(projects || []);

  const onClose = () => {
    setIsModalOpen(false);
  }

  const handleCreateProject = (project: IProject) => {
    setProjectList([project, ...projectList]);
    onClose();
  }

  useEffect(() => {
    const token = getToken() || "";
    const { user } = getDecodedToken() as IJwtPayload;

    getProjectsByUser(user.id, token).then((projects) => {
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
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={onClose}
        onCreate={handleCreateProject}
      />

      {/* List of projects (you will replace this with actual fetched data) */}
      {
        projectList.length > 0 ? (<ProjectList projects={projectList} />) : (<p className="mt-2">No projects found</p>)
      }

    </div>
  );
}
