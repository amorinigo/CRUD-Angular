import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { MenuComponent } from './menu/menu.component';
import { OfferPipe } from './pipes/offer.pipe';
import { ImagePipe } from './pipes/image.pipe';
import { DetailsComponent } from './details/details.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    ListComponent,
    FormComponent,
    MenuComponent,
    OfferPipe,
    ImagePipe,
    DetailsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
