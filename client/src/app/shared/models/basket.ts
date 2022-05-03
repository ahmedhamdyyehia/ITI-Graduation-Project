import {v4 as uuidv4} from 'uuid';
// npm install uuid => its just a utility that will just gonna give the basket 
// a unique identifier (More Guarnteed to be unique) 

export interface IBasket {
    id: string;
    items: IBasketItem[];
}

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Basket implements IBasket {
    // so whenever we gonna create a new instance of the basket it is gonna have a unique identifier
    // and an empty array of items as well
    id = uuidv4();
    items: IBasketItem[]=[];
    
}

export interface IBasketTotals {
    
    shipping: number;
    subtotal: number;
    total: number;
 }
    