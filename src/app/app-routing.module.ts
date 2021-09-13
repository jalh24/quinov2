import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';

const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    component: ColaboradoresComponent },
  { path: 'colaborador', component: ColaboradorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
