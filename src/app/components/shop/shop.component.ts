import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/store/cart.service';
import { Product } from 'src/app/services/store/interfaces/product';
import { ProductService } from 'src/app/services/store/product.service';
import Swal from 'sweetalert2';

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

  public addProductToCart(product:Product){
    const result = this.cartService.addProduct(product);
    if (result) {
      Swal.fire({
        title:'Éxito',
        text:'Producto agregado al carrito',
        icon:'success'
      });
    }
    else{
      Swal.fire({
        title:'Error',
        text:'El producto ya esta en el carrito',
        icon:'error'
      });
    }
  }

}
