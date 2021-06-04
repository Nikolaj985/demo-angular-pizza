import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pizza } from '../model/pizza';
import { Topping } from '../model/topping';
import { PizzaService } from '../services/pizza.service';
import { ToppingService } from '../services/topping.service';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.component.html',
  styleUrls: ['./add-pizza.component.css'],
})
export class AddPizzaComponent implements OnInit {
  public newPizzaForm: FormGroup;
  public newToppingForm: FormGroup;
  public deleteToppingForm: FormGroup = this.formGroupConfig();
  public selectedToppings: Topping[] = [];
  public toppingsFromDB: Topping[] = [];
  public imageLinkEntered: string = "";
  private pizzaName: string;
  public editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoad: ActivatedRoute,
    private toastr: ToastrService,
    private toppingService: ToppingService,
    private pizzaService: PizzaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editMode = false;
    this.toppingService.getAllToppings().subscribe((response) => {
      response.forEach((element) => {
        this.toppingsFromDB.push(element);
      });
    });

    this.newPizzaForm = this.fb.group({
      name: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
          updateOn: 'blur',
        },
      ],
      imageLink: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      heat: [
        '0',
        {
          validators: [
            Validators.required,
            Validators.min(0),
            Validators.max(3),
          ],
          updateOn: 'blur',
        },
      ],

      price: [
        '0',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      salePrice: [
        '0',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],

      toppings: [
        '',
        {
          validators: [],
          updateOn: 'blur',
        },
      ],
    });

    this.newToppingForm = this.fb.group({
      toppingName: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
          updateOn: 'blur',
        },
      ],
    });
this.activatedRoad.paramMap.pipe(map(paramMap => paramMap.get('pizzaName'))).subscribe(value=>{
this.pizzaName = value;
this.pizzaName ?   this.editMode = true : this.editMode = false;
this.loadPizza();
});

  }

  loadPizza(){

    this.pizzaService.getPizzaByName(this.pizzaName).subscribe(pizza=>{
      console.log(pizza.heat);
      this.name.setValue(pizza.name);
      this.imageLink.setValue(pizza.image);
      this.heat.setValue(pizza.heat == "MILD"? 0 : pizza.heat == "HOT" ? 1 : 2 );
      this.price.setValue(pizza.price);
      this.salePrice.setValue(pizza.salePrice);
      this.selectedToppings = pizza.toppings;
      this.selectedToppings.forEach(element => {
        this.toppingsFromDB.splice(this.toppingsFromDB.indexOf(this.toppingsFromDB.find(topping => topping.description == element.description )),1);
      });
    })
  }



  formGroupConfig() {
    return (this.deleteToppingForm = this.fb.group({
      toppingToDelete: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
    }));
  }

  get toppingToDelete() {
    return this.deleteToppingForm.get('toppingToDelete');
  }

  get toppingName() {
    return this.newToppingForm.get('toppingName');
  }

  get name() {
    return this.newPizzaForm.get('name');
  }

  get imageLink() {
    return this.newPizzaForm.get('imageLink');
  }

  get heat() {
    return this.newPizzaForm.get('heat');
  }

  get price() {
    return this.newPizzaForm.get('price');
  }

  get salePrice() {
    return this.newPizzaForm.get('salePrice');
  }

  get toppings() {
    return this.newPizzaForm.get('toppings');
  }

  deleteSelectedTopping(index: number) {
    this.toppingsFromDB.push(this.selectedToppings[index]);
    this.selectedToppings.splice(index, 1);
  }

  selectTopping() {
    if (this.toppings.value == '') {
      this.toastr.error('Please select topping', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    } else {
      this.selectedToppings.push(this.toppingsFromDB[this.toppings.value]);
      this.toppingsFromDB.splice(this.toppings.value, 1);
      this.toppings.reset('');
    }
  }


  submitToppingForm() {
    const newTopping: Topping = {
      description: this.toppingName.value,
    };

    this.toppingService.addNewTopping(newTopping).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success', {
          positionClass: 'toast-bottom-center',
        });
        this.toppingsFromDB.push(newTopping);
        this.newToppingForm.reset();
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-center',
        });
      }
    );
  }

  deleteTopping() {
    if (this.toppingToDelete.value == '') {
      this.toastr.error('Please select topping to delete', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    } else {
      this.toppingService
        .deleteToppingByName(this.toppingToDelete.value)
        .subscribe(
          (response) => {
            let toppingToDeleteIndex = this.toppingsFromDB.findIndex(
              (i) => i.description == this.toppingToDelete.value
            );
            this.toppingsFromDB.splice(toppingToDeleteIndex, 1);
            this.toastr.success(response.message, 'Success', {
              positionClass: 'toast-bottom-center',
            });
            this.deleteToppingForm.reset({ toppingToDelete: '' });
          },
          (error) => {
            this.toastr.error(error.error.message, 'Error', {
              positionClass: 'toast-bottom-center',
            });
          }
        );
    }
  }

  editPizza(){
    if (this.selectedToppings.length < 1) {
      this.toastr.error('Select atleast one topping!', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    } else if (this.price.value <= this.salePrice.value) {
      this.toastr.error('Price should be greater than sale price!', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    } else {
      const pizzaToEdit: Pizza = {
        name: this.name.value,
        price: this.price.value,
        image: this.imageLink.value,
        heat: this.heat.value,
        salePrice: this.salePrice.value,
        toppings: this.selectedToppings,
      };

      this.pizzaService.editPizza(pizzaToEdit).subscribe(
        (response) => {
          this.toastr.success(response.message, 'Success', {
            positionClass: 'toast-bottom-center',
          });
          this.router.navigate(['home']);

        },
        (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'Error', {
            positionClass: 'toast-bottom-center',
          });
        }
      );
    }
  }

  submitForm() {
    if (this.selectedToppings.length < 1) {
      this.toastr.error('Select atleast one topping!', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    } else if (this.price.value <= this.salePrice.value) {
      this.toastr.error('Price should be greater than sale price!', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    } else {
      const pizzaToAdd: Pizza = {
        name: this.name.value,
        price: this.price.value,
        image: this.imageLink.value,
        heat: this.heat.value,
        salePrice: this.salePrice.value,
        toppings: this.selectedToppings,
      };

      this.pizzaService.addNewPizza(pizzaToAdd).subscribe(
        (response) => {
          this.toastr.success(response.message, 'Pizza added!', {
            positionClass: 'toast-bottom-center',
          });
          this.newPizzaForm.reset({imageLink: '', heat: '0', price: '0', salePrice: '0', toppings: ''});
          this.toppingsFromDB = this.toppingsFromDB.concat(this.selectedToppings);
          this.selectedToppings = [];

        },
        (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'Error', {
            positionClass: 'toast-bottom-center',
          });
        }
      );
    }
  }
}
