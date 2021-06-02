import { Component, OnInit }   from '@angular/core';
import { Product }             from '../../shared/interfaces/product.interface';
import { ProductsService }     from '../../shared/services/products.service';
import { ProductsHttpService } from 'src/app/shared/services/products-http.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public products    : Product[] = [];
  public page        : number    = 1;
  public showMessage : boolean   = false;

  constructor( private productsSvc : ProductsService,
               private httpSvc     : ProductsHttpService ) {}

  ngOnInit(): void {
    this.httpSvc.getProducts().subscribe( resp => {
      this.products = resp;
      ( this.products.length === 0 ) ? this.showMessage = true : this.showMessage = false;
    });
  }

  public goToList( id: string ): void {
    this.productsSvc.goToList( id );
  }

  public filter( value: string ): void {

    this.httpSvc.getProducts().subscribe( resp => {
      this.products = this.productsSvc.getFilterOf( value, resp );
      ( this.products.length === 0 ) ? this.showMessage = true : this.showMessage = false;
    });

  }

  public order( value: string ): Product[] {
    return this.products = this.productsSvc.getOrderOf( value, this.products );
  }
}
