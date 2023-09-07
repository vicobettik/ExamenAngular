import { Injectable } from '@angular/core';
import { Cart } from './interfaces/cart';
import { Product } from './interfaces/product';
import { LoginComponent } from '../../auth/login/login.component';
import { LoginService } from '../auth/login.service';
import { User } from '../auth/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Cart = {idUsuario:0, products: []};
  userData?:User;

  constructor(private loginService:LoginService) {
    this.loginService.userData.subscribe(
      {
        next:(userData) => {
          this.userData = userData;
        }
      }
    )

    this.cart.idUsuario =  this.userData?.id || 0;
   }

  public addProduct(product:Product):boolean{
    const productoExiste = this.cart.products.includes(product);
    console.log(productoExiste)
    if (productoExiste) {
      return false;
    }
    this.cart.products.push(product);
    return true;
  }

}
