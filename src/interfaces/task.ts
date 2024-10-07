import { TaskStatus } from "@/utils/enums";
import { ITag } from "./tag";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  tags?: ITag[];
  createdAt: string;
  updatedAt: string;
}
