import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginData } from '../shared/user-login-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

setLoginData(userData: UserLoginData){
  localStorage.setItem('id', userData.id.toString());
  localStorage.setItem('username', userData.username);
  localStorage.setItem('email', userData.email);
  localStorage.setItem('role', userData.roles[0]);
  localStorage.setItem('accessToken', userData.accessToken);
  this.router.navigate(['home']);
}

getToken(): string{
return localStorage.getItem('accessToken');
}

getUsername(): string{
  return localStorage.getItem('username');
}

getEmail(): string{
  return localStorage.getItem('email');
}

getRole(): string{
  return localStorage.getItem('role');
}

getId(): string{
  return localStorage.getItem('id');
}

isAuthenticated(){
  return this.getToken() == "" ? false : true;
}

removeLoginData(){
  localStorage.removeItem('id');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('accessToken');
  this.router.navigate(['home']);
}

}
