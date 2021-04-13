import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient,
               private location: Location ) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  public getProduct( id: string ): Observable<Product> {
    return this.http.get<Product>( `http://localhost:3000/products/${ id }` );
  }

  public removeProduct( id: string ): Observable<any> {
    return this.http.delete<any>( `http://localhost:3000/products/${ id }` );
  }

  public addNewProduct( product: Product ): Observable<Product> {
    return this.http.post<Product>( 'http://localhost:3000/products', product );
  }

  public updateProduct( id:string, product: Product ): Observable<Product> {
    return this.http.put<Product>( `http://localhost:3000/products/${ id }`, product );
  }

  public goBack() {
    return this.location.back();
  }
}
