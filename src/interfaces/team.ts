import { ICollaborator } from "./collaborator";
import { IProject } from "./project";

export interface ITeam {
  id: string;
  name: string;
  project: IProject;
  collaborators?: ICollaborator[];
  description?: string;
}
