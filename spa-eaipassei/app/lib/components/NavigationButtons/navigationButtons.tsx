'use client';

import { useEffect, useContext } from 'react';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';
import { getExaminationsByPage } from '../../../lib/api/examinationsAPI';
import { ExaminationsContext } from '../../context/ExaminationsContext';

interface NavigationButtonsProps {
  navigationLinks: {
    label: string | undefined;
    url: string | undefined;
    active: boolean | undefined;
  }[] | undefined;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ navigationLinks }) => {
  const {
    setExaminations,
    setNavigationLinks,
  } = useContext(ExaminationsContext);
  
  const getPage = async (url: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof url === 'undefined' || url === null) return;
    try {
      const response = await getExaminationsByPage(url);
      console.log('Response:', response);
      setExaminations(response);
      setNavigationLinks(response.links);
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