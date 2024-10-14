'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { downloadPdf } from '@/actions';
import { getToken, removeToken } from '@/utils/authHelpers';

export const Sidebar = () => {

  const routes = [
    { name: 'Landing', path: '/landing' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Equipos', path: '/teams' },
    { name: 'Perfil', path: '/profile' }
  ];
  const pathName = usePathname();
  const isActive = (path: string) => pathName.startsWith(path) ? 'bg-indigo-100 dark:bg-gray-800' : '';
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/auth/login');
  };


  const handleDownload = async () => {
    try {
      const blob = await downloadPdf(getToken() || "");
      if (!blob) {
        alert('No se pudo descargar el pdf lo sentimos')
        return;
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tareas.pdf';
      a.click();
    } catch (err) {
      console.error(err);
    }
  }

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
        <button onClick={handleLogout} className='mb-4 bg-indigo-600 text-white py-2 px-3 rounded hover:bg-indigo-700'>Cerrar sesión</button>
        <button onClick={handleDownload} className='mb-4 bg-violet-600 text-white py-2 px-3 rounded hover:bg-violet-700'>Descargar pdf</button>
      </ul>
    </div>
  );
};
