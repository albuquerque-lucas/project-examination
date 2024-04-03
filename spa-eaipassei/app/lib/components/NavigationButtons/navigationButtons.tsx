'use client';

import React from 'react';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';
import { getExaminationsByPage } from '../../../lib/api/examinationsAPI';

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
    if (typeof url === 'undefined' || url === null) return;
    try {
      const response = await getExaminationsByPage(url);
      console.log('Response:', response);
      setData(response);
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
            <button
              key={index}
              className={ style.examinations_navbutton__buttons }
              onClick={(e) => getPage(item.url, e)}
            >
              {item.label}
            </button>
          ))
        ) : (
          <div></div>
        )
      }
    </div>
  )
}

export default NavigationButtons;