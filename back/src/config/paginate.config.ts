import { PaginateDto } from "./dto/paginate.dto"
import { PaginateViewType } from "./types/paginate.config.type";


const pgToDefaultKeys = (filter: PaginateDto) => {
    const defaultValue = filter
    const filterToInt: PaginateViewType = defaultValue
    const ormPg = {skip: filterToInt.page -1, take: filterToInt.limit}
    const viewPg = filter;
    return {ormPg, viewPg}
};



export default pgToDefaultKeys;


export function paginateResponse(data: any, paginate: PaginateViewType) {
    const [result, total]=data;
    const lastPage=Math.ceil(total/paginate.limit);
    const nextPage=paginate.page+1 >lastPage ? null :paginate.page+1;
    const prevPage=paginate.page-1 < 1 ? null :paginate.page-1;
    return {
      data: [...result],
      count: total,
      currentPage: paginate.page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    }
  }