'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useNavigations } from '@/app/lib/hooks/useNavigations';
import { useNavExaminations } from '@/app/lib/hooks/useNavExaminations';
import { getExaminations } from '@/app/lib/api/examinationsAPI';
import { ExaminationsContext } from '@/app/lib/context/ExaminationsContext';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';
import { NavigationLink } from '@/app/lib/types/responseTypes';


const ExaminationsNavButtons: React.FC = () => {
  const { examinationNavLinks, updateNavigationLinks } = useNavExaminations();
  
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    filterList,
    setQueryParams,
    setExaminationsLoaded,
    setExaminations,
  } = useContext(ExaminationsContext);
  
  useEffect(() => {
    console.log('Examinations NavButtons mounted');
  }, [currentPage, examinationNavLinks]);

  const getPage = async (url: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof url === 'undefined' || url === null) return;
    try {
      const urlObj = new URL(url);
      const page = urlObj.searchParams.get('page');
      setCurrentPage(Number(page));
  
      const updatedQueryParams = {
        ...queryParams,
        page: page ? Number(page) : undefined,
      };

      setQueryParams([...filterList, { filter: 'page', value: page ? page : '' }]);
  
      const response = await getExaminations(url, updatedQueryParams);
      setExaminations(response);
      response && updateNavigationLinks(response.links);
      setExaminationsLoaded(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={ style.examinations_navbuttons }>
      {
        examinationNavLinks && examinationNavLinks.length > 0 ? (
          examinationNavLinks.map((item, index) => (
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

export default ExaminationsNavButtons;