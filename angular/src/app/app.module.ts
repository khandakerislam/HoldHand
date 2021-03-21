import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './scholarshipManagement/homepage/homepage.component';
import { LoginComponent } from './scholarshipManagement/login/login.component';
import { LogoutComponent } from './scholarshipManagement/logout/logout.component';
import { ContactUsComponent } from './scholarshipManagement/contact-us/contact-us.component';
import { FaqComponent } from './scholarshipManagement/faq/faq.component';
import { HeaderComponent } from './scholarshipManagement/header/header.component';
import { FooterComponent } from './scholarshipManagement/footer/footer.component';
import { MainlayoutComponent } from './scholarshipManagement/mainlayout/mainlayout.component';
import { RegistrationComponent } from './scholarshipManagement/registration/registration.component';
import { RegistrationAsStudentComponent } from './scholarshipManagement/registration-as-student/registration-as-student.component';
import { DonationPageComponent } from './scholarshipManagement/donation-page/donation-page.component';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { RegisterAsDonorComponent } from './scholarshipManagement/register-as-donor/register-as-donor.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StudentListComponent } from './scholarshipManagement/student-list/student-list.component';
import { SuperAdminComponent } from './scholarshipManagement/super-admin/super-admin.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { DonorListComponent } from './scholarshipManagement/donor-list/donor-list.component';
import { AddUserComponent } from './scholarshipManagement/addUser/adduser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    LogoutComponent,
    ContactUsComponent,
    FaqComponent,
    HeaderComponent,
    FooterComponent,
    MainlayoutComponent,
    RegistrationComponent,
    RegistrationAsStudentComponent,
    DonationPageComponent,
    RegisterAsDonorComponent,
    StudentListComponent,
    DonorListComponent,
    AddUserComponent,
    SuperAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CKEditorModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxPayPalModule
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
