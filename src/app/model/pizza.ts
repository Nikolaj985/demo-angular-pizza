import { Topping } from "./topping";

export interface Pizza{
  id?: number;
  name: string;
  price: number;
  image: string;
  heat : number;
  salePrice: number;
  isActive?: boolean;
  toppings: Topping[];
  }
