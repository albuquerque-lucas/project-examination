import { useContext, useEffect } from 'react';
import { AdminLayoutContext } from '@/app/lib/context/AdminLayoutContext';

export default function NavbarItem({ children }: { children: React.ReactNode }) {
  const { setPageChange } = useContext(AdminLayoutContext);
  return (
    <li
      className="nav-item"
      onClick={() => setPageChange(true)}
    >
      { children }
    </li>
  )
}