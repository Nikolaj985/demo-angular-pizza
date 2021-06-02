import { Topping } from "./topping";

export interface Pizza{
  id?: number;
  name: string;
  price: number;
  image: string;
  heat : string;
  salePrice: number;
  isActive?: boolean;
  toppings: Topping[];
  }
