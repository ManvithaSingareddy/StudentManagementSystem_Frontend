import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { MainpageComponent } from './mainpage/mainpage.component';

const config = {
  domain: 'dev-mskzqyu5s8bqgo3a.us.auth0.com',
  clientId: '20GFoH6DDY1AQwu6hgEbaVy74c2eOzW7',
  redirectUri: window.location.origin + '/home',
  httpInterceptor: {
    allowedList: ['/api/*']
  },
};

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {path:"admin",component:MainpageComponent}
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot(config),
    RouterModule.forRoot(routes),
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    ConfirmDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
