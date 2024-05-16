'use Client';

import { useContext, useEffect } from "react";
import { NavigationContext } from "../context/NavigationContext";

export const useNavigations = () => {
  const { navigationLinks, setNavigationLinks } = useContext(NavigationContext);
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

    setNavigationLinks(updatedLinks);
  };

  useEffect(() => {
    console.log('Log de navigationLinks');
  }, [navigationLinks])

  return { navigationLinks, updateNavigationLinks };
}