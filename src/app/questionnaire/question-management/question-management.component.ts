import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent implements OnInit {

  deleteID: any = [];
  manageDetails: any = [];
  constructor(private toastr: ToastrService) {
    this.manageDetails = JSON.parse(
      localStorage.getItem('questionDetails') ||  '[]'
    );
  }
  ngOnInit(): void {}

  onDelete(id: any) {
    this.deleteID = id;
  }

  confirmDelete() {
    this.manageDetails.map((element: any, index: number) => {
      if (element.id == this.deleteID) {
        this.manageDetails.splice(index, 1);
      }
    });
    this.toastr.success('Record successfully deleted!');
    localStorage.setItem('questionDetails', JSON.stringify(this.manageDetails));
  }
}
