import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  getAllStudents(): Observable<User[]> {
    console.log(`${URL}/user`);

    //console.log(this.httpClient.get<User[]>(`${URL}/user`));

    return this.httpClient.get<User[]>(`${URL}/user`);
  }




}
