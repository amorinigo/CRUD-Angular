import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: "catálogo", component: CatalogComponent },
  { path: "lista/:id", component: ListComponent },
  { path: "formulario/:id", component: FormComponent },
  { path: "detalles/:id", component: DetailsComponent },
  {path: "**", pathMatch: "full", redirectTo: "catálogo"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
