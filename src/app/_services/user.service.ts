import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" }),
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: Http) { }
    postfitnessdata(data){
      return this.http.post(UserService.BaseUrl+'allfriends',data,httpOptions).pipe(map((response: Response) => response.json()),
      catchError(this.handleError));
    }

    getfitnessdata() {
      return this.http.get(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => response.json()),
      catchError(this.handleError));
    }

    getfitnessdatabyid(id) {
      return this.http.get(UserService.BaseUrl+'allfriends/' + id, httpOptions).pipe(map((response: Response) => response.json()),
      catchError(this.handleError));
    }

    deletefitnessdata(id) {
      return this.http.delete(UserService.BaseUrl + 'allfriends/' + id, httpOptions).pipe(map((response: Response) => response.json()),
      catchError(this.handleError));
    }
    
    updatefitnessdata(id, data) {
      return this.http.put(UserService.BaseUrl + 'allfriends/' + id, data, httpOptions).pipe(map((response: Response) => response.json()),
      catchError(this.handleError));
    }

    postcontactdata(data) {
      return this.http.post(UserService.BaseUrl + 'contact', data, httpOptions).pipe(map((response: Response) => response.json()),
      catchError(this.handleError));
    }

    private handleError(error: any) {
      console.error(error);
      return throwError(error);
    }

}