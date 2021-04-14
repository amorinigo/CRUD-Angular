import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { ProductsService }    from '../../shared/services/products.service';
import { Product }            from '../../shared/interfaces/product.interface';
import { switchMap }          from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public product: Product;

  constructor( private activatedRoute : ActivatedRoute,
               private productsSvc    : ProductsService ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe( switchMap( ({ id }) => this.productsSvc.getProduct( id ) ) )
        .subscribe( resp => this.product = resp );
  }

  public removeProduct( id: string ): void {

    this.productsSvc.showDeleteAlert().then( result => {
      if (result.isConfirmed) {
        this.productsSvc.removeProduct( id ).subscribe( () => this.productsSvc.goBack() );
        this.productsSvc.showDeleteMessage()
      }
    })

  }

  public goToEdit( id: string ): void {
    this.productsSvc.goToForm( id );
  }

  public goBack(): void {
    this.productsSvc.goBack();
  }
}
