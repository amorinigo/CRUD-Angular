import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MenuComponent }    from './components/menu/menu.component';
import { ProductComponent } from './components/menu/product/product.component';
import { ImagePipe }        from './pipes/image.pipe';
import { OfferPipe }        from './pipes/offer.pipe';

@NgModule({
  declarations: [
    MenuComponent,
    ProductComponent,
    ImagePipe,
    OfferPipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    MenuComponent,
    ProductComponent,
    ImagePipe,
    OfferPipe
  ]
})
export class SharedModule { }
