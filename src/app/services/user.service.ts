import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../config';
import { User } from '../model/user';
import { ResponseData } from '../shared/response-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  login(username: string, password: string){
  return  this.httpClient.post(URL+"/auth/signin", {username: username, password: password });
  }


  signup(user: User){
    return this.httpClient.post<ResponseData>(URL+"/auth/signup",{username: user.name, email: user.email, role: user.role, password: user.password });
    }

}
