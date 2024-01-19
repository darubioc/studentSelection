import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCandidatoComponent } from './crear-candidato/crear-candidato.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
      path:'',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
    path:'',
    //component:HomeComponent,
    children: [
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'register',
        component: CrearCandidatoComponent
      },
    ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
