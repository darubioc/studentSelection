import { NgModule } from '@angular/core';
import { PrimeNgModule } from './prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class SharedModule { }
