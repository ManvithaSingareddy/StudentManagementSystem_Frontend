import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http:HttpClient) { }
  private _user:any;
  private _emailList:Array<string>=[];
  private _mobileList:Array<string>=[];


  get emailList(): Array<string> {
    return this._emailList;
  }

  set emailList(value: Array<string>) {
    this._emailList = value;
  }

  get mobileList(): Array<string> {
    return this._mobileList;
  }

  set mobileList(value: Array<string>) {
    this._mobileList = value;
  }

  get user(): any {
    return this._user;
  }

  private _product:any[]=[];

  get product(): any[] {
    return this._product;
  }

  set product(value: any[]) {
    this._product = value;
  }

  set user(value: any) {
    this._user = value;
  }
  getAllstudent():Observable<any>{
    return this.http.get("https://jzetqnccfd.execute-api.us-west-1.amazonaws.com/getStudentAll");
  }
}
