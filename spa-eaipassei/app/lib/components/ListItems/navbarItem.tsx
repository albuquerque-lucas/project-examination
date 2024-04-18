import { motion } from 'framer-motion';

export default function NavbarItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      className="nav-item"
      whileHover={{ scale: 1.05 }}
      whileTap={{ backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
    >
      { children }
    </motion.li>
  )
}