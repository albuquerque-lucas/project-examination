'use client';

import React, { use, useContext, useEffect } from 'react';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';
import { getExaminationsByPage } from '../../../lib/api/examinationsAPI';
import { ExaminationsContext } from '@/app/lib/context/ExaminationsContext';
import { motion } from 'framer-motion';


interface NavigationButtonsProps {
  navigationLinks: {
    label: string | undefined;
    url: string | undefined;
    active: boolean | undefined;
  }[] | undefined;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setLinks: React.Dispatch<React.SetStateAction<any>>;
  getDataByPage: (url: string) => Promise<any>;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ navigationLinks, setData, setLinks, getDataByPage }) => {
  
  const getPage = async (url: any, e: React.MouseEvent) => {
    e.preventDefault();
    console.log(url);
    if (typeof url === 'undefined' || url === null) return;
    try {
      const response = await getDataByPage(url);
      setData(response.data);
      setLinks(response.links);
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
              whileTap={{ scale: 0.9}}
              key={ index }
              className={ style.examinations_navbutton__buttons }
              onClick={ (e) => getPage(item.url, e) }
              disabled={ item.active }
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