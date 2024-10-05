'use client';
// components/Sidebar.tsx
import Link from 'next/link';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link href="/projects">Proyectos</Link>
        </li>
        <li>
          <Link href="/tasks">Tareas</Link>
        </li>
        <li>
          <Link href="/teams">Equipos</Link>
        </li>
        <li>
          <Link href="/profile">Perfil</Link>
        </li>
      </ul>

      <style jsx>{`
        .sidebar {
          width: 250px;
          background-color: #2d3748;
          color: white;
          height: 100%;
          padding: 20px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 15px;
        }
        a {
          color: white;
          text-decoration: none;
          font-size: 18px;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

