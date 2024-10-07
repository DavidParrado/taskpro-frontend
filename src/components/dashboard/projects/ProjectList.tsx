import { IProject } from "@/interfaces/project";
import Link from "next/link";

interface Props {
  projects: IProject[];
}

export const ProjectList = ({ projects }: Props) => {

  return (
    <ul className="mt-6 flex flex-col gap-y-4">
      {projects.map((project) => (
        <li key={project.id}>
          <Link href={`/projects/${project.id}`} className="list-item bg-gray-100 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-200 dark:bg-trueGray-800 dark:hover:bg-trueGray-700">{project.name}</Link>
        </li>
      ))}
    </ul>
  )
}