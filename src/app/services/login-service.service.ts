import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from '../helper';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/token/generar/`, loginData);
  }

  public loginUser(token:any){
    localStorage.setItem('token', token);
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token'); 
    if(tokenStr == null || tokenStr == undefined || tokenStr == ''){
      return false;
    }else{
      return true;
    }
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout;
      return null;
    }
  }

  public getUserRoles(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/token/actual-usuario/`);
  }
}
