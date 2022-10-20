import pgToDefaultKeys from "src/config/paginate.config"
import { QueryParamsDto } from "../dto/params.dto";
import { Like } from "typeorm"

export const querysParamHelper = (filter: QueryParamsDto) => {
    const paginate = pgToDefaultKeys(filter);
    const where = {};
    filter.city ? where['city'] =  filter.city:  null
    typeof(filter.isFeatured) == 'boolean' ? where['isFeatured'] =  filter.isFeatured:  null
    filter.title ? where['title'] =  Like(`%${filter.title}%`):  null
    filter.state ? where['state'] =  filter.state:  null

    return {paginate, where}
}