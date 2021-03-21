import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {Contact} from '../../model/Contact';
import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm:FormGroup;
  contactBean=new Contact;
  submit:boolean=false;
  msg:boolean=false;
  message;
  loginDetails;

  constructor(public apiService:ApiService, public commonService: CommonService) { 
    if (this.commonService.loginDetails != undefined) {
      this.loginDetails = 'Welcome ' + this.commonService.loginDetails;
    }
  }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      'name':new FormControl(null,[Validators.required]),
      'location':new FormControl(null),
      'contactnumber':new FormControl(null),
      'query':new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required])
    });
  }
  onSubmit(){
    console.log(this.contactForm);
    this.submit=false;
   if(this.contactForm.valid){
    this.contactBean.name=this.contactForm.get('name').value;
    this.contactBean.location=this.contactForm.get('location').value;
    this.contactBean.contactnumber=this.contactForm.get('contactnumber').value;
    this.contactBean.query=this.contactForm.get('query').value;
    this.contactBean.email = this.contactForm.get('email').value;
    console.log(this.contactForm);
    const url='saveContact';
    this.apiService.postAPICall(this.contactBean,'saveContact').subscribe(
      data => {
        this.msg=true;
        this.message="Query Submitted Successfully."
      },
      error=>{

      }
    );
   }else{
     this.msg=true;
     this.message="Please fill all fields."
   }
  }
  cancel(){
    this.contactForm.reset();
    this.contactBean=new Contact;
    this.msg=false;
    this.message='';
  }
}
