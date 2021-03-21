import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {CommonService} from '../../service/common.service';
import {ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { user} from '../../model/user';
import { AllData} from '../../model/AllData';
import { Admin } from 'src/app/model/Admin';
import { DomSanitizer } from '@angular/platform-browser';
import { Sponsor } from 'src/app/model/Sponsor';
import { Scholarship } from 'src/app/model/Scholarship';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AddUserComponent implements OnInit {
registerAs;
registerForm:FormGroup;
  login=false;
 submit:boolean=false;
  msg:boolean=false;
  message;
  userBean=new user;
  allData;
  thumbnail;
  studentList = [];
  
  users;
  roles=[{label:'Admin',value:'ADMIN'},{label:'Sponser',value:'Donor'},
  {label:'Student',value:'Student'}];
  submitUpdate = 'Submit';
  updateData; 
  students;
  
  constructor(private sanitizer: DomSanitizer,public commonService:CommonService,public apiService:ApiService,public router:Router,    private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    console.log('inside donor', this.commonService.registerAs, this.commonService.profileRole )
    this.registerAs = this.commonService.registerAs;
    this.registerForm = new FormGroup({
      
      'role':new FormControl(null,[Validators.required]),
     
      'loginid': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      
      
    });
    
  

   
  }
  clear() {
    this.registerForm.reset();
    
  }

  onSubmit(){
    this.submit=false;
    if(this.registerForm.valid){
      this.submit=true;
      this.allData= new AllData;
      this.allData.user= new user;
      this.allData.user.role=this.commonService.loginRole;
     
      this.allData.user.role=this.registerForm.get('role').value;
      
      this.allData.user.loginid=this.registerForm.get('loginid').value;
      this.allData.user.password=this.registerForm.get('password').value;
      
    
      console.log(this.submitUpdate, this.updateData)
     
      var url='saveMini';
      console.log(this.registerForm); 
      this.apiService.postAPICall(this.allData,url).subscribe(
        data => {
          this.allData=data;
          console.log(data)
          if(data.status){
            this.submit=false;
            this.msg = true;
            this.message = data.msg;
            setTimeout(() => { this.msg = false; }, 2000);
            //this.router.navigate(['/addUser']);
            this.registerForm.reset();
            //this.clear();
          }else{
            this.msg=true;
            this.message=data.msg;
            setTimeout(() => { this.msg = false; }, 20000);
          }
          
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
  
}





}
