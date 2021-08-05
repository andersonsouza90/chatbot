import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ToasterService } from './toaster.service';
import { IAnswer } from '../model/Answer.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService{

  constructor(private httpClient: HttpClient, private toastr: ToasterService) { }

  retrieveAllById(id : number): Observable<IAnswer[]>{
    return this.httpClient.get<[]>(AppConstants.baseUrl+'/byId/'+id);
  }

  deleteAnswerById(id: number): Observable<any>{
    return this.httpClient.delete<any>(AppConstants.baseUrlAnswer+id).pipe(
      map(retorno => retorno),
      catchError(erro => this.toastr.exibeErro(erro))
    );
  }

}
