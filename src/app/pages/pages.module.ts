import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { SharedModule }         from '../shared/shared.module';
import { ReactiveFormsModule }  from '@angular/forms';
import { NgxPaginationModule }  from 'ngx-pagination';

import { CatalogComponent }     from './catalog/catalog.component';
import { DetailsComponent }     from './details/details.component';
import { FormComponent }        from './form/form.component';
import { ListComponent }        from './list/list.component';

@NgModule({
  declarations: [
    CatalogComponent,
    DetailsComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class PagesModule { }
