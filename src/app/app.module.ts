import { MaterialModule } from './material/material.module';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { JWTTokenInterceptor } from './interceptors/jwttoken.interceptor';
import { HttpLoaderInterceptor } from './interceptors/http-loader.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { Authgaurd } from './Auth/authgaurd';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:HttpLoaderInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass:JWTTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass:HttpErrorInterceptor, multi: true},
    AuthService,
    Authgaurd,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
