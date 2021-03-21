import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { user } from '../../model/user';
import { AllData } from '../../model/AllData';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login = false;
  submit: boolean = false;
  msg: boolean = false;
  message;
  userBean = new user;
  allData;
  roles=[{label:'Admin',value:'ADMIN'},{label:'Sponser',value:'Donor'},
  {label:'Student',value:'Student'},
{label: 'Super Admin', value: 'SUPERADMIN'}];
  constructor(public commonService: CommonService, public apiService: ApiService, public router: Router) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'loginid': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'role': new FormControl(null, [Validators.required])
    });
  }
  onSubmit() {
    this.submit = false;
    if (this.loginForm.valid) {
      this.commonService. loginTo(this.userBean.name);
      this.userBean.loginid = this.loginForm.get('loginid').value;
      this.userBean.password = this.loginForm.get('password').value;
      this.userBean.role = this.loginForm.get('role').value;
      console.log(this.loginForm);
      this.commonService.login = true;
      this.apiService.postAPICall(this.userBean, 'login').subscribe(
        data => {
          this.submit=true;
          this.allData = data;
          if (data.status) {
            this.login = true;
            this.msg = true;
            this.message = 'Login successfully';
            setTimeout(() => { this.msg = false; }, 15000);
            window.scrollTo(0, 0);
            this.commonService.login = true;
            this.commonService.loginRole = this.allData.user.role;
            this.commonService.loginDetails = data.user.name;
            this.commonService.allData = data;
            this.commonService. loginTo(this.userBean.name);
            console.log('login as==',this.commonService.loginRole)
            
            if (this.commonService.loginRole != "ADMIN") {
              if(this.commonService.loginRole == "SUPERADMIN") {
                this.commonService.superlogin = true;
                this.router.navigate(['/superAdmin']);
              } else if (this.commonService.loginRole === 'Student') {
                this.commonService.registerAs = 'PROFILE';
                this.router.navigate(['/holderProfile']);
              } else {
                
              this.router.navigate(['/profile']);
               // this.router.navigate(['/donate']);
              }
            } else {
              // this.commonService.superlogin = true;
              this.commonService.profileRole = 'PROFILE'
              this.router.navigate(['/profile']);
            }
          } else {
            this.submit = false;
            this.msg = true;
            this.message = "Login Failed."
            setTimeout(() => { this.msg = false; }, 20000);
          window.scrollTo(0, 0);
          }

        },
        error => {

        }
      );
    } else {
      this.msg = true;
      this.message = "Please fill all fields."
    }

  }

}
