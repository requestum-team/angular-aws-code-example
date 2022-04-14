import { IEntity } from '@models/interfaces/entity.interface';
import { UserRole } from '@models/enums/user-role.enum';

export interface INavItem {
  icon?: string;
  label?: string;
  link?: string;
  roles?: [UserRole];
  clickHandler?: (data?: IEntity) => void;
}
