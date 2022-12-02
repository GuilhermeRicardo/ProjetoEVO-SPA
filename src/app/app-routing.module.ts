import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'departamento', component: DepartamentosComponent },
  { path: 'funcionarios', component: FuncionariosComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
