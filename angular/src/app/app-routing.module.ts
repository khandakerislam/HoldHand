import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainlayoutComponent } from './scholarshipManagement/mainlayout/mainlayout.component';
import { LoginComponent } from './scholarshipManagement/login/login.component';
import { HomepageComponent } from './scholarshipManagement/homepage/homepage.component';
import { LogoutComponent } from './scholarshipManagement/logout/logout.component';
import { ContactUsComponent } from './scholarshipManagement/contact-us/contact-us.component';
import { FaqComponent } from './scholarshipManagement/faq/faq.component';
import { RegistrationComponent } from './scholarshipManagement/registration/registration.component';
import { RegistrationAsStudentComponent } from './scholarshipManagement/registration-as-student/registration-as-student.component';
import { DonationPageComponent } from './scholarshipManagement/donation-page/donation-page.component';
import {RouteGuardService} from '../app/service/rougaurd.service';
import { RegisterAsDonorComponent } from './scholarshipManagement/register-as-donor/register-as-donor.component';
import { StudentListComponent } from './scholarshipManagement/student-list/student-list.component';
import {DonorListComponent}  from './scholarshipManagement/donor-list/donor-list.component';
import { SuperAdminComponent } from './scholarshipManagement/super-admin/super-admin.component';
import { AddUserComponent } from './scholarshipManagement/addUser/adduser.component';


const routes: Routes = [
  { path: '', component: HomepageComponent  },//canActivate, RouteGuardService
  { path: 'mainlayout', component: MainlayoutComponent  },//canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },
   { path: 'homepage', component: HomepageComponent},
  { path: 'logout', component: LogoutComponent , canActivate:[RouteGuardService]},
  { path: 'contactus', component: ContactUsComponent },
   { path: 'faq', component: FaqComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'scholarshipHolder', component: RegistrationAsStudentComponent },
  { path: 'donate', component: DonationPageComponent },
  { path: 'profile', component: RegistrationComponent , canActivate:[RouteGuardService]},
  { path: 'holderProfile', component: RegistrationAsStudentComponent, canActivate:[RouteGuardService] },
  { path: 'donorRegister', component: RegisterAsDonorComponent, canActivate: [RouteGuardService]},
  { path: 'studentlist', component: StudentListComponent},
  { path: 'donorList', component: DonorListComponent},
  { path: 'superAdmin', component: SuperAdminComponent, canActivate: [RouteGuardService]},
  { path: 'addUser', component: AddUserComponent, canActivate: [RouteGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
