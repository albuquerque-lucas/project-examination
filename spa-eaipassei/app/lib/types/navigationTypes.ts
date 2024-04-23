export type NavigationLink = {
  label: string;
  url: string;
  active: boolean | undefined;
}

export type NavigationContextType = {
  navigationLinks: NavigationLink[];
  setNavigationLinks: (navigationLinks: NavigationLink[]) => void;
}