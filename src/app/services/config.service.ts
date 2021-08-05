import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConfigService{

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  retrieveAll(): Observable<[]>{
    return this.httpClient.get<[]>(AppConstants.baseUrl);
  }

  saveQuestion(): void{

  }

  deleteQuestionById(id: number): Observable<any>{
      return this.httpClient.delete<any>(AppConstants.baseUrl+id).pipe(
        map(retorno => retorno),
        catchError(erro => this.exibeErro(erro))
      );
    }

  updateQuestion(question: any): Observable<any>{
    console.log('question', question);
    return this.httpClient.put<any>(AppConstants.baseUrl, question).pipe(
      map (retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  exibeErro(e: any):Observable<any>{
    this.exibirMensagem('Erro!', 'Não foi possível realizar a operação.', 'toast-error');
    return EMPTY;
  }

  exibirMensagem(titulo: string, mensagem: string, tipo: string):void{
    this.toastr.show(mensagem, titulo, {closeButton: true, progressBar: true}, tipo);
  }

}
