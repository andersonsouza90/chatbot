import { IQuestion } from './../../model/Question.model';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-question',
  templateUrl: './record-question.component.html',
  styleUrls: ['./record-question.component.css']
})
export class RecordQuestionComponent implements OnInit {

  constructor(private questionService: QuestionService,
              private route: Router) { }

  question: IQuestion = {
    question_dsc: '',
    step: 0
  };
  conversationList: any = [];

  ngOnInit(): void {
    this.retrieveAll();
  }

  saveQuestion(): void{
      this.questionService.saveQuestion(this.question).subscribe(retorno =>{
          this.questionService.exibirMensagem(
            'SISTEMA',
            'Gravado com sucesso.',
            'toast-success'
          );

          this.route.navigate(['/config']);
      });
  }

  retrieveAll(): void{
      this.questionService.retrieveAll().subscribe({
          next: r => {
              this.conversationList = r;
              this.question.step = this.conversationList.length + 1;
          },
          error: err => console.log('Erro: ' + err)
      });
  }


}
