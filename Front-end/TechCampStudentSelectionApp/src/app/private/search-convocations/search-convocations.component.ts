import { Component, OnInit } from '@angular/core';
import { CandidateSelectionService } from 'src/app/core/services/candidate-selection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-convocations',
  templateUrl: './search-convocations.component.html',
  styleUrls: ['./search-convocations.component.scss']
})
export class SearchConvocationsComponent implements OnInit{

  convocationList : any[] =[];
  constructor(
    private candidateSelectionService: CandidateSelectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.candidateSelectionService.getConvocations().subscribe(resp =>{
      this.convocationList = resp;
      this.convocationList.sort(function(a, b){return a.id - b.id})
    })
  }
  redirectToSeeReport(convocatoria:any){
    this.router.navigate(['private/see-report/', convocatoria.id])

  }


}
