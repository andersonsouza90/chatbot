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
  step = 1;

  constructor(private cd: ChangeDetectorRef, private homeService : HomeService) { }

  ngOnInit(): void {
    this.retrieveByStep(this.step);
  }

  retrieveAll(): void{
    this.homeService.retrieveAll().subscribe({
      next: r => {
        this.conversation = r;
        console.log(' this.conversation',  this.conversation);
      },
      error: err => console.log('Erro: ' + err)
    });
  }

  retrieveByStep(step: number): void{
    this.homeService.retrieveByStep(step).subscribe({
      next: r => {
        this.conversation.push(r);
      },
      error: err => console.log('Erro: ' + err)
    });
  }

  answerChosen(m: any, a: any){

    if(this.step == -1){
      throw "Menor que 18 anos!";
    }

    //pensar em separar por funções
    if(a.step == 'Y'){
      this.step = 2;
      this.conversation = [];
      this.retrieveByStep(this.step);

    }else if(a.step == 'N'){
      this.showPopup = false;
      this.step = 1;
      this.conversation = [];
      this.retrieveByStep(this.step);

    }else{

      if(m.step >= this.step){
        if(!a.next_step){
          this.step = -1 ;
          this.conversation.push({
                                  question_dsc: a.step,
                                  final_answer: true});
        }else{
          this.step = a.step;
          this.retrieveByStep(this.step);
        }
      }

      if(a.step.indexOf('Suges') !== -1 && this.step != 1000){
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


  //contornar o erro do scrollTop
  ngAfterContentChecked() {
    this.cd.detectChanges();
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


