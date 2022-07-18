import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService, ToastrService } from 'projects/tools/src/public-api';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembreService extends RestService {
  protected resource = 'membres';
  protected url = environment.apiUrl;

  constructor(protected http: HttpClient, protected toastrService: ToastrService) {
    super(http, toastrService);
  }
}
