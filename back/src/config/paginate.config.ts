import { PaginateDto } from "./dto/paginate.dto"
import { PaginateType } from "./types/paginate.config.type";

const pgValueToInt = (filter: PaginateDto) => {
    let page = parseInt(filter.page);
    let limit = parseInt(filter.limit);
    page = page>0? page-1: 0
     limit = limit>0? limit: 10
    return {page, limit}
} ;
const pgToDefaultKeys = (filter: PaginateDto) => {
    const defaultValue = pgValueToInt(filter)
    const filterToInt: PaginateType = defaultValue
    return {skip: filterToInt.page, take: filterToInt.limit}
} ;

export default pgToDefaultKeys;