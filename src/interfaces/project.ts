import { ProjectStatus } from "@/utils/enums";
import { IUser } from "./user";
import { ITask } from "./task";

export interface IProjectCreation {
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: ProjectStatus;
}

export interface IProject {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  owner: IUser;
  tasks: ITask[];
}

export interface IProjectUpdate {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: ProjectStatus;
}