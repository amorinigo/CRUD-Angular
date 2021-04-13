import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Product }            from '../../shared/interfaces/product.interface';
import { ProductsService }    from '../../shared/services/products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public products: Product[] = [];
  public showMessage: boolean = false;

  constructor( private router: Router,
               private productSvc: ProductsService) { }

  ngOnInit(): void {
    this.productSvc.getProducts().subscribe( resp => {
      this.products = resp;
      ( this.products.length === 0 ) ? this.showMessage = true : this.showMessage = false;
    });
  }

  goToDetails( id: number ) {
    this.router.navigate(['detalles', id]);
  }

  goToForm( id: number | string ) {
    this.router.navigate(['formulario', id]);
  }

  removeProduct( id: string ) {
    let remove = confirm("¿Está seguro que quiere eliminar este producto?");

    if( remove ) {
      this.productSvc.removeProduct( id ).subscribe( () => { // SWITCHMAP.
        this.productSvc.getProducts().subscribe( resp => {
          this.products = resp;
          ( this.products.length === 0 ) ? this.showMessage = true : this.showMessage = false;
        });
      });
    }
  }
}
