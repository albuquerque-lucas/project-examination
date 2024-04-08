'use client';

import React, { useContext, useEffect } from 'react';
import { ExaminationsContext } from '../../context/ExaminationsContext';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';
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
  
  const { currentPage, setCurrentPage } = useContext(ExaminationsContext);

  useEffect(() => {
    console.log(navigationLinks);
  }, [currentPage]);

  const updateNavigationLinks = (links: any[]) => {
    const updatedLinks = links.map((link: any, index: number, array: any[]) => {
      if (index === array.length - 1) {
          return {
            ...link,
            label: link.label.replace('&raquo;', '\u00BB'),
          };
      }
      if (index === 0) {
        return {
          ...link,
          label: link.label.replace('&laquo;', '\u00AB'),
        };
      }
      return link;
    });

    setLinks(updatedLinks);
  };

  const getPage = async (url: any, e: React.MouseEvent) => {
    e.preventDefault();
    console.log(url);
    if (typeof url === 'undefined' || url === null) return;
    try {
      const urlObj = new URL(url);
      const page = urlObj.searchParams.get('page');
      setCurrentPage(Number(page));
      console.log(page); // Isto irá imprimir o número da página
  
      const response = await getDataByPage(url);
      setData(response.data);
      updateNavigationLinks(response.links);
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