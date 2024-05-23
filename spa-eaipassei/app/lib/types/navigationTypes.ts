import { NavigationLink } from "./entityContextTypes";

export interface NavigationButtonsProps {
  links: NavigationLink[] | null;
}

export interface DirectedNavigationProps {
  links: NavigationLink[] | null;
  id: number | null;
}