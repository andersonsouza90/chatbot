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

  constructor(private cd: ChangeDetectorRef, private homeService : HomeService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }

  //contornar o erro do scrollTop
  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  retrieveAll(): void{
    this.homeService.retrieveAll().subscribe({
      next: r => {
        this.conversationList = r;
        this.step = Number(this.conversationList[0].step);
        this.retrieveByStep(this.step);
      },
      error: err => console.log('Erro: ' + err)
    });
  }

  retrieveByStep(step: number): void{
    this.homeService.retrieveByStep(step).subscribe({
      next: r => {
        if(r != null) this.conversation.push(r);
        console.log(this.conversation, step);
      },
      error: err => console.log('Erro: ' + err)
    });
  }

  answerChosen(m: any, a: any){

    if(this.stop_chat){
      throw "Chat bloqueado!";
    }

    if(a.step == 'Y'){
      this.conversation = [];
      this.retrieveAll();

    }else if(a.step == 'N'){
      this.showPopup = false;
      this.conversation = [];
      this.retrieveAll();

    }else{

      if(m.step >= this.step){
        if(!a.next_step){
          this.step = -1 ;
          this.conversation.push({
                                  question_dsc: a.final_answer,
                                  final_answer: true});
        }else{
          this.step = a.step;
          this.retrieveByStep(this.step);
        }

        this.stop_chat = a.stop_chat;
      }

      if(a.final_answer.indexOf('Suges') !== -1 && this.step != 1000 && (m.step >= this.step)){
        this.step = 1000 ;
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


