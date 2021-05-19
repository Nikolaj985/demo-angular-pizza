import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] =[];

  constructor(private userService: StudentService){}

  ngOnInit(): void{
    this.userService.getAllStudents().subscribe(users =>{
      this.users = users;
    })
  }



}
