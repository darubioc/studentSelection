import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrivateRoutingModule } from './private-routing.module';
import { ListCandidatesComponent } from './list-candidates/list-candidates.component';
import { SharedModule } from '../modules/shared.module';
import { SearchConvocationsComponent } from './search-convocations/search-convocations.component';
import { CreateConvocationComponent } from './create-convocation/create-convocation.component';
import { SeeReportComponent } from './see-report/see-report.component';
import { LoadCandidatesComponent } from './load-candidates/load-candidates.component';

@NgModule({
  declarations: [
    ListCandidatesComponent,
    SearchConvocationsComponent,
    CreateConvocationComponent,
    SeeReportComponent,
    LoadCandidatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrivateRoutingModule,
  ]
})
export class PrivateModule { }
