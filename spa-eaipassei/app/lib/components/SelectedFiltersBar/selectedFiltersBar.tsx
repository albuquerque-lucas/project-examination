'use client';

import { useContext } from "react";
import { ExaminationsContext } from "../../context/ExaminationsContext";
import { NavigationContext } from "../../context/NavigationContext";
import { motion } from 'framer-motion';
import { BsFillXSquareFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import style from '@/app/ui/admin/filters_bar/filtersBar.module.css';

export default function SelectedFiltersBar() {
  const {
    filterList,
    setFilterList,
    setQueryParams,
    setExaminationsLoaded
  } = useContext(ExaminationsContext);

  const removeFromFilterList = (indexToRemove: number) => {
    setFilterList(prevFilterList => {
      const updatedFilterList = prevFilterList.filter((_, index) => index !== indexToRemove);
      setQueryParams(updatedFilterList);
      setExaminationsLoaded(false);
      return updatedFilterList;
    });
  }

  const clearFilters = () => {
    setFilterList([]);
    setQueryParams([]);
    setExaminationsLoaded(false);
  }

  return (
    filterList.length > 0 ? (
      <div className={ style.selected_filter_list }>
        {filterList.map((filter, index) => (
          <div key={index} className={ style.selected_filter_item }>
            <span>
              {filter.filter}: {filter.value}
            </span>
            <motion.button
              className={ style.delete_filter_button }
              onClick={() => removeFromFilterList(index)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ backgroundColor: "#343a40", cursor: "pointer" }}
            >
              <TiDelete />
            </motion.button>
          </div>
        ))}
            <motion.button
              className={ style.clear_filters_button }
              onClick={ clearFilters }
              whileTap={{ scale: 0.9 }}
              whileHover={{ backgroundColor: "white", cursor: "pointer" }}
            >
              <BsFillXSquareFill />
            </motion.button>
      </div>
    ) : null
  )
}