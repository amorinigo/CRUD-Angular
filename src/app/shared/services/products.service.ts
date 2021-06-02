import { Injectable } from '@angular/core';
import { Location }   from '@angular/common';
import { Router }     from '@angular/router';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
import { Product } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private alertConfig: SweetAlertOptions = {
    title: '¿Está seguro que quiere eliminar este producto?',
    text: 'Una vez aceptado, no podrá revertir los cambios',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#218838',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  };

  constructor( private location : Location,
               private router   : Router ) {}

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

  public goToCatalog() {
    return this.router.navigate(['catálogo']);
  }

  public showDeleteAlert(): Promise<SweetAlertResult> {
    return Swal.fire( this.alertConfig );
  }

  private getMessage( message: string ): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public showAggregateMessage(): void {
    this.getMessage('Producto añadido correctamente.');
  }

  public showUpdateMessage(): void {
    this.getMessage('Cambios realizados correctamente.');
  }

  public showDeleteMessage(): void {
    this.getMessage('El producto ha sido eliminado.');
  }

  public getFilterOf( value: string, newProducts: Product[] ): Product[] {
    switch( value ) {
      case '0' : return newProducts;
      case '1' : return newProducts.filter( product => product.inOffer );
      case '2' : return newProducts.filter( product => !product.inOffer );
      case '3' : return newProducts.filter( product => product.finalPrice > 1000 );
      case '4' : return newProducts.filter( product => product.finalPrice < 1000 );
    }
  }

  public getOrderOf( value: string, products: Product[] ): Product[] {

    switch( value ) {
      case '0': return products;
      case '1': return products.sort( a => (a.inOffer)  ? -1 : 1 );
      case '2': return products.sort( a => (!a.inOffer) ? -1 : 1 );
      case '3': return products.sort( (a, b) => (a.finalPrice < b.finalPrice) ? -1 : 0 );
      case '4': return products.sort( (a, b) => (a.finalPrice > b.finalPrice) ? -1 : 0 );
    }

  }
}
