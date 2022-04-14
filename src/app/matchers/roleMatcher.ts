import { Route, UrlMatcher, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { UserRole } from '@models/enums/user-role.enum';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';

export function roleMatcher(usersTableCrud: UsersTableCrudService): UrlMatcher {
  return (segments: UrlSegment[], group: UrlSegmentGroup, { data, path }: Route): UrlMatchResult => {
    const storedRole: UserRole = usersTableCrud?.myRole;

    if (data.roles.find((role: UserRole): boolean => storedRole === role) && !path) {
      return { consumed: [] };
    }
    if (storedRole) {
      console.warn(
        `Stored role hasn't match with any role in array. Stored role is "${storedRole}", but role(s) to pass is "${data.roles}"`
      );
    }

    return null;
  };
}
