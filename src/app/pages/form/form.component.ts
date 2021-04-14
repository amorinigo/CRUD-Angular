import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute }     from '@angular/router';
import { ProductsService }    from '../../shared/services/products.service';
import { Product }            from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public  product       : Product;
  public  form          : FormGroup;
  private id            : string;
  private imgRegex      : RegExp = /[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/gi;


  constructor( private activatedRoute : ActivatedRoute,
               private productsSvc    : ProductsService,
               private formBuilder    : FormBuilder ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) => {
      if( id !== 'nuevo' ) this.loadForm( id );
      this.id = id;
    });
  }

  private loadForm( id: string ): void {
    this.productsSvc.getProduct( id ).subscribe( resp => this.form.patchValue( resp ));
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      image:        ['', [ Validators.required, Validators.pattern(this.imgRegex)]],
      name:         ['', [Validators.required, Validators.minLength(3)]],
      price:        ['', [Validators.required, Validators.min(10), Validators.max(10000000)]],
      description:  ['', [Validators.required, Validators.minLength(3)]],
      inOffer:      [false, [Validators.required]]
    });
  }

  public saveData(): void {
    ( this.form.valid ) ? this.updateDatabase(this.form.value) : this.form.markAllAsTouched();
  }

  private updateDatabase(formData: Product): void {
    this.product = formData;

    if( this.id === 'nuevo' ) {
      this.productsSvc.addNewProduct( this.product ).subscribe();
      this.resetForm();
    } else {
      this.productsSvc.updateProduct( this.id, this.product ).subscribe( () => {
        this.productsSvc.showUpdateMessage();
      });
    }
  }

  private resetForm(): void {
    this.form.reset();
    this.form.get('inOffer').setValue(false);
    this.productsSvc.showAggregateMessage();
  }

  public goToList(): void {
    this.productsSvc.goToList( '0' );
  }

  public hasErrors( controlName: string ): boolean {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

  public errorMessage( controlName: string ): string {
    const errors = this.form.get(controlName).errors;

    if ( errors?.required )       return 'Campo obligatorio.';
    else if ( errors?.minlength ) return 'Longitud mínima: 3';
    else if ( errors?.min )       return 'El mínimo debe ser $10';
    else if ( errors?.max )       return 'El máximo debe ser $10000000';
    else if ( errors?.pattern )   return 'Url no válida';
  }
}
