import { Component } from '@angular/core';
import { CartService } from 'src/app/services/store/cart.service';
import { Cart, Order } from 'src/app/services/store/interfaces/cart';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  public orders:Order[] = [];
  public isLoading:boolean = false;


  constructor(private cartService:CartService){

  }

  ngOnInit(): void {
    this.cartService.getOrders()
    .subscribe({
      next:(orders) => {
        console.log(orders)
        this.orders = orders;
        this.isLoading = false;
      },
      error: (err) => {
        this.orders = [];
        this.isLoading = false;
      }
    });
  }

 

  get NumOrders(){
    return this.orders.length;
  }

}
