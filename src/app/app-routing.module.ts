import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteMoralComponent } from './cliente-moral/cliente-moral.component';
import { ClienteFisicoComponent} from './cliente-fisico/cliente-fisico.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { IndexComponent } from './index/index.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  { path: 'colaborador', component: ColaboradorComponent },
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: 'clientemoral', pathMatch: 'full', component: ClienteMoralComponent},
  { path: 'clientefisico', component: ClienteFisicoComponent },
  { path: 'clientes', pathMatch: 'full', component: ClientesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
