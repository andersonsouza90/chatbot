import { IQuestion } from './../../model/Question.model';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { IAnswer } from 'src/app/model/Answer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showPopup : boolean = false;
  msg: string = 'Escolha uma opção.';
  conversation: any = [];
  conversationList: any = [];
  step = 0;
  stop_chat = false;
  showChatBtn = true;
  permitRequest = true;
  filteredQuestion: IQuestion = {
    id: 0,
    question_dsc: '',
    step: 0
  };

  constructor(private cd: ChangeDetectorRef, private homeService : HomeService) { }

  ngOnInit(): void {

  }

  //contornar o erro do scrollTop
  ngAfterContentChecked() {
      this.cd.detectChanges();
  }

  retrieveAll(): void{
      if(this.permitRequest){
        this.permitRequest = false;
          this.conversation = [];
          this.conversationList = [];
          this.homeService.retrieveAll().subscribe({
              next: r => {
                  this.conversationList = r;
                  this.step = Number(this.conversationList[0].step);
                  this.filterQuestion(this.step);
                  this.stop_chat = false;
                  this.permitRequest = true;
              },
              error: err => console.log('Erro: ' + err)
          });
      }
  }

  answerChosen(m: any, a: any, e: any){
      this.disableAnswers(m.id, e);

      if(this.stop_chat) throw "Chat bloqueado!";

      if(a.step == 'Y'){
          this.retrieveAll();
          this.cd.detectChanges(); //contornar o erro do scrollTop

      }else if(a.step == 'N'){
          this.showPopup = false;
          this.showChatBtn = true;
      }else{

          if(m.step = this.step){
              if(!a.next_step){
                this.sendFinalAnswer(a);
              }else{
                  this.step = a.step;
                  this.filterQuestion(this.step);
              }
              this.stop_chat = a.stop_chat;
          }

          if(!a.next_step && !this.stop_chat){
              this.sendSuggestion();
          }

      }
  }

  //start functions
  sendSuggestion(){
      this.step = this.conversationList.length + 1;
      this.conversation.push({
          question_dsc: "Deseja refazer as questões?",
          final_answer: false,
          answers : [
            {answer_dsc: "Sim", next_step: false, step: "Y"},
            {answer_dsc: "Não", next_step: false, step: "N"}
          ]
        });
  }

  fnShowChatBtn(){
      this.showPopup = !this.showPopup;
      this.showChatBtn = !this.showChatBtn;
      if(this.showPopup) {
          this.retrieveAll();
      }
  }

  fnCloseChatBtn(){
    this.showPopup = false;
    if(!this.showPopup) {
        this.showChatBtn = true;
    }
  }

  sendFinalAnswer(a: IAnswer){
      this.step = -1 ;
      this.conversation.push({
                question_dsc: a.final_answer,
                final_answer: true});
  };

  filterQuestion(value: number){
      this.filteredQuestion = this.conversationList.filter((q: IQuestion) => q.step == value)[0];
      this.conversation.push(this.filteredQuestion);
  }

  disableAnswers(id:number, e: any){
      e.target.classList.add('btn-answer-chosen');
      const elementHtml = document.getElementsByClassName('answer-'+id);
      for (var i = 0; i < elementHtml.length; i++) {
        elementHtml[i].setAttribute('disabled', 'disabled')
      }
  }

  //end functions

}


