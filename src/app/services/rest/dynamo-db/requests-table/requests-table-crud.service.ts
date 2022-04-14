import { Injectable } from '@angular/core';
import { Request } from '@models/classes/request.model';
import { ClassConstructor } from 'class-transformer';
import { IServicesConfig } from '@services/http/http.service';
import { Observable } from 'rxjs';
import { RequestStatus } from '@models/enums/request-status.enum';
import { map } from 'rxjs/operators';
import { meRequests } from '@misc/mock-data/api/requests';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsTableCrudService {
  protected MODEL: ClassConstructor<Request>;

  scanByMember(): Observable<Request[]> {
    return of(meRequests);
  }
}
