'use client';

import React, { useContext, useEffect } from 'react';
import { NoticesContext } from '@/app/lib/context/NoticesContext';
import { updateLinks } from '@/app/lib/utils/updateNavLinks';
import { motion } from 'framer-motion';
import { getAllNotices } from '@/app/lib/api/noticesAPI';
import { NavigationButtonsProps } from '@/app/lib/types/navigationTypes';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';


const NoticeNavigationButtons: React.FC<NavigationButtonsProps | null> = (props) => {
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    filterList,
    setQueryParams,
    setNotices,
  } = useContext(NoticesContext);

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
      console.log('URL OBJECT', urlObj);
      const page = urlObj.searchParams.get('page');
      setCurrentPage(Number(page));
  
      const updatedQueryParams = {
        ...queryParams,
        page: page ? Number(page) : undefined,
      };

      setQueryParams([...filterList, { filter: 'page', value: page ? page : '' }]);
  
      const response = await getAllNotices(url, updatedQueryParams);
      setNotices(response);
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

export default NoticeNavigationButtons;