import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllData } from 'src/app/model/AllData';
import { user } from 'src/app/model/user';
import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';


@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  searchByForm=FormGroup
  adminList=[];
  list: Array<user> = [];
  msg = false;
  message;
  role;
  userId;

  roles=[{label:'Admin',value:'ADMIN'},{label:'Sponser',value:'Donor'},
  {label:'Student',value:'Student'}];
  userBean = new user;

  constructor(public commonService: CommonService,
    public apiService: ApiService,public router: Router) { }

  ngOnInit(): void {
    let obj = new user();
    this.apiService.postAPICall(obj,'awaitingApprovlList').subscribe(data => {
      this.adminList = data;
      this.adminList.forEach(ele => {
        if (ele.status) {
          ele['checked'] = true;
          ele['active'] = 'Active';
        } else {
          ele['checked'] = false;
          ele['active'] = 'InActive';
        }
      })
    })

  }

  addList(event, data) {
    console.log('event', event, data);
    if(data.checked) {
      this.list.push(data);
    } else {
      let i = this.list.indexOf(data);
      console.log('idx==', i)
      if (i != -1) {
        this.list.splice(i, 1);
      }
    }
    console.log('list---', this.list)
  }

  onSubmit() {
    console.log('list===', this.list);
    this.list = [...new Set(this.list)];
    let obj = new AllData();
    obj.ids = this.list;
    this.apiService.postAPICall(obj,'approveAdminId').subscribe(res => {
      this.msg = true;
      this.message = 'Admins activated successfully';
      setTimeout(() => { this.msg = false; }, 20000);
    },
    (error) => {
      this.msg = true;
      this.message = 'Admin activation Failed';
      setTimeout(() => { this.msg = false; }, 20000);
    })
  }
  search() {
    console.log('info==', this.role, this.userId);
    let searchBean = new user();
    searchBean.role = this.role;
    searchBean.loginid = this.userId;
    this.apiService.postAPICall(searchBean,'awaitingApprovlList').subscribe(response => {
      this.adminList = response;
      this.adminList.forEach(ele => {
        if (ele.status) {
          ele['checked'] = true;
          ele['active'] = 'Active';
        } else {
          ele['checked'] = false;
          ele['active'] = 'InActive';
        }
      })
    })
  }

  onEdit(data) {
    console.log('data==', data);
    this.apiService.postAPICall(data,'findByAdmin ').subscribe(resp => {
      this.commonService.allData = resp;
      if (data.role === 'Student') {
        this.commonService.registerAs = 'PROFILE';
        this.router.navigate(['/holderProfile']);
      } else {
        this.commonService.profileRole = 'PROFILE'
        this.router.navigate(['/profile']);
      }
    })
  }

}
