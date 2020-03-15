import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatCheckboxModule } from '@angular/material/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { DpDatePickerModule } from 'ng2-date-picker';

const appRoutes: Routes = [
  { path: 'authentification', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/authentification', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot(appRoutes), HttpClientModule,
    SweetAlert2Module.forRoot(),
    MatCheckboxModule,
    BrowserAnimationsModule,
    DpDatePickerModule
  ],

  providers: [AuthenticationService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
