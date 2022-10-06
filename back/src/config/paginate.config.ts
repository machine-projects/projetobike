import { PaginateDto } from "./dto/paginate.dto"
import { PaginateViewType } from "./types/paginate.config.type";

const pgValueToInt = (filter: PaginateDto) => {
    let page = parseInt(filter.page);
    let limit = parseInt(filter.limit);
    page = page>0? page: 1
     limit = limit>0? limit: 10
    return {page, limit}
} ;
const pgToDefaultKeys = (filter: PaginateDto) => {
    const defaultValue = pgValueToInt(filter)
    const filterToInt: PaginateViewType = defaultValue
    const ormPg = {skip: filterToInt.page -1, take: filterToInt.limit}
    const viewPg = defaultValue;
    return {ormPg, viewPg}
} ;

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