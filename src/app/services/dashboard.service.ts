import { BaseService } from './base.service';
import { Items } from './../models/items';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {
  getAllIssues() {
    return this.get<Items[]>('onesignal/all', 'getItems', Items, []).subscribe((data) => {
      this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  saveItem(item: Items, isUpdate: boolean=false): Observable<Items>{
    return new Observable( observer => { this.post<Items>('onesignal/create', 'saveItem', item ,Items,{}).subscribe((data)=>{
      // if(!isUpdate) {
      // this.dataChange.value.push(data);
      // } else{
      //   let updateData = this.dataChange.value.find(x=>x.id===data.id);
      //   updateData = data;
      // }
      observer.next(data);
    }, (error)=>{
      observer.next(error);
    })
  })
  }

  dateItem(id): Observable<Array<Items>> {
    return new Observable(observer => {
      this.delete<Array<Items>>('onesignal/delete?id='+id, 'deleteItem', { 'id': id }, Items, []).subscribe((data) => {
        observer.next(data);
      }, (err) => {
        observer.next(err);
      })
    })
  }

  dataChange: BehaviorSubject<Items[]> = new BehaviorSubject<Items[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super(httpClient);
   }

   get data(): Items[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  addIssue(issue: Items): void {
    this.dialogData = issue;
  }

  updateIssue(issue: Items): void {
    this.dialogData = issue;
  }

  deleteIssue(id: number): void {
    console.log(id);
  }
}
