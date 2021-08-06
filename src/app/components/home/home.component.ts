import { IQuestion } from './../../model/Question.model';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showPopup : boolean = false;
  msg: string = '';
  conversation: any = [];
  conversationList: any = [];
  step = 0;
  stop_chat = false;
  filteredQuestion: IQuestion = {
    id: 0,
    question_dsc: '',
    step: 0
  };

  constructor(private cd: ChangeDetectorRef, private homeService : HomeService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }

  //contornar o erro do scrollTop
  ngAfterContentChecked() {
      this.cd.detectChanges();
  }

  retrieveAll(): void{
    this.conversation = [];
      this.homeService.retrieveAll().subscribe({
          next: r => {
              this.conversationList = r;
              this.step = Number(this.conversationList[0].step);
              this.filterQuestion(this.step);
              this.stop_chat = false;
          },
          error: err => console.log('Erro: ' + err)
      });
  }

  filterQuestion(value: number){
      this.filteredQuestion = this.conversationList.filter((q: IQuestion) => q.step == value)[0];
      this.conversation.push(this.filteredQuestion);
  }

  answerChosen(m: any, a: any){

    if(this.stop_chat){
        throw "Chat bloqueado!";
    }

    if(a.step == 'Y'){
        this.retrieveAll();
        //contornar o erro do scrollTop
        this.cd.detectChanges();

    }else if(a.step == 'N'){
        this.showPopup = false;

    }else{

      if(m.step >= this.step){
          if(!a.next_step){
            this.step = -1 ;
            this.conversation.push({
                                    question_dsc: a.final_answer,
                                    final_answer: true});
        }else{
            this.step = a.step;
            this.filterQuestion(this.step);
        }

        this.stop_chat = a.stop_chat;
      }

      if( a.final_answer.indexOf('Suges') !== -1
          && this.step != this.conversationList.length
          && (m.step >= this.step)){

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
    }

  }

  togglePopup(){
      this.showPopup = !this.showPopup;
      if(this.showPopup) this.retrieveAll();
  }

  sendMessage(){
      this.conversation.push({typeMsg: 'human',
                              class_div: 'out-msg',
                              class_text: 'my-msg',
                              text: this.msg});
      this.msg = '';
  }

  //envia mensagem com enter
  onKeyUp(e: any){
      if(e.keyCode == 13 && this.msg) this.sendMessage();
  }


}


