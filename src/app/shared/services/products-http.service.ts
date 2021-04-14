import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product }    from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { tap }        from 'rxjs/operators';
import { url }        from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {

  constructor( private http: HttpClient ) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>( url ).pipe(
      tap( products => products.forEach( item => this.assignFinalPrice( item ) ) )
    );
  }

  public getProduct( id: string ): Observable<Product> {
    return this.http.get<Product>( `${ url }/${ id }` )
               .pipe( tap( product => this.assignFinalPrice( product ) ) );
  }

  public removeProduct( id: string ): Observable<any> {
    return this.http.delete<any>( `${ url }/${ id }` );
  }

  public addNewProduct( product: Product ): Observable<Product> {
    return this.http.post<Product>( url, product );
  }

  public updateProduct( id: string, product: Product ): Observable<Product> {
    return this.http.put<Product>( `${ url }/${ id }`, product );
  }

  private assignFinalPrice( item: Product ): number {
    return ( item.inOffer ) ?
      item.finalPrice = item.price - ((10 * item.price) / 100) :
      item.finalPrice = item.price;
  }
}
