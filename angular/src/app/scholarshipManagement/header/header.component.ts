import { Component, OnInit, ViewChild } from '@angular/core';
import {CommonService} from '../../service/common.service';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public commonService:CommonService, public router: Router) { }
  contactus=false;
  faq=false;
  scholarshipholder=false;
  donar=false;
  donate=false;
  register=false;
  login=false;
  profile=false;
  logout=false;
  activeState;
  loginDetails = 'Welcome';
  @ViewChild('donor', { static: false }) donor: RegistrationComponent;
  @ViewChild('admin', { static: false }) admin: RegistrationComponent;

  ngOnInit(): void {
    let data= this.commonService.allData;
    console.log('data------', this.commonService.loginDetails )
    this.loginDetails = this.commonService.loginDetails ;
  }
  setActive(flag){
   if(flag=='contactus'){
    this.contactus=true;
    this.faq=false;
    this.scholarshipholder=false;
    this.donar=false;
    this.donate=false;
    this.register=false;
    this.login=false;
    this.profile=false;
    this.logout=false;
    this.activeState="contactus";
   }else if(flag=='faq'){
    this.contactus=false;
    this.faq=true;
    this.scholarshipholder=false;
    this.donar=false;
    this.donate=false;
    this.register=false;
    this.login=true;
    this.profile=false;
    this.logout=false;
    this.activeState="faq";
   }else if(flag=='student'){
    this.contactus=false;
    this.faq=false;
    this.scholarshipholder=true;
    this.donar=false;
    this.donate=false;
    this.register=false;
    this.login=false;
    this.profile=false;
    this.logout=false;
    this.activeState="student";
   }else if(flag=='sponsor'){
    this.contactus=false;
    this.faq=false;
    this.scholarshipholder=false;
    this.donar=true;
    this.donate=false;
    this.register=false;
    this.login=false;
    this.profile=false;
    this.logout=false;
    this.activeState="sponsor";
   }else if(flag=='donate'){
    this.contactus=false;
    this.faq=false;
    this.scholarshipholder=false;
    this.donar=false;
    this.donate=true;
    this.register=false;
    this.login=false;
    this.profile=false;
    this.logout=false;
    this.activeState="donate";
   }else if(flag=='register'){
    this.contactus=false;
    this.faq=false;
    this.scholarshipholder=false;
    this.donar=false;
    this.donate=false;
    this.register=true;
    this.login=false;
    this.profile=false;
    this.logout=false;
    this.activeState="register";
   }else if(flag=='login'){
    this.contactus=false;
    this.faq=false;
    this.scholarshipholder=false;
    this.donar=false;
    this.donate=false;
    this.register=false;
    this.login=true;
    this.profile=false;
    this.logout=false;
    this.activeState="login";
   }else if(flag=='profile'){
    this.contactus=false;
    this.faq=false;
    this.scholarshipholder=false;
    this.donar=false;
    this.donate=false;
    this.register=false;
    this.login=false;
    this.profile=true;
    this.logout=false;
    this.activeState="profile";
   }else if(flag=='logout'){
    this.contactus=false;
    this.faq=false;
    this.scholarshipholder=false;
    this.donar=false;
    this.donate=false;
    this.register=false;
    this.login=false;
    this.profile=false;
    this.logout=true;
    this.activeState="login";
    this.logoutt();
   } else if (flag === 'AdminList') {
     this.activeState = 'AdminList';
   } 
   else if (flag === 'addUser') {
    this.activeState = 'addUser';
  }
   else if (flag === 'STUDENTLIST') {
     this.activeState = 'STUDENTLIST';
   }
   else if (flag === 'DONORLIST') {
    this.activeState = 'DONORLIST';
  }
  }
  checkActive(flag){
    if(flag==this.activeState){
      return 'active';
    }else{
      return '';
    }
  }
  sendData(flag){
    console.log('inside this', flag);
    if(flag === 'STUDENTLIST') {
      console.log('inside this student list')
      this.router.navigate(['/studentlist']);
    }
    if(flag === 'DONORLIST') {
      console.log('inside this student list')
      this.router.navigate(['/donorList']);
    }
    if (flag === 'AdminList') {
      console.log(this.commonService.loginRole, this.commonService.registerAs);
      this.router.navigate(['/superAdmin']);
    }

    if (flag === 'addUser') {
      console.log(this.commonService.loginRole, this.commonService.registerAs);
      this.router.navigate(['/addUser']);
    }
    if(flag === 'Donor') {
      this.commonService.registerAs= 'Donor';
      this.commonService.loginRole = 'Donor';
      this.router.navigate(['/register']);
    } else if(flag === 'ADMIN') {
      this.commonService.registerAs='ADMIN';
      this.commonService.loginRole = 'ADMIN';
      this.router.navigate(['/register']);
    } else if(flag === 'STUDENT') {
      this.commonService.loginRole = 'STUDENT';
      this.commonService.registerAs = 'Student';
    } 
    if(flag!='PROFILE'){
      this.commonService.registerAs=flag;
    }else{
     // this.commonService.registerAs=this.commonService.allData.user.role;
     console.log('flag===', flag, this.commonService.loginRole) 
      if(this.commonService.loginRole =='Student'){
        this.commonService.registerAs = 'PROFILE';
        this.router.navigate(['/holderProfile']);
      } else{
        this.commonService.profileRole = 'PROFILE'
        this.router.navigate(['/profile']);
      }
    }
  }
  logoutt(){
    this.commonService.registerAs=null;
    this.commonService.allData=null;
    this.commonService.login=false;
    this.commonService.loginRole=null;
    this.commonService.registerAs=null;
    this.commonService.superlogin = false;
    confirm("Do you want to logout?");
    this.router.navigate(['/login']);
    this.commonService.logout();
  }
}
