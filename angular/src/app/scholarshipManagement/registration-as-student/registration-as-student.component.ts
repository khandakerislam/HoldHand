import { Component, ElementRef, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { user } from '../../model/user';
import { AllData } from '../../model/AllData';
import { address } from 'src/app/model/address';
import { Student } from 'src/app/model/Student';
import { Institution } from 'src/app/model/Institution';
import { Scholarship } from 'src/app/model/Scholarship';
import _ from "lodash";
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-registration-as-student',
  templateUrl: './registration-as-student.component.html',
  styleUrls: ['./registration-as-student.component.scss']
})
export class RegistrationAsStudentComponent implements OnInit {
  registerAs;
  registerForm: FormGroup;
  login = false;
  submit: boolean = false;
  msg: boolean = false;
  message;
  userBean = new user;
  allData: AllData;
  sponserList = [];
  selectedValues;
  submitUpdate = 'Submit';
  updateData;
  @ViewChild('fileInput') el: ElementRef;
  imageUrl;
  editFile: boolean = true;
  removeUpload: boolean = false;
  thumbnail;
  uploadedLogoFiles = [];
  spnserName;
  idDis = false;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer,
    public commonService: CommonService, public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
    console.log('register===', this.commonService.registerAs, this.commonService.allData);
    this.allData = new AllData();
    this.registerAs = this.commonService.registerAs;
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'nickName': new FormControl(null),
      'loginid': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'contactNumber': new FormControl(null, [Validators.required]),
      'fatherName': new FormControl(null, [Validators.required]),
      'fatherProfession': new FormControl(null, [Validators.required]),
      'parentPhone': new FormControl(null, [Validators.required]),
      'motherName': new FormControl(null, [Validators.required]),
      'motherProfession': new FormControl(null, [Validators.required]),
      'facultyName': new FormControl(null, [Validators.required]),
      'institutionName': new FormControl(null, [Validators.required]),
      'mailingAddress': new FormControl(null, [Validators.required]),
      'permanentAddress': new FormControl(null, [Validators.required]),
      'institutionAddress': new FormControl(null, [Validators.required]),
      'sponserName': new FormControl(null),
    });

    this.apiService.postAPICall('', 'sponsorList').subscribe(data => {
      this.sponserList = data;
      if (this.registerAs === 'PROFILE') {
        this.updateData = _.cloneDeep(this.commonService.allData)
        this.submitUpdate = 'Update';
        this.idDis = true;
        this.onEdit();
      } else {
        this.submitUpdate = 'Submit'
      }
    })
  }
  onSubmit() {
    this.submit = false;
    if (this.registerForm.valid) {
      console.log
      
      this.allData = new AllData();
      this.allData.user = new user();
      console.log('all data', this.allData)
      let userData = new user();
      if (this.submitUpdate === 'Update') {
        userData.userId = this.updateData.user.userId;
      }
      userData.role = 'Student';
      userData.name = this.registerForm.get('name').value;
      userData.nickName = this.registerForm.get('nickName').value;
      userData.loginid = this.registerForm.get('loginid').value;
      userData.password = this.registerForm.get('password').value;
      userData.contactNumber = this.registerForm.get('contactNumber').value;
      console.log('userdata', userData)
      this.allData.user = userData;
      let studentData = new Student();
      studentData.fatherName = this.registerForm.get('fatherName').value;
      studentData.fatherProfession = this.registerForm.get('fatherProfession').value;
      studentData.parentPhone = this.registerForm.get('parentPhone').value;
      studentData.motherName = this.registerForm.get('motherName').value;
      studentData.motherProfession = this.registerForm.get('motherProfession').value;
      studentData.facultyName = this.registerForm.get('facultyName').value;
      if (this.submitUpdate === 'Update') {
        console.log('student datta==', this.updateData.student)
        if(this.updateData.student !== null) {
          studentData.studentId = this.updateData.student.studentId;
          studentData.institutionId = this.updateData.student.institutionId;
          studentData.userId = this.updateData.student.userId;
        } else {
          studentData.studentId = 0;
          studentData.institutionId = 0;
          studentData.userId = 0;
        }
      }
      let list = [];
      list = this.registerForm.get('sponserName').value;
      console.log('listtt---', this.spnserName, list)
      this.sponserList.forEach(val => {
        if (list === val.userId) {
          let scholar = new Scholarship();
          scholar.userId = val.userId;
          if (this.submitUpdate === 'Update') {
            if(this.updateData.scholarshipList !== null) {
              this.updateData.scholarshipList.forEach(element1 => {
                if (element1.userId == list) {
                  console.log('up==', element1.scholarshipId)
                  scholar.scholarshipId = element1.scholarshipId;
                }
              });
            } else {
              this.updateData.scholarshipList = null;
            }
          }
          this.allData.scholarshipList.push(scholar);
        }

      })
      let institute = new Institution();
      institute.institutionName = this.registerForm.get('institutionName').value;
      if (this.submitUpdate === 'Update') {
        if(this.updateData.institution !== null) {

          institute.institutionId = this.updateData.institution.institutionId;
          institute.addressId = this.updateData.institution.addressId;
        } else {
          institute.institutionId =0;
          institute.addressId = null;
        }
      }
      this.allData.institution = institute;
      this.allData.student = studentData;

      this.allData.addList = [];
      var addr1 = new address;
      addr1.addressType = 'mailingAdress';
      addr1.address = this.registerForm.get('mailingAddress').value;
      if (this.submitUpdate === 'Update') {
        if(this.updateData.addList !== null) {

          addr1.addressId = this.getAddId(this.updateData, addr1.addressType)
        }
      }
      this.allData.addList.push(addr1);
      var addr2 = new address;
      addr2.addressType = 'permanentAddress';
      addr2.address = this.registerForm.get('permanentAddress').value;
      if (this.submitUpdate === 'Update') {
        if(this.updateData.addList !== null) {

          addr2.addressId = this.getAddId(this.updateData, addr2.addressType)
        }
      }
      this.allData.addList.push(addr2);
      var addr3 = new address;
      addr3.addressType = 'institutionAddress';
      addr3.address = this.registerForm.get('institutionAddress').value;
      if (this.submitUpdate === 'Update') {
        if(this.updateData.addList !== null) {

          addr3.addressId = this.getAddId(this.updateData, addr3.addressType)
        }
      }
      this.allData.addList.push(addr3);
      console.log(this.registerForm);
      console.log(this.allData)
      var url = '';
      if (this.submitUpdate === 'Submit') {
        url = 'saveStudent';
      } else {
        url = 'updateStudent'
      }

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
        this.msg = true;
        this.message = "Please add the photo."
        return;
        //data.append('imageFile', blob, '');
      } 
      console.log('dat----', data.get('file'))
      
      this.apiService.postAPICallImg(data, url).subscribe(
        data => {
          if (data.status) {
            this.submit = true;
            this.msg = true;
            if (this.submitUpdate === 'Submit') {
              this.message = "Registration Sucessful."
            } else {
              this.message = "Updatation Sucessful."
            }
            setTimeout(() => { this.msg = false; }, 20000);
          } else {
            this.msg = true;
            this.message = "Registration Failed";
            setTimeout(() => { this.msg = false; }, 20000);
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

  imageSubmit() {
    let content = '';

     // var blob = new Blob([content], { type: "text/xml" });
     // console.log('length--', this.uploadedLogoFiles)
      const uploadImageData = new FormData();

      uploadImageData.append('multipartFiles', this.uploadedLogoFiles[0],this.uploadedLogoFiles[0].name);

     // data.append('multipartFiles', this.uploadedLogoFiles[0],this.uploadedLogoFiles[0].name);
    //data.append('',JSON.stringify(this.allData));

    //  if (this.uploadedLogoFiles.length > 0) {
     //   var logoBlob = new Blob([this.uploadedLogoFiles[0]], { type: "text/xml" });
     //   console.log(logoBlob);
     //   data.append('imageFile', logoBlob, this.uploadedLogoFiles[0].name);
     //     console.log('imageFile---',data);
     // } else {
     //   data.append('imageFile', blob, '');
     // } 
      console.log('dat----', uploadImageData.get('multipartFiles'))
      this.apiService.postAPICall(uploadImageData, 'uploadimage').subscribe(imgdata => {

      })

      // this.httpClient.post('http://localhost:8080/ScholarshipService/uploadimage', uploadImageData, { observe: 'response' })
      this.httpClient.post('https://18.211.221.248:8081/ScholarshipService/uploadimage', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }

  getAddId(data, type) {
    console.log('data==', data)
    for (let i of data.addList) {
      console.log('llop')
      if (i.addressType == 'mailingAdress' && type === 'mailingAdress') {
        console.log('mal add ', this.registerForm.get('mailingAddress'))
        return i.addressId;
      } else if (i.addressType == 'permanentAddress' && type === 'permanentAddress') {
        return i.addressId;
      } else if (i.addressType == 'institutionAddress' && type === 'institutionAddress') {
        return i.addressId;
      }
    }
    return null;
  }

  cancel() {

  }

  onEdit() {
    this.allData = this.commonService.allData;
    console.log('reg==', this.registerForm, this.allData)
    if (this.allData != null && this.allData != undefined && this.allData.status) {
      this.allData.user.role = this.registerAs;
      this.registerForm.get('name').patchValue(this.allData.user.name);
      this.registerForm.get('nickName').patchValue(this.allData.user.nickName)
      this.registerForm.get('loginid').patchValue(this.allData.user.loginid);
      this.registerForm.get('password').patchValue(this.allData.user.password);
      this.registerForm.get('contactNumber').patchValue(this.allData.user.contactNumber);

      this.registerForm.get('fatherName').patchValue(this.allData.student.fatherName);
      this.registerForm.get('fatherProfession').patchValue(this.allData.student.fatherProfession);
      this.registerForm.get('parentPhone').patchValue(this.allData.student.parentPhone);
      this.registerForm.get('motherName').patchValue(this.allData.student.motherName);
      this.registerForm.get('motherProfession').patchValue(this.allData.student.motherProfession);
      this.registerForm.get('facultyName').patchValue(this.allData.student.facultyName);
      this.registerForm.get('sponserName').patchValue(this.allData.student.sponserName);
      this.registerForm.get('institutionName').patchValue(this.allData.institution.institutionName);

      for (let i of this.allData.addList) {
        console.log('llop')
        if (i.addressType == 'mailingAdress') {
          console.log('mal add ', this.registerForm.get('mailingAddress'))
          this.registerForm.get('mailingAddress').patchValue(i.address);
        } else if (i.addressType == 'permanentAddress') {
          this.registerForm.get('permanentAddress').patchValue(i.address);
        } else if (i.addressType == 'institutionAddress') {
          this.registerForm.get('institutionAddress').patchValue(i.address);
        }
      }
      let list
      this.sponserList.forEach(val => {
        if(this.allData.scholarshipList){
          this.allData.scholarshipList.forEach(val1 => {
            console.log('inside list')
            if (val.userId === val1.userId) {
              console.log('insode condtion')
              list = val.userId;
            }
          })

        }
      })

      this.spnserName = list;
      this.registerForm.get('sponserName').patchValue(list);
      this.imageUrl = 'data:image/jpeg;base64,' + this.allData.imageBytes;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);

      console.log('list==', this.spnserName, list, this.sponserList, this.allData.scholarshipList);
      console.log(this.registerForm, this.registerForm.get('sponserName').value);
    }
  }

  onChange() {

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
      reader.onload = (e) => {
        this.imageUrl = reader.result
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
      };

      reader.readAsDataURL(file);
    }
  }
}
