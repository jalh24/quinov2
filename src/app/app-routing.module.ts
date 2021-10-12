import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteMoralComponent } from './cliente-moral/cliente-moral.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    component: IndexComponent },
  { path: 'colaborador', component: ColaboradorComponent },
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: 'clientemoral',
    pathMatch: 'full',
    component: ClienteMoralComponent},
  { path: 'clientefisico', component: ClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
