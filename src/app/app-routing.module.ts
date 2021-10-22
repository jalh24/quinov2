import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteMoralComponent } from './cliente-moral/cliente-moral.component';
import { ClienteFisicoComponent} from './cliente-fisico/cliente-fisico.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
//import { SigninComponent } from './signin/signin.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'dashboard', component: IndexComponent,canActivate: [AuthGuard] },
  { path: 'colaborador', component: ColaboradorComponent,canActivate: [AuthGuard] },
  { path: 'colaboradores', component: ColaboradoresComponent, canActivate: [AuthGuard] },
  { path: 'clientemoral', component: ClienteMoralComponent, canActivate: [AuthGuard]},
  { path: 'clientefisico', component: ClienteFisicoComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  //{ path: 'alta', component: SigninComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
