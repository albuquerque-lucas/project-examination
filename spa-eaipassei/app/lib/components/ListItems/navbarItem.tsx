import { motion } from 'framer-motion';

export default function NavbarItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      className="nav-item"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      { children }
    </motion.li>
  )
}