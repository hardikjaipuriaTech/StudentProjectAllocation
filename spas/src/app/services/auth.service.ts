import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) {}

  private baseURL = "http://localhost:8086/api/v1/";

    loginAPI(payload: any){
        console.log(this.baseURL);
        return this.http.post(this.baseURL + "auth", payload)
    }

    signupAPI(payload: any){
        console.log(this.baseURL);
        return this.http.patch(this.baseURL + "auth", payload)
    }



}
