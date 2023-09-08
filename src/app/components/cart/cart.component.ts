import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/store/cart.service';
import { Cart } from 'src/app/services/store/interfaces/cart';
import { Product } from '../../services/store/interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public cart:Cart = {idUsuario:0, products:[]};
  public isLoading:boolean = false;


  constructor(private cartService:CartService,
            private router:Router){

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
    this.isLoading = true;
    this.cartService.putOrder(this.cart)
      .subscribe({
        next:() => {
          this.isLoading = false;
          this.router.navigateByUrl('/orders');
        },
        error:(err) => {
          this.isLoading = false;
          console.log(err)
        }
      })
  }

}
