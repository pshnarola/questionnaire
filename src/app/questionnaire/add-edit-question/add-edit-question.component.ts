import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DATA_CONSTANTS } from '../../dataConst';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.scss'],
})
export class AddEditQuestionComponent implements OnInit {
  queType: any = [];
  questionForm!: FormGroup;
  types = DATA_CONSTANTS.OPTION_TYPE;
  formType: string = 'Add';
  optionList: any = [];
  isSubmit: boolean = false;
  isShowOptions: boolean = false;
  isEdit: boolean = false;
  editDetails: any = [];
  storageDta: any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.formType = this.route.snapshot.data['name'];
    this.storageDta = JSON.parse(
      localStorage.getItem('questionDetails') || '[]'
    );
    // check if form is in edit mode
    if (this.formType === 'Edit') {
      this.isEdit = true;
      this.editDetails = this.storageDta.filter(
        (data: any) => data.id === this.route.snapshot.params['id']
      );

      if (this.editDetails.length > 0) {
        this.initializeForm(this.editDetails[0]);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.initializeForm();
    }
  }

  ngOnInit(): void {}
  // function for getting controls of form array
  get optionDetails(): FormArray {
    return this.questionForm.controls['options'] as FormArray;
  }

  // function for adding new options
  addOptions(data: any = {}) {
    this.optionList = this.questionForm.get('options') as FormArray;
    this.optionList.push(
      this.fb.group({
        id: [data.id || uuidv4()],
        text: [data.text || '', [Validators.required]],
      })
    );
  }

  // initializing form
  private initializeForm(questionData: any = {}) {
    this.questionForm = this.fb.group({
      id: [questionData.id || uuidv4()],
      createdOn: [questionData.createdOn || null],
      question: [questionData.text || '', [Validators.required]],
      questionType: [
        questionData?.type?.id.toString() || '',
        [Validators.required],
      ],
      options: this.fb.array([]),
      answers: [questionData.answers || null],
      answeredOn: [questionData.answeredOn || null],
    });
    if (questionData?.type?.id == 1 || questionData?.type?.id == 2) {
      questionData.options.forEach((element: any) => {
        this.addOptions(element);
      });
      this.isShowOptions = true;
    }
  }

  // change event of radio buttons
  radioSelect(event: any) {
    this.queType = event;
    if (
      this.questionForm.value.questionType == 1 ||
      this.questionForm.value.questionType == 2
    ) {
      this.isShowOptions = true;

      if (this.questionForm.value['options'].length == 0) {
        this.addOptions();
      }
    } else {
      this.isShowOptions = false;
      this.questionForm.setControl('options', this.fb.array([]));
    }
  }
  // submit event of add/edit form
  onSubmit() {
    this.isSubmit = true;
    if (this.questionForm.status === 'VALID') {
      if (this.isEdit) {
        this.queType =
          this.queType.length > 0 ? this.queType : this.editDetails[0].type;
      }

      let obj = {
        id: this.isEdit ? this.editDetails[0].id : this.questionForm.value.id,
        text: this.questionForm.value.question,
        type: this.queType,
        createdOn: this.isEdit ? this.editDetails[0].createdOn : new Date(),
        answeredOn: this.isEdit ? this.editDetails[0].answeredOn : '',
        options: this.questionForm.value.options,
        answers: this.isEdit ? this.editDetails[0].answers : [],
        isDelete: false,
      };

      let index = _.findIndex(
        this.storageDta,
        (e: any) => {
          return e.id == obj.id;
        },
        0
      );

      if (index > -1) {
        this.storageDta[index] = obj;
        this.toastr.success('Question edited successfully.');
      } else {
        this.storageDta.unshift(obj);
        this.toastr.success('Question created successfully.');
      }
      localStorage.setItem('questionDetails', JSON.stringify(this.storageDta));
      this.router.navigate(['/']);
    } else {
      this.toastr.error('Please check you filled all the required field!');
    }
  }

  // function for removing the options
  removeOptions(index: number) {
    (this.questionForm.get('options') as FormArray).removeAt(index);
  }
}
