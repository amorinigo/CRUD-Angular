import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location }   from '@angular/common';
import { Router }     from '@angular/router';
import { Product }    from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { tap }        from 'rxjs/operators';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor( private http     : HttpClient,
               private location : Location,
               private router   : Router ) {}

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

  public updateProduct( id: string, product: Product ): Observable<Product> {
    return this.http.put<Product>( `http://localhost:3000/products/${ id }`, product );
  }

  public goBack(): void {
    return this.location.back();
  }

  public goToList( id: string ) {
    return this.router.navigate( ['lista', id] );
  }

  public goToDetails( id: string ) {
    return this.router.navigate(['detalles', id]);
  }

  public goToForm( id: string ) {
    return this.router.navigate(['formulario', id]);
  }

  private assignFinalPrice( item: Product ): number {
    return ( item.inOffer ) ?
      item.finalPrice = item.price - ((10 * item.price) / 100) :
      item.finalPrice = item.price;
  }

  private sweetConfig: SweetAlertOptions = {
    title: '¿Está seguro que quiere eliminar este producto?',
    text: 'Una vez aceptado, no podrá revertir los cambios',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#218838',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  };

  public showDeleteAlert(): Promise<SweetAlertResult> {
    return Swal.fire( this.sweetConfig );
  }

  public showAggregateMessage(): void {
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido correctamente.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  public showUpdateMessage(): void {
    Swal.fire({
      icon: 'success',
      title: 'Cambios realizamos correctamente.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  public showDeleteMessage(): void {
    Swal.fire({
      icon: 'success',
      title: 'El producto ha sido eliminado.',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
