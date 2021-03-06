import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Pizza } from '../model/pizza';
import { Topping } from '../model/topping';
import { PizzaService } from '../services/pizza.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Heat } from '../model/heat';
import { ToastrService } from 'ngx-toastr';
import { faTimesCircle, faCheckCircle, faEdit, faCartPlus, faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../services/login.service';


registerLocaleData(localeFr, 'fr');



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public tableHeaderNames: string[] = ['Name',  'Heat', 'Toppings', 'Price', 'Action'];
  public pizzasFromDb: Pizza[] = [];
  public pizzasFromDbFullList: Pizza[] = [];
  public activeToppings: Topping[] = [];
  public activeUniqueToppings: Topping[] = [];
  public selectedToppings: Topping[] = [];
  public direction = 1;
  public mild: Heat = Heat.MILD;
  public hot: Heat = Heat.HOT;
  public faTimesCircle = faTimesCircle;
  public faCheckCircle = faCheckCircle;
  public faEdit = faEdit;
  public faCartPlus = faCartPlus;
  public faSort = faSort;
  public faSortUp = faSortUp;
  public faSortDown = faSortDown;
  public activeNameArrow = "faSort";

  constructor(private pizzaService: PizzaService, private toastr: ToastrService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.pizzaService.getAllPizzas().subscribe((response) => {
      this.pizzasFromDb = response;
      this.pizzasFromDbFullList = response;
      this.getActiveUniqueToppings(this.pizzasFromDb);
    });
  }

 isAuthenticated(){
   return this.loginService.getRole() === "ROLE_USER";
 }


  filterByName(name: string) {
    this.pizzasFromDb = this.pizzasFromDbFullList.filter((element) => {
      return element.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  getActiveUniqueToppings(pizzas: Pizza[]) {
    this.activeToppings = [];
    pizzas.forEach((pizza) => {
      pizza.toppings.forEach((topping) => {
        this.activeToppings.push(topping);
      });
    });
    this.activeUniqueToppings = this.activeToppings.filter((v, i, a) => {
      return a.indexOf(a.find((t) => t.description === v.description)) === i;
    });
  }

  addToppingToFiltration(deviceValue) {
    if (deviceValue.target.value != '') {
      this.selectedToppings.push(
        this.activeUniqueToppings[deviceValue.target.value]
      );
      this.activeUniqueToppings.splice(deviceValue.target.value, 1);
      this.filterBySelectedToppings();
    }
  }

  filterBySelectedToppings() {
    this.pizzasFromDb = this.pizzasFromDbFullList;
    this.selectedToppings.forEach((element) => {
      this.pizzasFromDb = this.filterByTopping(this.pizzasFromDb, element);
    });
    this.getActiveUniqueToppings(this.pizzasFromDb);
    this.selectedToppings.forEach((element) => {
      this.activeUniqueToppings.splice(this.activeUniqueToppings.indexOf(this.activeUniqueToppings.find(i => i.description == element.description)),1);
    });
  }

  filterByTopping(array: Pizza[], element: Topping) {
    let tempArray = [];
    let found = false;
    array.forEach((pizza) => {
      pizza.toppings.forEach((topping) => {
        if (topping.description == element.description) {
          found = true;
        }
      });
      if (found) {
        tempArray.push(pizza);
        found = false;
      }
    });
    return tempArray;
  }

  sortByHeader(item){
    switch(item){
      case 'Name': {
        this.pizzasFromDb.sort((a,b)=>a.name > b.name ? this.direction*1 : this.direction*-1)
        this.direction *=-1;
      }
      break;
      case 'Heat': {
        this.pizzasFromDb.sort((a,b)=> (a.heat == this.mild? 0 : a.heat == this.hot ? 1 : 2) > (b.heat == this.mild? 0 : b.heat == this.hot ? 1 : 2) ? this.direction*1 : this.direction*-1)
        this.direction *=-1;
      }
      break;
      case 'Price': {
        this.pizzasFromDb.sort((a,b)=> (a.salePrice >0? a.salePrice : a.price) > (b.salePrice > 0 ? b.salePrice : b.price) ? this.direction*1 : this.direction*-1)
        this.direction *=-1;
      }
      break;
    }
  }

  deleteSelectedTopping(index: number) {
    this.activeUniqueToppings.push(this.selectedToppings[index]);
    this.selectedToppings.splice(index, 1);
    this.filterBySelectedToppings();
  }


  deletePizza(pizza: Pizza){
    this.pizzaService.deletePizza(pizza).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success!', {
          positionClass: 'toast-bottom-center',
        });
        this.pizzasFromDb[this.pizzasFromDb.indexOf(pizza)].isActive = false;

      },
      (error) => {
        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-center',
        });
      }
    );
  }

  activatePizza(pizza: Pizza){
    this.pizzaService.activatePizza(pizza).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success!', {
          positionClass: 'toast-bottom-center',
        });
        this.pizzasFromDb[this.pizzasFromDb.indexOf(pizza)].isActive = true;

      },
      (error) => {
        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-center',
        });
      }
    );
  }

  addToCart(){
    this.toastr.error("Under development!", 'Error', {
      positionClass: 'toast-bottom-center',
    });
  }

}
