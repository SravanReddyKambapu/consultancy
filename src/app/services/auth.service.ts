import { Users } from './../models/Users';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;

  constructor(private httpAuth: HttpClient) {
    super(httpAuth);
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('current-Student-User')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   login(username: string, password: string): Observable<Boolean> {
    return new Observable(observer => { 
      this.subscriptions.push(
        this.post<Users>('adminLogin', 'Login', {'admin_email': username, 'admin_password': password}, Users, []).subscribe((data) => {         
          this.currentUserSubject = new BehaviorSubject<Users>(data);
          window.localStorage.setItem('current-Student-User', JSON.stringify(data));
          observer.next(true);
        }, (err) => {
          observer.error(err);
        })
      )
    });
  }

  logout() {
    this.currentUserSubject.next(null);
    window.localStorage.removeItem('current-Student-User');
  }

  public get currentUserValue(): Users {
    return this.currentUserSubject.value;
  }

  public get currentUserSubjectObservable() : BehaviorSubject<Users> {
    return this.currentUserSubject;
  }

  getUsers(): Observable<Array<Users>> {
    return this.post<Array<Users>>('admin/getemployees', "getUsers", { 'loggedInRole': this.currentUserSubject.value.admin_roleid }, Users, [], true);
  }

  saveUser(data: Users): Observable<Users> {
    return this.post<Users>('adminReg', "SaveCategory", data, Users, {});
  }

  deleteUser(id): Observable<any> {
    return this.post<any>('deleteUser', 'deleteUser', { 'categoryID': id });
  }
}
