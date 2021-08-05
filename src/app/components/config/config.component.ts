import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  questions: any = [];
  filteredQuestion: any = [];

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }

  retrieveAll(): void{
    this.configService.retrieveAll().subscribe({
      next: r => {
        this.questions = r;
      },
      error: err => console.log('Erro: ' + err)
    });
  }

  deleteQuestionById(question:any):void{
    this.configService.deleteQuestionById(question.id).subscribe(() => {
      this.configService.exibirMensagem('SISTEMA', `${question.question_dsc} foi excluido com sucesso`, 'toast-success');
      this.retrieveAll();
    });
  }

  updateQuestion(q: any): void{
    console.log(q);
    this.configService.updateQuestion(q).subscribe(retorno =>{
        this.configService.exibirMensagem(
          'SISTEMA',
          'Atualizado com sucesso.',
          'toast-success'
        );
        this.retrieveAll();

      });
  }

  updateArray(question: any, e : any):void{

    //if(e.target.value == '')throw "Valor não pode ser vazio";

    if(e.target.name == 'step'){
      question.step = Number(e.target.value);
    }else{
      question.question_dsc = e.target.value;
    }
  }

}
