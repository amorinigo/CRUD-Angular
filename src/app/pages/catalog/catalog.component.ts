import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Product }            from '../../shared/interfaces/product.interface';
import { ProductsService }    from '../../shared/services/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public products: Product[] = [];

  constructor( private productsSvc: ProductsService,
               private router: Router ) { }

  ngOnInit(): void {
    this.productsSvc.getProducts().subscribe( resp => this.products = resp );
  }

  goToList( id: number ) {
    this.router.navigate( ['lista', id] );
  }

  filter( value: string ) {

    switch( value ) {
      case '0' : return this.productsSvc.getProducts().subscribe(
        resp => this.products = resp
      );

      case '1' : return this.productsSvc.getProducts().subscribe( resp =>
        this.products = resp.filter( product => product.inOffer )
      );

      case '2' : return this.productsSvc.getProducts().subscribe( resp =>
        this.products = resp.filter( product => !product.inOffer )
      );

      case '3' : return this.productsSvc.getProducts().subscribe( resp =>
        this.products = resp.filter( product => product.finalPrice > 1000 )
      );

      case '4' : return this.productsSvc.getProducts().subscribe( resp =>
        this.products = resp.filter( product => product.finalPrice < 1000 )
      );
    }

  }

  order( value: string ) {
    switch( value ) {

      case '0': return this.productsSvc.getProducts().subscribe( resp => this.products = resp );

      case '1': return this.products = this.products.sort( (productA, productB) => {
        if( productA.inOffer ) {
          return -1;
        } else {
          return 1;
        }
      });

      case '2': return this.products = this.products.sort( (productA, productB) => {
        if( !productA.inOffer ) {
          return -1;
        } else {
          return 1;
        }
      });

      case '3': return this.products = this.products.sort( (productA, productB) => {
        if( productA.finalPrice < productB.finalPrice ) {
          return -1;
        } else {
          return 1;
        }
      });

      case '4': return this.products = this.products.sort( (productA, productB) => {

        if( productA.finalPrice > productB.finalPrice ) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }
}
