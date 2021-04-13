import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogComponent }     from './pages/catalog/catalog.component';
import { DetailsComponent }     from './pages/details/details.component';
import { FormComponent }        from './pages/form/form.component';
import { ListComponent }        from './pages/list/list.component';

const routes: Routes = [
  { path: "catálogo",       component: CatalogComponent },
  { path: "lista/:id",      component: ListComponent },
  { path: "formulario/:id", component: FormComponent },
  { path: "detalles/:id",   component: DetailsComponent },
  { path: "**", pathMatch: "full", redirectTo: "catálogo" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
