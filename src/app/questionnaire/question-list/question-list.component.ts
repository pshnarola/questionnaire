import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  manageDetails: any = [];
  unAnswered: any = [];
  answered: any = [];
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    // getting data from local storgae
    this.manageDetails = JSON.parse(
      localStorage.getItem('questionDetails') || '[]'
    );
  }

  ngOnInit(): void {
    this.differArray();
  }

  differArray() {
    // make 2 different array for separating answered and unanswered questions
    this.unAnswered = [];
    this.answered = [];
    this.manageDetails.forEach((e: any) => {
      if (e.answers.length == 0) {
        e.isError = true;
        this.unAnswered.push(e);
      } else {
        this.answered.push(e);
        this.sortArray(this.answered);
      }
    });
  }

  sortArray(arrayDetails: any) {
    let arrs = arrayDetails.sort(function (a: any, b: any) {
      var dateA = new Date(a.answeredOn).getTime();
      var dateB = new Date(b.answeredOn).getTime();
      return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
    });
    console.log('arrs =>', arrs);
  }

  // common function for finding index
  findIndex(arrayName: any, matchId: any) {
    let index = _.findIndex(
      arrayName,
      (e: any) => {
        return e.id == matchId.id;
      },
      0
    );
    return index;
  }

  // function for save the answers to localstorage
  saveAns(details: any) {
    details.answeredOn = new Date();
    this.saveToStorage(details);
  }

  saveToStorage(details: any) {
    let index = this.findIndex(this.manageDetails, details);
    if (index > -1) {
      this.manageDetails[index] = details;
      localStorage.setItem(
        'questionDetails',
        JSON.stringify(this.manageDetails)
      );
      this.differArray();
    }
  }

  // function for change event of checkbox
  checkSelect(event: any, selectedOption: any, details: any) {
    console.log('event', event);
    if (event.target.checked) {
      details.answers.push(selectedOption);
    } else {
      let index = this.findIndex(details.answers, selectedOption);
      details.answers.splice(index, 1);
    }
  }

  // function for rollback the answer
  rollbackFN(details: any) {
    details.answers = [];
    details.answeredOn = '';
    this.saveToStorage(details);
  }
}
