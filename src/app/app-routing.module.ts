import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    component: IndexComponent },
  { path: 'colaborador', component: ColaboradorComponent },
  { path: 'colaboradores', component: ColaboradoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
