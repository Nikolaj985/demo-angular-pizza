import { Component, OnInit } from '@angular/core';
import { Pizza } from '../model/pizza';
import { Topping } from '../model/topping';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public tableHeaderNames: string[] = ['Name', 'Toppings', 'Heat', 'Price'];
  public pizzasFromDb: Pizza[] = [];
  public pizzasFromDbFullList: Pizza[] = [];
  public activeToppings: Topping[] = [];
  public activeUniqueToppings: Topping[] = [];
  public selectedToppings: Topping[] = [];

  constructor(private pizzaService: PizzaService) {}

  ngOnInit(): void {
    this.pizzaService.getAllPizzas().subscribe((response) => {
      this.pizzasFromDb = response;
      this.pizzasFromDbFullList = response;
      this.getActiveUniqueToppings(this.pizzasFromDb);
    });
  }

  filterByName(name: string) {
    this.pizzasFromDb = this.pizzasFromDbFullList.filter((element) => {
      return element.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  getActiveUniqueToppings(pizzas: Pizza[]) {
    pizzas.forEach((pizza) => {
      pizza.toppings.forEach((topping) => {
        this.activeToppings.push(topping);
      });
    });
    this.activeUniqueToppings = this.activeToppings.filter((v, i, a) => {
      return a.indexOf(a.find((t) => t.description === v.description)) === i;
    });
  }

  filterByTopping() {}

  deleteSelectedTopping(i) {}
}
