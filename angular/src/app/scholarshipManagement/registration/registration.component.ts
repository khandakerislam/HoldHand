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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
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
  submitUpdate = 'Submit';
  updateData; 
  students;
  uploadedLogoFiles = []
  constructor(private sanitizer: DomSanitizer,public commonService:CommonService,public apiService:ApiService,public router:Router,    private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    console.log('inside donor', this.commonService.registerAs, this.commonService.profileRole )
    this.registerAs = this.commonService.registerAs;
    this.registerForm = new FormGroup({
      'name':new FormControl(null,[Validators.required]),
      'nickName':new FormControl(null,[Validators.required]),
      'loginid': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'contactNumber':new FormControl(null,[Validators.required]),
      'student':new FormControl(null),
      'country':new FormControl(null,[Validators.required]),
      'file':new FormControl(null),
    });
    this.getStudentList();
    //paste the filecode here
    let objectURL = 'data:image/jpeg;base64,' + '';
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  clear() {
    this.registerForm.patchValue({
      name: '',
      nickName: '',
      loginid: '',
      password: '',
      contactNumber: '',
      student: '',
      country: ''
    })
    this.imageUrl = '';
  }

  onSubmit(){
    this.submit=false;
    if(this.registerForm.valid){
      //this.submit=true;
      this.allData= new AllData;
      this.allData.user= new user;
      this.allData.user.role=this.commonService.loginRole;
      this.allData.user.name=this.registerForm.get('name').value;
      this.allData.user.nickName=this.registerForm.get('nickName').value;
      this.allData.user.loginid=this.registerForm.get('loginid').value;
      this.allData.user.password=this.registerForm.get('password').value;
      this.allData.user.contactNumber=this.registerForm.get('contactNumber').value;
      this.allData.user.country=this.registerForm.get('country').value;
      console.log(this.submitUpdate, this.updateData)
      if(this.submitUpdate === 'Update') {
        if(this.updateData.user !== null) {
          this.allData.user.userId = this.updateData.user.userId
        }
      }
      var url='';
      console.log(this.registerAs, this.allData)
      let list = [];
      list = this.registerForm.get('student').value;
      console.log('listtt---',  list)
      this.studentList.forEach(val => {
        list.forEach(element => {
          if(element === val.userId) {
            let scholar = new Scholarship();
            scholar.userId = val.userId;
            if (this.submitUpdate === 'Update') {
              console.log('inside', this.submitUpdate, this.updateData)
              this.updateData.scholarshipList.forEach(element1 => {
                if(element1.userId == element) {
                  console.log('up==',element1.scholarshipId)
                  scholar.scholarshipId = element1.scholarshipId;
                  scholar.studentId = element1.studentId;
                }
              });
            }
            this.allData.scholarshipList.push(scholar);
            this.allData.scholarshipList  = [...new Set(this.allData.scholarshipList)];
          }
        });
      })
      if(this.allData.user.role=='ADMIN' || this.allData.user.role=='SUPERADMIN'){
        if(this.submitUpdate === 'Update') {
          url = 'updateAdmin'
        } else {
          url = 'saveAdmin';
        }
      }else if(this.allData.user.role == "Donor"){
        console.log('inside sponse')
        this.allData.sponser = new Sponsor();
        this.allData.sponser.studentId=this.registerForm.get('student').value;
        this.allData.sponser.country=this.registerForm.get('country').value;
        if (this.submitUpdate === 'Update') {
          url = 'updateSponsor';
        } else {
          url = 'saveSponsor';
        }
      }
      console.log(this.registerForm);
      let content = '';
      var blob = new Blob([content], { type: "text/xml" });
      console.log('length--', this.uploadedLogoFiles)
      var data = new FormData();
      if (this.uploadedLogoFiles.length > 0) {
        var logoBlob = new Blob([this.uploadedLogoFiles[0]], { type: "text/xml" });
        console.log(logoBlob);
        data.append('multipartFiles', this.uploadedLogoFiles[0], this.uploadedLogoFiles[0].name);
        console.log('file---',data);
        data.append('allData', JSON.stringify(this.allData))
      } else {
       // data.append('multipartFiles', '', '');
       
       this.msg=true;
       this.message="Please add the photo.";
       return;
      } 
      console.log('dat----', data.get('multipartFiles'))

      this.apiService.postAPICallImg(data,url).subscribe(
        data => {
          this.allData=data;
          console.log(data)
          if(data.status){
            this.submit=true;
            this.msg = true;
            this.message = "Registration Sucessful."
            setTimeout(() => { this.msg = false; }, 20000);
          }else{
            this.msg=true;
            this.message="Registration Failed";
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
onEdit() {
  const url = '';
  this.apiService.postAPICall(this.allData, url).subscribe(
    data => {
      this.allData = data;
      if (this.allData.status) {
        this.commonService.registerAs=this.allData.user.role;
        this.registerAs=this.allData.user.role;
        this.registerForm.get('name').patchValue(this.allData.user.name);
        this.registerForm.get('nickName').patchValue(this.allData.user.nickName)
        this.registerForm.get('loginid').patchValue(this.allData.user.loginid);
        this.registerForm.get('password').patchValue(this.allData.user.password);
        this.registerForm.get('contactNumber').patchValue(this.allData.user.contactNumber);
        if(this.allData.user.role=='ADMIN'){
          this.registerForm.get('student').patchValue(this.allData.admin.studentId);
          this.registerForm.get('country').patchValue(this.allData.admin.country);
        }else if(this.allData.user.role=='SPONSOR'){
          this.registerForm.get('student').patchValue(this.allData.sponser.studentId);
          this.registerForm.get('country').patchValue(this.allData.sponser.country);
        }
        console.log(this.registerForm);
      } else {
        this.msg = true;
        this.message = ""
      }

    },
    error => {

    }
  );

}
getStudentList(){
  this.apiService.postAPICall(this.allData, 'studentList').subscribe(
    data => {
      this.studentList=data;
      console.log(this.registerAs)
      if(this.commonService.profileRole === 'PROFILE'){ 
        this.submitUpdate = 'Update';
        this.updateData = this.commonService.allData;
        this.editData();
      } else {
        this.submitUpdate = 'Submit';
      }
    });
}

editData() {
  console.log('data---', this.commonService.allData);
  this.allData = this.commonService.allData;
    console.log('reg==', this.registerForm, this.allData)
        if (this.allData!=null && this.allData!=undefined && this.allData.status) {
          this.allData.user.role = this.registerAs;
          this.registerForm.get('name').patchValue(this.allData.user.name);
          this.registerForm.get('nickName').patchValue(this.allData.user.nickName)
          this.registerForm.get('loginid').patchValue(this.allData.user.loginid);
          this.registerForm.get('password').patchValue(this.allData.user.password);
          this.registerForm.get('contactNumber').patchValue(this.allData.user.contactNumber);
          this.registerForm.get('country').patchValue(this.allData.user.country);
          let list = [];
          this.studentList.forEach(val => {
            this.allData.scholarshipList.forEach(val1 => {
              console.log('inside list')
              if(val.userId === val1.userId) {
                console.log('insode condtion')
                list.push(val.userId);
              }
            })
          })
          this.students = list;
          console.log(this.students)
          var base64 = btoa(
            new Uint8Array(this.allData.imageBytes)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          this.imageUrl = 'data:image/jpeg;base64,' + this.allData.imageBytes
          let objectURL = 'data:image/jpeg;base64,' + this.allData.imageBytes;
          this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          // var blob = new Blob( [ this.allData.imageBytes ], { type: "image/jpeg" } );
          // this.imageUrl = URL.createObjectURL( blob );
          console.log('imgurl==', this,this.imageUrl)
          // const url= 'getFile?loginid=' +this.allData.user.loginid +
          //  '&imageName=' + this.allData.user.userPhoto;
          // this.apiService.getAPICall(url).subscribe(
          //   data => {
          //     this.uploadedLogoFiles = data;
          //     console.log('upload ---', this.uploadedLogoFiles)
          //   },
          //   (error) => {
          //     console.log(error.error.text)
          //     let resp = error.error.text
          //     const contentDisposition = resp.headers.get('Content-Disposition');
          //     if (contentDisposition) {
          //     const blob = new Blob([resp.body], { type: resp.headers.get('Content-Type') });
          //     this.imageUrl = URL.createObjectURL(blob);
          //     }
          //   },
          //   () => {
              
          //   })

        }
}

uploadFile(event) {
  console.log('event---', event);
  if (event.target.files.length === 0)
    return;

  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.msg = true;
    this.message = "Only images are supported.";
    setTimeout(() => { this.msg = false; }, 20000);
  } else {
    this.uploadedLogoFiles = event.target.files;
  }
  console.log('length--', this.uploadedLogoFiles)
  if (this.uploadedLogoFiles.length > 0) {
    const file = this.uploadedLogoFiles[0];
    console.log("logofile", file)
    const reader = new FileReader();
    // reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imageUrl = reader.result
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
    };

    reader.readAsDataURL(file);
  }
}

imageSubmit() {
  let content = '';
    var blob = new Blob([content], { type: "text/xml" });
    console.log('length--', this.uploadedLogoFiles)
    var data = new FormData();
    if (this.uploadedLogoFiles.length > 0) {
      var logoBlob = new Blob([this.uploadedLogoFiles[0]], { type: "text/xml" });
      console.log(logoBlob);
      data.append('file', logoBlob, this.uploadedLogoFiles[0].name);
        console.log('file---',data);
    } else {
      data.append('file', blob, '');
    } 
    console.log('dat----', data.get('file'))
    this.apiService.postAPICall(data, 'uploadimage').subscribe(imgdata => {

    })
}

@ViewChild('fileInput') el: ElementRef;
  imageUrl: any;
  editFile: boolean = true;
  removeUpload: boolean = false;
  uploadFile1(event) {
    console.log('event--------------', JSON.stringify(event));
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registerForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
    console.log(this.registerForm);
    const formData = new FormData();
    for (const file of event.target.files) {
        formData.append( file, file.name);
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registerForm.patchValue({
      file: [null]
    });
  }
}
