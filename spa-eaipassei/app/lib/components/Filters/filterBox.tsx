import { useState } from "react";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/filters/filterbox.module.css';
import ExaminationsFilters from "./examinationsFilter";

export default function FilterBox() {
  const [filterModeOn, setFilterModeOn] = useState(false);

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

  return (
    <div className={ style.filter_box }>
      <div className={ style.button_container }>
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