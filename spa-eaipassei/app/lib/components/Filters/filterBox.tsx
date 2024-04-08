import { useState } from "react";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/filters/filterbox.module.css';

export default function FilterBox() {
  const [filterModeOn, setFilterModeOn] = useState(false);

  const toggleFilterMode = () => {
    setFilterModeOn(prevState => !prevState);
  }

  return (
    <div className={ style.filter_box }>
      <div className={ style.button_container }>
        <motion.button
          className={ style.arrow_button }
          onClick={toggleFilterMode}
          animate={{ rotate: filterModeOn ? 0 : -180 }}
          transition={{ duration: 0.2 }}
        >
          <BiSolidUpArrowSquare />
        </motion.button>
      </div>
      <motion.div 
        className={`${style.filterbox_filters}`}
        animate={{ minHeight: filterModeOn ? "0rem" : "10rem" }}
        transition={{ duration: 0.2 }}
      >
      </motion.div>
    </div>
  );
}