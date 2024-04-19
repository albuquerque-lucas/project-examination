'use client';
import React, { useContext, useEffect } from 'react';
import { useNavigations } from '@/app/lib/hooks/useNavigations';
import { SubjectsContext } from '@/app/lib/context/SubjectsContext';
import { getAllSubjects } from '@/app/lib/api/subjectsAPI';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';

const SubjectsNavigationButtons: React.FC = () => {
  const { navigationLinks, updateNavigationLinks } = useNavigations();
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    filterList,
    setQueryParams,
    setSubjectsLoaded,
    setSubjects,
  } = useContext(SubjectsContext);

  useEffect(() => {
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
  
      const response = await getAllSubjects(url, updatedQueryParams);
      setSubjects(response.data);
      updateNavigationLinks(response.links);
      setSubjectsLoaded(false);
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

export default SubjectsNavigationButtons;