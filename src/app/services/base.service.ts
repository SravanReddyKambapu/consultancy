import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutoUnsubscribe } from './auto-unsubscribe.service';

export class BaseService extends AutoUnsubscribe {
  baseUrl: string = environment.baseUri;
  constructor(private http: HttpClient) {
    super();
  }

  get<T>(url: string, methodName: string, objectType?: any, objectArgs?: any, isGrid?: boolean): Observable<T> {
    return new Observable(observer => {
    this.subscriptions.push(this.http.get(this.baseUrl + url)
    .subscribe(
      (data: any) => {
        let obj: any = data;
        if(data) {
        if(objectType) {
          objectArgs = objectArgs || [];
          
          try {
            if(Array.isArray(data)) {
              obj = [];
              data.forEach((element: any) => {
                obj.push(new objectType(element, ...objectArgs));
                observer.next(obj);
              });
            } else { 
              obj = new objectType(data.data, ...objectArgs);
              observer.next(obj);
            }
          } catch (e) {
            observer.error(e);
          }
        }
      } else {
        observer.error(data.message);
      }
      }, 
      (error :any) => {
        observer.error(error);
      })
      )
    });    
  }

  post<T>(url: string, methodName: string, bodyData: any, objectType?: any, objectArgs?: any, isGrid?: boolean) :Observable<T> {
    return new Observable(observer => {
      const headers :HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    const body: any = bodyData ? JSON.stringify(bodyData) : {};

    this.subscriptions.push(this.http.post(this.baseUrl + url, body, { headers: headers })
    .subscribe((data: any) => {
      let obj: any = data;
      if(data) {
        if(objectType) {
          objectArgs = objectArgs || [];

          try {
            if(Array.isArray(data)) {
              obj = [];
              data.forEach((element: any) => {
                obj.push(new objectType(element, ...objectArgs));                
              });
              observer.next(obj);
            } else{
              obj = new objectType(data.data, ...objectArgs);
              observer.next(obj);
            }
          } catch(e) {
            observer.error(e);
          }
        }       
      }
    },
    (error) => {
      observer.error(error);
    })
    )
    });
  }


  delete<T>(url: string, methodName: string, bodyData: any, objectType?: any, objectArgs?: any, isGrid?: boolean) :Observable<T> {
    return new Observable(observer => {
      const headers :HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    const body: any = bodyData ? JSON.stringify(bodyData) : {};

    this.subscriptions.push(this.http.delete(this.baseUrl + url, { headers: headers, params: body })
    .subscribe((data: any) => {
      let obj: any = data;
      if(data) {
        if(objectType) {
          objectArgs = objectArgs || [];

          try {
            if(Array.isArray(data)) {
              obj = [];
              data.forEach((element: any) => {
                obj.push(new objectType(element, ...objectArgs));                
              });
              observer.next(obj);
            } else{
              obj = new objectType(data.data, ...objectArgs);
              observer.next(obj);
            }
          } catch(e) {
            observer.error(e);
          }
        }       
      }
    },
    (error) => {
      observer.error(error);
    })
    )
    });
  }
}
