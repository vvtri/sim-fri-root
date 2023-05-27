export interface IBasePaginationRes<T> {
  items: T[];
  meta: {
    itemCount: number;
    totalItems?: number;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
  };
}
