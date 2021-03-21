import { Component, OnChanges, OnInit } from '@angular/core';
import { Scholarship } from 'src/app/model/Scholarship';
import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnChanges {

  studentList = [];
  yearList =[];
  year;

  constructor(public commonService: CommonService,
     public apiService: ApiService) { }

  ngOnInit(): void {
    this.yearList = [
      { year: 2020 },
      { year: 2021 },
      { year: 2022 },
      { year: 2023 },
      { year: 2024 },
      { year: 2025 }
    ]
    console.log(this.year)
    
  }

  ngOnChanges() {
    console.log('yera', this.year)
  }

  selectyear() {
    console.log('yera', this.year)
    let obj = new Scholarship();
    obj.year = this.year;
    this.apiService.postAPICall(obj,'studentListByYear').subscribe(data => {
      this.studentList = data;
    })
  }

}
