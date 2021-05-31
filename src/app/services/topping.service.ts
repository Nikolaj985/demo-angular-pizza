import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../config';
import { Topping } from '../model/topping';
import { ResponseData } from '../shared/response-data';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  constructor(private httpClient: HttpClient) { }


  getAllToppings(){
    return this.httpClient.get<Topping[]>(URL+"/topping");
  }

  addNewTopping(topping: Topping){
    return this.httpClient.post<ResponseData>(URL+"/topping/new", topping);
  }

  deleteToppingByName(name: string){
    return this.httpClient.delete<ResponseData>(URL+"/topping/name/"+name);
  }



}
