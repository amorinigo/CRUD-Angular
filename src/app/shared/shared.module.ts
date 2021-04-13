import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';

import { MenuComponent }    from './components/menu/menu.component';
import { ProductComponent } from './components/menu/product/product.component';
import { ImagePipe }        from './pipes/image.pipe';
import { OfferPipe }        from './pipes/offer.pipe';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    MenuComponent,
    ProductComponent,
    ImagePipe,
    OfferPipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MenuComponent,
    ProductComponent,
    ImagePipe,
    OfferPipe
  ]
})
export class SharedModule { }
