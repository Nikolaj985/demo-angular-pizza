import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup;
  public loginErrorMessage$: Subject<string>;


  constructor(private fb: FormBuilder, private userService: UserService) { }

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
  console.log(data);
});
}

}
