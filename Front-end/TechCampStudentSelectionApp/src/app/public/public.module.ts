import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { CrearCandidatoComponent } from './crear-candidato/crear-candidato.component';
import { SharedModule } from '../modules/shared.module';


@NgModule({
  declarations: [
    CrearCandidatoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublicRoutingModule,
  ]
})
export class PublicModule { }
