export type PaginateViewType = {
    page: number;
    limit: number;
  };

  
export type PaginateOrmType = {
    skip: number;
    take: number;
  };

export type PaginateType = {
  paginateViewType: PaginateViewType
  paginateOrmType: PaginateOrmType
}