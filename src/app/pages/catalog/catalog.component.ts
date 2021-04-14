import { Component, OnInit }  from '@angular/core';
import { Product }            from '../../shared/interfaces/product.interface';
import { ProductsService }    from '../../shared/services/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public products    : Product[] = [];
  public page        : number    = 1;
  public showMessage : boolean   = false;

  constructor( private productsSvc: ProductsService ) {}

  ngOnInit(): void {
    this.productsSvc.getProducts().subscribe( resp => {
      this.products = resp;
      ( this.products.length === 0 ) ? this.showMessage = true : this.showMessage = false;
    });
  }

  public goToList( id: string ): void {
    this.productsSvc.goToList( id );
  }

  public filter( value: string ): void {

    this.productsSvc.getProducts().subscribe( resp => {
      this.getFilterOf( value, resp );
      ( this.products.length === 0 ) ? this.showMessage = true : this.showMessage = false;
    });

  }

  private getFilterOf( value: string, resp: Product[] ): Product[] {
    switch( value ) {
      case '0' : return this.products = resp;
      case '1' : return this.products = resp.filter( product => product.inOffer );
      case '2' : return this.products = resp.filter( product => !product.inOffer );
      case '3' : return this.products = resp.filter( product => product.finalPrice > 1000 );
      case '4' : return this.products = resp.filter( product => product.finalPrice < 1000 );
    }
  }

  public order( value: string ): Product[] {

    switch( value ) {

      case '0': return;

      case '1': return this.products = this.products.sort( a => (a.inOffer)  ? -1 : 1 );

      case '2': return this.products = this.products.sort( a => (!a.inOffer) ? -1 : 1 );

      case '3': return this.products = this.products.sort(
        (a, b) => (a.finalPrice < b.finalPrice) ? -1 : 0
      );

      case '4': return this.products = this.products.sort(
        (a, b) => (a.finalPrice > b.finalPrice) ? -1 : 0
      );

    }

  }
}
