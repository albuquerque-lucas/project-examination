import { motion } from 'framer-motion';

export default function NavbarItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      className="nav-item"
      whileHover={{ scale: 1.015, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      transition={{ duration: 0.15 }}
      whileTap={{ backgroundColor: 'transparent'}}
    >
      { children }
    </motion.li>
  )
}