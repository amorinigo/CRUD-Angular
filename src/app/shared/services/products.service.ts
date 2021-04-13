import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient,
               private location: Location ) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products')
               .pipe( tap( products => products.forEach( item => this.assignFinalPrice( item ) ) ) );
  }

  public getProduct( id: string ): Observable<Product> {
    return this.http.get<Product>( `http://localhost:3000/products/${ id }` )
               .pipe( tap( product => this.assignFinalPrice( product ) ) );
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

  assignFinalPrice( item: Product ) {
    return ( item.inOffer ) ?
      item.finalPrice = item.price - ((10 * item.price) / 100) :
      item.finalPrice = item.price;
  }
}
