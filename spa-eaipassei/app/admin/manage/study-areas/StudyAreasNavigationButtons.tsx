'use client';

import React, { useContext, useEffect } from 'react';
import { StudyAreasContext } from '@/app/lib/context/StudyAreasContext';
import { getAllAreas } from '@/app/lib/api/StudyAreasAPI';
import { NavigationButtonsProps } from '@/app/lib/types/navigationTypes';
import { updateLinks } from '@/app/lib/utils/updateNavLinks';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';


const StudyAreasNavigationButtons: React.FC<NavigationButtonsProps | null> = (props) => {
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    filterList,
    setQueryParams,
    setStudyAreas,
  } = useContext(StudyAreasContext);

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
  
      const response = await getAllAreas(url, updatedQueryParams);
      setStudyAreas(response.data);
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

export default StudyAreasNavigationButtons;