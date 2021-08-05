import { IQuestion } from './../../model/Question.model';
import { IAnswer } from './../../model/Answer.model';
import { AnswerService } from './../../services/answer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-list-answer',
  templateUrl: './list-answer.component.html',
  styleUrls: ['./list-answer.component.css']
})
export class ListAnswerComponent implements OnInit {

  constructor(private answerService: AnswerService, private activatedRouter: ActivatedRoute,
             private questionService: QuestionService,
             private toaster: ToasterService) { }

  question: any = '';
  answers: IAnswer[] = [];

  ngOnInit(): void {
    const id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.retrieveAllById(id);
  }

  deleteAnswerById(a: IAnswer): void{
    this.answerService.deleteAnswerById(Number(a.id)).subscribe(() => {
      this.toaster.exibirMensagem('SISTEMA', 'Excluido com sucesso', 'toast-success');
      this.retrieveAllById(Number(this.activatedRouter.snapshot.paramMap.get('id')));
    });
  }

  retrieveAllById(id: number): void{
    this.questionService.retrieveById(id).subscribe({
      next: r => {
        this.question = r;
        this.answers = this.question.answers
      },
      error: err => console.log('Erro: ' + err)
    });
  }


}
