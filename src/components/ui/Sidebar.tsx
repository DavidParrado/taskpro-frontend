'use client';
// components/Sidebar.tsx
import Link from 'next/link';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-black dark:text-slate-300 text-black py-5 px-4 lg:px-6 xl:px-8 border-r">
      <ul className="list-none p-0">
        <li className="mb-4">
          <Link href="/projects" className="dark:text-slate-300 text-black text-lg hover:underline">
            Proyectos
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/tasks" className="dark:text-slate-300 text-black text-lg hover:underline">
            Tareas
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/teams" className="dark:text-slate-300 text-black text-lg hover:underline">
            Equipos
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/profile" className="dark:text-slate-300 text-black text-lg hover:underline">
            Perfil
          </Link>
        </li>
      </ul>
    </div>
  );
};
