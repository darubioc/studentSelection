import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateConvocationComponent } from './create-convocation/create-convocation.component';
import { ListCandidatesComponent } from './list-candidates/list-candidates.component';
import { LoadCandidatesComponent } from './load-candidates/load-candidates.component';
import { SearchConvocationsComponent } from './search-convocations/search-convocations.component';
import { SeeReportComponent } from './see-report/see-report.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'list-candidates',
        component: ListCandidatesComponent
      },

      {
        path: 'search-convocation',
        component: SearchConvocationsComponent
      },
      {
        path: 'create-convocation',
        component: CreateConvocationComponent
      },
      {
        path: 'see-report',
        component: SearchConvocationsComponent,
        pathMatch: 'full'
      },
      {
        path: 'see-report/:id',
        component: SeeReportComponent,
        pathMatch: 'full'
      },
      {
        path: 'load-candidates',
        component: LoadCandidatesComponent,
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
