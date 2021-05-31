import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  public signupForm: FormGroup;


  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.signupForm = this.fb.group(
      {
        username: [
          '',
          {
            validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
            updateOn: 'blur',
          },
        ],
        email: [
          '',
          {
            validators: [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')],
            updateOn: 'blur',
          },
        ],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      }
    );
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }


  submitForm(){
    const newUser: User = {
      name: this.username.value,
      email: this.email.value,
      password: this.password.value
    }
    this.userService.signup(newUser).subscribe(response =>
      {
        this.toastr.success(response.message, 'Success', { positionClass: 'toast-bottom-center' });
      },
      error =>{
             this.toastr.error(error.error.message, 'Error', { positionClass: 'toast-bottom-center' });
      }
      );



  }



}
