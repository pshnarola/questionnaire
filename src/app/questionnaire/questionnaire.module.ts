import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuestionManagementComponent,
    QuestionListComponent,
    AddEditQuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class QuestionnaireModule { }
