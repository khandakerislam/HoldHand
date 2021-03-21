import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { user } from '../../model/user';
import { AllData } from '../../model/AllData';
import { Admin } from 'src/app/model/Admin';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register-as-donor',
  templateUrl: './register-as-donor.component.html',
  styleUrls: ['./register-as-donor.component.scss']
})
export class RegisterAsDonorComponent implements OnInit {

  registerAs;
  registerForm: FormGroup;
  login = false;
  submit: boolean = false;
  msg: boolean = false;
  message;
  userBean = new user;
  allData;
  thumbnail;
  studentList = [{ label: 'Admin', value: 1 }, { label: 'Sponser', value: 2 }, { label: 'Student', value: 3 }];
  constructor(private sanitizer: DomSanitizer, public commonService: CommonService, public apiService: ApiService, public router: Router, private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.commonService.registerAs = this.registerAs;
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'nickName': new FormControl(null, [Validators.required]),
      'loginid': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'contactNumber': new FormControl(null, [Validators.required]),
      'student': new FormControl(null),
      'country': new FormControl(null, [Validators.required]),
      'file': new FormControl(null),
    });
    this.getStudentList();
    //paste the filecode here
    let objectURL = 'data:image/jpeg;base64,' + '';
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  onSubmit() {
    this.submit = false;
    if (this.registerForm.valid) {
      this.submit = true;
      this.allData = new AllData;
      this.allData.user = new user;
      this.allData.user.role = this.registerAs;
      this.allData.user.name = this.registerForm.get('name').value;
      this.allData.user.nickName = this.registerForm.get('nickName').value;
      this.allData.user.loginid = this.registerForm.get('loginid').value;
      this.allData.user.password = this.registerForm.get('password').value;
      this.allData.user.contactNumber = this.registerForm.get('contactNumber').value;
      var url = '';
      if (this.allData.user.role == 'Admin') {
        this.allData.admin = new Admin;
        this.allData.admin.studentId = this.registerForm.get('student').value;
        this.allData.admin.country = this.registerForm.get('country').value;
        url = 'saveAdmin';
      } else if (this.allData.user.role == 'Sponser') {
        this.allData.sponser.studentId = this.registerForm.get('student').value;
        this.allData.sponser.country = this.registerForm.get('country').value;
        url = 'saveSponsor';
      }
      console.log(this.registerForm);
      this.apiService.postAPICall(this.allData, url).subscribe(
        data => {
          this.allData = data;
          if (this.allData.status) {
            this.submit = true;
            this.msg = true;
            this.message = "Registration Sucessful."
          } else {
            this.msg = true;
            this.message = ""
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
  cancel() {

  }
  onEdit() {
    const url = '';
    this.apiService.postAPICall(this.allData, url).subscribe(
      data => {
        this.allData = data;
        if (this.allData.status) {
          this.commonService.registerAs = this.allData.user.role;
          this.registerAs = this.allData.user.role;
          this.registerForm.get('name').patchValue(this.allData.user.name);
          this.registerForm.get('nickName').patchValue(this.allData.user.nickName)
          this.registerForm.get('loginid').patchValue(this.allData.user.loginid);
          this.registerForm.get('password').patchValue(this.allData.user.password);
          this.registerForm.get('contactNumber').patchValue(this.allData.user.contactNumber);
          if (this.allData.user.role == 'ADMIN') {
            this.registerForm.get('student').patchValue(this.allData.admin.studentId);
            this.registerForm.get('country').patchValue(this.allData.admin.country);
          } else if (this.allData.user.role == 'SPONSOR') {
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
  getStudentList() {
    const url = '';
    this.apiService.postAPICall(this.allData, url).subscribe(
      data => {
        // this.studentList=data;
      });

  }

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  uploadFile(event) {
    console.log(JSON.stringify(event));
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
        formData.append(file, file.name);
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
