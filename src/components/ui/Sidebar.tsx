'use client';
// components/Sidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {

  const routes = [
    { name: 'Proyectos', path: '/projects' },
    { name: 'Tareas', path: '/tasks' },
    { name: 'Equipos', path: '/teams' },
    { name: 'Perfil', path: '/profile' }
  ];
  const pathName = usePathname();
  const isActive = (path: string) => pathName.startsWith(path) ? 'bg-indigo-100 dark:bg-gray-800' : '';

  return (
    <div className="w-64 bg-white dark:bg-trueGray-900 dark:text-slate-300 text-black py-5 px-4 lg:px-6 xl:px-8 border-r dark:border-r-slate-500">
      <ul className="list-none p-0">
        {routes.map((route) => (
          <li key={route.name} className="mb-4">
            <Link href={route.path} className={`inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 ${isActive(route.path)}`}>
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
