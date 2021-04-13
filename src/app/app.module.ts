import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { HttpClientModule }     from '@angular/common/http';
import { ReactiveFormsModule }  from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

import { SharedModule }         from './shared/shared.module';
import { PagesModule }          from './pages/pages.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    PagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
