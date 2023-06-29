import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarJuegosComponent } from './components/listar-juegos/listar-juegos.component';
import { CrearJuegoComponent } from './components/crear-juego/crear-juego.component';

const routes: Routes = [
  {path:'',component:ListarJuegosComponent},
{path:'crear-juego',component:CrearJuegoComponent},
{path:'editar-juego/:id',component:CrearJuegoComponent},
{path:'**',redirectTo:'',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
