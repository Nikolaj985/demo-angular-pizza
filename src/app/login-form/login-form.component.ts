import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup;
  public loginErrorMessage$: Subject<string>;


  constructor(private fb: FormBuilder, private userService: UserService, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
  }

  get username(){
    return this.loginForm.controls['username'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

onSubmit(){
this.userService.login(this.username.value, this.password.value).subscribe(data =>{
  {
    this.toastr.success("Successfully logedin!", 'Success', {
      positionClass: 'toast-bottom-center',
    });
    this.loginService.setLoginData(data);}
},
(error) => {
  this.toastr.error(error.error.message, 'Error', {
    positionClass: 'toast-bottom-center',
  });
});
}

}
