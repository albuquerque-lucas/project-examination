'use client';

import React, { useContext, useEffect } from 'react';
import { getExaminations } from '@/app/lib/api/examinationsAPI';
import { ExaminationsContext } from '@/app/lib/context/ExaminationsContext';
import { NavigationButtonsProps } from '@/app/lib/types/navigationTypes';
import { updateLinks } from '@/app/lib/utils/updateNavLinks';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';

const ExaminationsNavButtons: React.FC<NavigationButtonsProps | null> = (props) => {
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    filterList,
    setQueryParams,
    setExaminations,
  } = useContext(ExaminationsContext);
  
  useEffect(() => {
  }, [currentPage]);

  if (!props) {
    return (
      <div>
      </div>
    );
  }

  const { links } = props;

  let linksList = updateLinks(links);

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
      if (response) {
        linksList = updateLinks(response.links);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={ style.examinations_navbuttons }>
      {
        linksList && linksList.length > 0 ? (
          linksList.map((item, index) => (
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