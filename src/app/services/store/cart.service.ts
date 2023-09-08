import { Injectable } from '@angular/core';
import { Cart, Order } from './interfaces/cart';
import { Product } from './interfaces/product';
import { LoginComponent } from '../../auth/login/login.component';
import { LoginService } from '../auth/login.service';
import { User } from '../auth/interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Cart = {idUsuario:0, products: []};
  userData?:User;
  private url: string = 'https://localhost:7063/Cart';

  constructor(private loginService:LoginService
              ,private http:HttpClient) {
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

  public putOrder(cart: Cart){
    return this.http.post<User>(this.url, cart)
    .pipe(
      catchError(this.handleError)
      );
  }

  public getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.url)
    .pipe(
      catchError(this.handleError)
      );
  }

  private handleError(error:HttpErrorResponse){
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    }
    else {
      console.error('Backend retorno el codigo de estado', error.status, error.error);
    }
    return throwError(() => new Error('Algo fallo, por favor intente nuevamente.'));
  }

}
