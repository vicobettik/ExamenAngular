import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/store/cart.service';
import { Product } from 'src/app/services/store/interfaces/product';
import { ProductService } from 'src/app/services/store/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  public productList:Product[] = [];
  public isLoading: boolean = true;
  constructor(private productService:ProductService,
            private cartService:CartService){

  }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe({
      next:(products) => {
        this.productList = products;
        this.isLoading = false;
      },
      error: (arg) => {
        this.productList = [];
        this.isLoading = false;
      }
    });
  }

  public addProductToCart(id:number){
    console.log("add prod")
    this.cartService.addProduct(id);
  }

}
