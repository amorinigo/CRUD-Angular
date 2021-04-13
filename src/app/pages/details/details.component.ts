import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Product }            from '../../shared/interfaces/product.interface';
import { ProductsService }    from '../../shared/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public product: Product;

  constructor( private activatedRoute: ActivatedRoute,
               private productsSvc: ProductsService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) => {
      this.productsSvc.getProduct( id ).subscribe( resp => this.product = resp );
    });
  }

}
