'use client';

import React, { useContext, useEffect } from 'react';
import { ExaminationsContext } from '../../context/ExaminationsContext';
import { useNavigations } from '../../hooks/useNavigations';
import { getExaminationsByPage } from '../../api/examinationsAPI';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';
import { motion } from 'framer-motion';


const NavigationButtons: React.FC = () => {
  
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    filterList,
    setQueryParams,
    setExaminationsLoaded,
    setExaminations,
  } = useContext(ExaminationsContext);
  const { navigationLinks, updateNavigationLinks } = useNavigations();
  useEffect(() => {
    // setQueryParams(filterList);
  }, [currentPage]);

  const getPage = async (url: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof url === 'undefined' || url === null) return;
    try {
      const urlObj = new URL(url);
      console.log('URL OBJECT', urlObj);
      const page = urlObj.searchParams.get('page');
      setCurrentPage(Number(page));
  
      const updatedQueryParams = {
        ...queryParams,
        page: page ? Number(page) : undefined,
      };

      setQueryParams([...filterList, { filter: 'page', value: page ? page : '' }]);
  
      const response = await getExaminationsByPage(url, updatedQueryParams);
      setExaminations(response.data);
      updateNavigationLinks(response.links);
      setExaminationsLoaded(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={ style.examinations_navbuttons }>
      {
        navigationLinks && navigationLinks.length > 0 ? (
          navigationLinks.map((item, index) => (
            <motion.button
            whileTap={ item.active || item.url === null ? {} : { scale: 0.9 } }
              key={ index }
              className={ style.examinations_navbutton__buttons }
              onClick={ (e) => getPage(item.url, e) }
              disabled={ item.active || item.url === null }
            >
              {item.label}
            </motion.button>
          ))
        ) : (
          <div></div>
        )
      }
    </div>
  )
}

export default NavigationButtons;