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

  constructor(private questionService: QuestionService, private route: Router) { }

  question: IQuestion = {
    question_dsc: '',
    step: 0
  };

  ngOnInit(): void {
  }

  saveQuestion(): void{
    this.questionService.saveQuestion(this.question).subscribe(retorno =>{
      this.questionService.exibirMensagem(
        'SISTEMA',
        `${this.question.question_dsc} foi gravado com sucesso.`,
        'toast-success'
      );

      this.route.navigate(['/config']);

    });
  }

}
