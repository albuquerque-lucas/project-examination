import { NavigationLink } from "../types/responseTypes";

export function updateLinks(links: NavigationLink[] | null): NavigationLink[] | null {
  if (!links) return null;

  return links.map((link: NavigationLink, index: number, array: NavigationLink[]) => {
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
}