'use Client';

import { useContext, useEffect } from "react";
import { ExaminationsContext } from "../context/ExaminationsContext";
import { NavigationLink } from "../types/entityContextTypes";

export const useNavExaminations = () => {
  const { examinationNavLinks, setExaminationNavLinks } = useContext(ExaminationsContext);
  const updateNavigationLinks = (links: NavigationLink[]) => {
    const updatedLinks = links.map((link: NavigationLink, index: number, array: NavigationLink[]) => {
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

    setExaminationNavLinks(updatedLinks);
  };

  useEffect(() => {
    console.log('Log de useNavExaminations');
  }, [examinationNavLinks])

  return {
    examinationNavLinks,
    setExaminationNavLinks,
    updateNavigationLinks,
  };
}