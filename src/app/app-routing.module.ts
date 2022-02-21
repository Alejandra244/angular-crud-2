import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

const routes: Routes = [
  {path:"", redirectTo: "lista-clientes", pathMatch:"full"},
  { path:"lista-clientes", component: ListaClientesComponent},
  {path:"crear-cliente", component: CrearClienteComponent},
  {path:"editar-cliente/:id", component: CrearClienteComponent},
  {path:"**", redirectTo: "lista-clientes", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
