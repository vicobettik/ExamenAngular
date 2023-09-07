import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from './interfaces/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = 'https://localhost:7063/Product';
  constructor(private http:HttpClient) { }

  public getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url)
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
