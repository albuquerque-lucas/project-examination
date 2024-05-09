import { useContext, useEffect } from 'react';
import { AdminLayoutContext } from '@/app/lib/context/AdminLayoutContext';
import { motion } from 'framer-motion';

export default function NavbarItem({ children }: { children: React.ReactNode }) {
  const { setPageChange } = useContext(AdminLayoutContext);
  return (
    <motion.li
      className="nav-item"
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.15 }}
      onClick={() => setPageChange(true)}
    >
      { children }
    </motion.li>
  )
}