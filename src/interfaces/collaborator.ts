import { ITeam } from "./team";
import { IUser } from "./user";

export interface ICollaborator {
  id: string;
  user: IUser;
  team: ITeam;
}
