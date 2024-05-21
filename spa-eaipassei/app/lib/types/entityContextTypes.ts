import { FlashMessage } from "./messageTypes";

export type PaginatedAPIResponse<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: NavigationLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export type NavigationLink = {
  url: string;
  label: string;
  active: boolean;
}

export type FilterList = {
  filter?: string | null;
  value?: string | null;
}

type SetFilterMessage = (value: string | null) => void;

export type EntityContext<Entity, EntityQueryParams> = {
  data: PaginatedAPIResponse<Entity> | null;
  setData: (data: PaginatedAPIResponse<Entity> | null) => void;
  navLinks: NavigationLink[] | null;
  setNavLinks: (navLinks: NavigationLink[] | null) => void;
  deletionMode: boolean;
  setDeletionMode: (deletionMode: boolean) => void;
  entityToDelete: number | null;
  setEntityToDelete: (entityToDelete: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  selectedOrder: string | null;
  setSelectedOrder: (selectedOrder: string) => void;
  filterList: FilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<FilterList[]>>;
  filterMessage: string | null;
  setFilterMessage: (filterMessage: string) => void;
  queryParams: EntityQueryParams;
  setQueryParams: (filterList: FilterList[]) => void;
  flashMessage: FlashMessage | null;
  setFlashMessage: (flashMessage: FlashMessage | null) => void;
  dataLoaded: boolean;
  setDataLoaded: (dataLoaded: boolean) => void;
}

export const defaultValue = {
  data: null,
  setData: () => {},
  navLinks: null,
  setNavLinks: () => {},
  deletionMode: false,
  setDeletionMode: () => {},
  entityToDelete: null,
  setEntityToDelete: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  selectedOrder: 'asc',
  setSelectedOrder: () => {},
  filterList: [] as FilterList[],
  setFilterList: () => {},
  filterMessage: null,
  setFilterMessage: (() => {}) as SetFilterMessage,
  queryParams: {} as Record<string, any>,
  setQueryParams: () => {},
  flashMessage: null,
  setFlashMessage: () => {},
  dataLoaded: false,
  setDataLoaded: () => {},
}