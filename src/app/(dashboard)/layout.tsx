// components/Layout.tsx
import { ReactNode } from 'react';
import { Navbar, Sidebar } from '../../components'; // Asumimos que ya lo has creado

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          {children} {/* Aquí va el contenido dinámico de cada página */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
