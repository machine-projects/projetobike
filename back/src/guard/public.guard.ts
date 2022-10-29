import { Role } from './role.enum';
import { Roles } from './roles.decorator';

export const Public = () => Roles(Role.Public);