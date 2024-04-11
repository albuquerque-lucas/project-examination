'use client';

import React, { useContext, useEffect } from 'react';
import { ExaminationsContext } from '../../context/ExaminationsContext';
import { ExaminationsQueryParams } from '../../types/examinationTypes';
import { useNavigations } from '../../hooks/useNavigations';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';
import { motion } from 'framer-motion';


interface NavigationButtonsProps {
  navigationLinks: {
    label: string | undefined;
    url: string | undefined;
    active: boolean | undefined;
  }[] | undefined;
  setData: React.Dispatch<React.SetStateAction<any>>;
  getDataByPage: (url: string, queryParams?: ExaminationsQueryParams) => Promise<any>;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ setData, getDataByPage }) => {
  
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    setLoaded,
    setFilterList,
    filterList,
    setQueryParams,
    loaded
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
  
      const response = await getDataByPage(url, updatedQueryParams);
      console.log('RESPOSTA DE GET PAGE', response);
      setData(response.data);
      updateNavigationLinks(response.links);
      setLoaded(false);
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