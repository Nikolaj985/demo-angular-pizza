import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: boolean = false;


  constructor(private loginService: LoginService) {
    this.checkAuthStatus();
   }

  ngOnInit(): void {

  }

  ngDoCheck(){
    this.checkAuthStatus();
  }

logout(){
  this.loginService.removeLoginData();
  this.user = false;
}

checkAuthStatus(){
    if(this.loginService.getRole()==="ROLE_USER"){
      this.user = true;
    };
}

}
