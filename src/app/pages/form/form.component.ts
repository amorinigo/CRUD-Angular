import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute }     from '@angular/router';
import { Product }            from '../../shared/interfaces/product.interface';
import { ProductsService }    from '../../shared/services/products.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public product: Product;
  public form: FormGroup;
  private id: string;
  private imageRegex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
  public showOkMessage: boolean = false;


  constructor( private activatedRoute: ActivatedRoute,
               private productsSvc: ProductsService,
               private formBuilder: FormBuilder ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) => { // SWITCHMAP.
      if( id !== 'nuevo' ) {
        this.productsSvc.getProduct( id ).subscribe( resp => {
          this.product = resp
          this.form.patchValue( this.product );
        });
      }

      this.id = id;
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      image:        ['', [Validators.required, Validators.pattern(this.imageRegex)]],
      name:         ['', [Validators.required, Validators.minLength(3)]],
      price:        ['', [Validators.required, Validators.min(10), Validators.max(10000000)]],
      description:  ['', [Validators.required, Validators.minLength(3)]],
      inOffer:      [false, [Validators.required]]
    });
  }

  saveData() {
    ( this.form.valid ) ? this.updateDatabase(this.form.value) : this.form.markAllAsTouched();
  }

  updateDatabase(formData: Product) {
    this.product = formData;

    if( this.id === 'nuevo' ) {
      this.productsSvc.addNewProduct( this.product ).subscribe();
      this.resetForm();
    } else {
      this.productsSvc.updateProduct( this.id, this.product ).subscribe();
      this.productsSvc.goBack();
    }
  }

  resetForm() {
    this.form.reset();
    this.form.get('inOffer').setValue(false);

    this.showOkMessage = true;
    setTimeout( () => this.showOkMessage = false, 4000 );
  }

  goBack() {
    this.productsSvc.goBack();
  }

  hasErrors( controlName: string ): boolean {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

  errorMessage( controlName: string ): string {
    const errors = this.form.get(controlName).errors;

    if( errors?.required ) return 'Campo obligatorio.';
    else if ( errors?.minlength ) return 'Longitud mínima: 3';
    else if ( errors?.min ) return 'El mínimo debe ser $10';
    else if ( errors?.max ) return 'El máximo debe ser $10000000';
    else if ( errors?.pattern ) return 'Url no válida';
  }
}
