import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/store/cart.service';
import { Cart } from 'src/app/services/store/interfaces/cart';
import { Product } from '../../services/store/interfaces/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart:Cart = {idUsuario:0, products:[]};
  constructor(private cartService:CartService){

  }

  ngOnInit(): void {
      this.cart = this.cartService.cart;
  }

  get TotalPrice(){
    let sum = 0;

    this.cart.products.forEach(element => {
      sum += element.price;
    });

    return sum; 
  }

  get NumProducts(){
    return this.cart.products.length;
  }

  public putOrder(){
    this.cartService.putOrder(this.cart)
      .subscribe({
        next:() => {
          console.log("todo bien")
        },
        error:(err) => {
          console.log(err)
        }
      })
  }

}
