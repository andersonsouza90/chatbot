import { AppConstants } from './../app-constants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService{

  constructor(private httpClient: HttpClient) { }

  retrieveAll(): Observable<[]>{ //Observable empacota o response, é assincrono
    return this.httpClient.get<[]>(AppConstants.baseUrl);
  }

  retrieveByStep(step: number): Observable<[]>{ //Observable empacota o response, é assincrono
    return this.httpClient.get<any>(AppConstants.baseUrl+'/byStep/'+step);
  }

}
