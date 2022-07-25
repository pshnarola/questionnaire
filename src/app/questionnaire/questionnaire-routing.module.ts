import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionManagementComponent } from './question-management/question-management.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionManagementComponent,
  },

  {
    path: 'add_questions',
    component: AddEditQuestionComponent,
    data:{
      name:"Add"
    }
  },

  {
    path: 'edit_questions/:id',
    component: AddEditQuestionComponent,
    data:{
      name:"Edit"
    }
  },

  {
    path: 'list_questions',
    component: QuestionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }
