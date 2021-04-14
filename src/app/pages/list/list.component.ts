import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute }      from '@angular/router';
import { Product }             from '../../shared/interfaces/product.interface';
import { ProductsService }     from '../../shared/services/products.service';
import { ProductsHttpService } from 'src/app/shared/services/products-http.service';
import { switchMap, tap }      from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [`.div { min-height: 600px; }`]
})
export class ListComponent implements OnInit {

  public products    : Product[] = [];
  public showMessage : boolean   = false;
  public showButton  : boolean   = false;
  public id          : string;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor( private productSvc     : ProductsService,
               private httpSvc        : ProductsHttpService,
               private activatedRoute : ActivatedRoute ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap( ({ id }) => this.id = id ),
        switchMap( ({ id }) => this.httpSvc.getProducts() )
      )
      .subscribe( resp => {

        if( this.id !== '0' ) {
          resp = resp.filter( product => product.id === this.id );
          if( resp.length === 0 ) return this.productSvc.goToCatalog();

          this.search( this.id );
          this.showButton = true;
        } else {
          this.refreshList( resp );
          this.showButton = false;
        }

      });
  }

  private refreshList = ( newList: Product[] ): void => {
    this.products = newList;
    ( this.products.length === 0 ) ? this.showMessage = true : this.showMessage = false;
  }

  public goToDetails( id: string ): void {
    this.productSvc.goToDetails( id );
  }

  public goToForm( id: string ): void {
    this.productSvc.goToForm( id );
  }

  public removeProduct( id: string ): void {

    this.productSvc.showDeleteAlert().then( ({ isConfirmed }) => {

      if (isConfirmed) {
        this.runCleanup( id );
        this.productSvc.showDeleteMessage();
      }

    })

  }

  private runCleanup( id: string ): void {
    this.httpSvc.removeProduct( id )
      .pipe( switchMap(() => this.httpSvc.getProducts()) )
      .subscribe( products => this.refreshList( products ) );

    if (this.products.length === 1) {
      this.searchInput.nativeElement.value = "";
      this.showButton = false;
    }

    ( this.products.length === 0 ) ? this.showMessage = true : this.showMessage = false;
  }

  public search( value: string ): void {
    this.showButton = false;

    this.httpSvc.getProducts().subscribe( resp => {
      let result: Product[] = [];

      if( value.length === 0 ) return this.products = resp;

      resp.forEach( product => { if( this.isValid(product, value) ) result.push( product ) } );

      this.refreshList( result );
    });
  }

  private isValid( product: Product, value: string ): boolean {
    return ((product.name.toLowerCase().indexOf(value.toLowerCase().trim())) > -1) ||
           ((product.id.indexOf(value.trim())) > -1)
  }

  public showAllProducts(): void {
    this.httpSvc.getProducts().subscribe( resp => this.products = resp );
    this.showButton = false;
  }
}
