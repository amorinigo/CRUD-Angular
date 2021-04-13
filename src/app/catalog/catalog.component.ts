import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from '../services/products.service';

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

}
