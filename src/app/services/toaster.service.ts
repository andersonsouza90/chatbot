import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToasterService{

  constructor(private toastr: ToastrService) { }

  exibirMensagem(titulo: string, mensagem: string, tipo: string):void{
    this.toastr.show(mensagem, titulo, {closeButton: true, progressBar: true}, tipo);
  }

  exibeErro(e: any):Observable<any>{
    this.exibirMensagem('Erro!', 'Não foi possível realizar a operação.', 'toast-error');
    return EMPTY;
  }


}
