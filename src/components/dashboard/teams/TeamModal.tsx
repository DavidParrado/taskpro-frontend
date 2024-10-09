'use client';
import { getProjectsByUser } from "@/actions";
import { getUsers } from "@/actions/user/getUsers";
import { IProject, ITeam, IUser } from "@/interfaces";
import { getDecodedToken, getToken } from "@/utils/authHelpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";

interface Props {
  isOpen: boolean;
  team?: ITeam;
  onClose: () => void;
  handleDeleteTeam?: (teamId: string) => Promise<void>;
  handleSubmitTeam: (data: TeamFormInputs) => Promise<void>;
  handleUpdateTeam?: (teamId: string, data: TeamFormInputs) => Promise<void>;
}

const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  projectId: z.string().min(1, "Project is required"),
  collaboratorIds: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export type TeamFormInputs = {
  name: string;
  projectId: string;
  collaboratorIds?: string[];
  description: string;
};

export const TeamModal = ({ isOpen, onClose, team, handleSubmitTeam, handleDeleteTeam, handleUpdateTeam }: Props) => {
  let modalRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<IProject[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { register, handleSubmit, formState: { errors }, setValue, reset, trigger,watch } = useForm<TeamFormInputs>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team?.name || "",
      projectId: team?.project?.id || "",
      collaboratorIds: team?.collaborators?.map(collaborator => collaborator.id) || [],
      description: team?.description || "",
    }
  });

  const onSubmit: SubmitHandler<TeamFormInputs> = async (data) => {
    console.log({submittedData: data});
    try {
      if (team) {
        await handleUpdateTeam!(team.id, data);
        reset();
        onClose();
        return;
      }
      await handleSubmitTeam(data);
      reset();
      onClose();
    } catch (error) {
      setErrorMessage("No se pudo crear/guardar el equipo. Inténtalo de nuevo.");
    }
  }

  useEffect(() => {
    // Get data from server
    const user = getDecodedToken()?.user;
    getProjectsByUser(user?.id || "", getToken() || "").then((projects) => {
      setProjects(projects)
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    // Get data from server
    getUsers(getToken() || "").then((users) => {
      setUsers(users)
    }).catch((error) => {
      console.error(error);
    });
  }, []);

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

  // Add functionality to the modal when clicking outside to close it
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg" ref={modalRef}>
        <h2 className="text-xl font-bold mb-4">
          {team ? "Edit Team" : "Create Team"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          {/* Form fields */}
          <div>
            <label htmlFor="name" className="block mb-2">Team Name</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("name")}
            />
            {errors.name && (<span className="text-indigo-800">{errors.name.message}</span>)}
          </div>

          <div>
            <label htmlFor="project" className="block mb-2">Assigned Project</label>
            <Select
              inputId="project"
              options={projects.map((project) => ({ value: project.id, label: project.name }))}
              onChange={(selected) => {
                setValue("projectId", selected!.value);
                trigger("projectId");
              }}
              defaultValue={team ? { value: team.project?.id, label: team.project?.name } : null}
              isDisabled={team ? true : false}
            />
            {errors.projectId && (<span className="text-indigo-800">{errors.projectId.message}</span>)}
          </div>

          <div>
            <label htmlFor="collaborators" className="block mb-2">Collaborators</label>
            <Select
              isMulti
              inputId="collaborators"
              options={users.map((user) => ({ value: user.id, label: user.name }))}
              defaultValue={team ? team.collaborators?.map((collab) => ({ value: collab?.id, label: collab?.user?.name })) : []}
              onChange={(selected) =>{
                setValue("collaboratorIds", selected.map((collab) => collab.value))
                trigger("collaboratorIds");
              }}
              isDisabled={team ? true : false}
            />
            {errors.collaboratorIds && (<span className="text-indigo-800">{errors.collaboratorIds.message}</span>)}
          </div>

          <div>
            <label className="block mb-2">Description (optional)</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              {...register("description")}
            />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between">
            {
              team ?
                <button
                  type="button"
                  onClick={() => handleDeleteTeam!(team.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                : <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
            }
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
          {errorMessage && <p className="text-indigo-800">{errorMessage}</p>}
        </form>

      </div>
    </div>
  ) : null;
};
