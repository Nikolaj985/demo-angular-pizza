import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../config';
import { Pizza } from '../model/pizza';
import { ResponseData } from '../shared/response-data';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private httpClient : HttpClient) { }


  addNewPizza(pizza: Pizza){
  return this.httpClient.post<ResponseData>(URL+'/pizza/new', pizza);
  }

  getAllPizzas(){
    return this.httpClient.get<Pizza[]>(URL+"/pizza");
  }



}
