import { useState, useContext, useEffect } from "react";
import { ExaminationsContext } from "../../context/ExaminationsContext";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import { motion, AnimatePresence } from 'framer-motion';
import ExaminationsFilters from "./examinationsFilter";
import style from '@/app/ui/admin/filters/filterbox.module.css';

export default function FilterBox() {
  const [filterModeOn, setFilterModeOn] = useState(false);
  const { filterMessage, setFilterMessage } = useContext(ExaminationsContext);

  const toggleFilterMode = () => {
    setFilterModeOn(prevState => !prevState);
  }

  const filterVariants = {
    open: { 
      height: "10rem",
      opacity: 1,
      scale: 1,
      transition: {
        height: { duration: 0.2 },
        opacity: { delay: 0.3, duration: 0.1 },
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      scale: 0,
      transition: {
        opacity: { duration: 0.1 },
        height: { delay: 0.4, duration: 0.2 },
        scale: { delay: 0.6 }
      }
    },
  };

  useEffect(() => {
    if (filterMessage) {
      const timer = setTimeout(() => {
        setFilterMessage('');
      }, 3500); // 1 second

      // Limpar o timer quando o componente for desmontado
      return () => clearTimeout(timer);
    }
  }, [filterMessage, setFilterMessage]);

  return (
    <div className={ style.filter_box }>
      <div className={ style.button_container }>
        <AnimatePresence>
          { filterMessage &&
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
            >
            { filterMessage }
            </motion.p> 
          }
        </AnimatePresence>
        <motion.button
          className={ style.arrow_button }
          onClick={toggleFilterMode}
          animate={{ rotate: filterModeOn ? 0 : -180 }}
          whileTap={{ scale: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <BiSolidUpArrowSquare />
        </motion.button>
      </div>
      <motion.div 
        className={ style.filterbox_filters }
        variants={filterVariants}
        initial="closed"
        animate={filterModeOn ? "open" : "closed"}
      >
        <ExaminationsFilters />
      </motion.div>
    </div>
  );
}