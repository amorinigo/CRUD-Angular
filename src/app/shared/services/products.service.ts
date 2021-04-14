import { Injectable } from '@angular/core';
import { Location }   from '@angular/common';
import { Router }     from '@angular/router';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

@Injectable({ providedIn: 'root' })
export class ProductsService {

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
}
