import { ListAnswerComponent } from './components/list-answer/list-answer.component';
import { RecordQuestionComponent } from './components/record-question/record-question.component';
import { ConfigComponent } from './components/config/config.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordAnswerComponent } from './components/record-answer/record-answer.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'config', component:ConfigComponent},
  {path: 'config/record-question', component:RecordQuestionComponent},
  {path: 'config/list-answer/:id', component:ListAnswerComponent},
  {path: 'config/list-answer/record-answer/:id', component:RecordAnswerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
