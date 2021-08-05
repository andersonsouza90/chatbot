import { AnswerService } from './../../services/answer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { IAnswer } from 'src/app/model/Answer.model';

@Component({
  selector: 'app-record-answer',
  templateUrl: './record-answer.component.html',
  styleUrls: ['./record-answer.component.css']
})
export class RecordAnswerComponent implements OnInit {

  constructor(private answerService: AnswerService, private route: Router,
             private activatedRouter: ActivatedRoute,
             private questionService: QuestionService) { }

  question: any = '';
  answer: IAnswer = {
    answer_dsc: '',
    next_step: false,
    stop_chat: false,
    step: 0,
    final_answer : ''
  }

  ngOnInit(): void {
    const id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.retrieveQuestionById(id);
  }

  retrieveQuestionById(id: number): void{
    this.questionService.retrieveById(id).subscribe({
      next: r => {
        this.question = r;
      },
      error: err => console.log('Erro: ' + err)
    });
  }

  saveAnswer(): void{

    if(!this.answer.step && !this.answer.stop_chat){
      this.answer.final_answer = 'Sugestão: ' + this.answer.final_answer;
    }

    this.question.answers.push(this.answer);

    this.questionService.saveQuestion(this.question).subscribe(retorno =>{
      this.questionService.exibirMensagem(
        'SISTEMA',
        `${this.question.question_dsc} foi gravado com sucesso.`,
        'toast-success'
      );
     this.route.navigate(['/config/list-answer/'+this.question.id]);

    });
  }

}
