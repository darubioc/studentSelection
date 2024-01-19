import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Criteria } from 'src/app/core/dto/criteriaInterface';
import { RatedCandidate } from 'src/app/core/dto/reportInterface';
import { CandidateSelectionService } from 'src/app/core/services/candidate-selection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-report',
  templateUrl: './see-report.component.html',
  styleUrls: ['./see-report.component.scss']
})
export class SeeReportComponent implements OnInit {
  convocationId : any | null =0;
  criteriaList : Criteria[] =[];
  reportList : RatedCandidate[] = [];
  convocationDescription:any;
  clickFile : boolean = true;

  constructor(private candidateSelectionService:CandidateSelectionService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit() {
    this.convocationId =this.activatedRoute.snapshot.paramMap.get('id');
    if(!this.convocationId){
      this.router.navigate(['private/search-convocation/'])
    }
    this.candidateSelectionService.getCriteria(this.convocationId).subscribe(resp =>{
      this.criteriaList = resp;
    });
    this.candidateSelectionService.getReport(this.convocationId).subscribe(resp =>{
      this.reportList = resp;
      this.convocationDescription = resp[0].convocation
    });

  }
  downloadReport(){
    this.clickFile=false;
    this.candidateSelectionService.getReportFile(this.convocationId).subscribe(resp=>{
      var file = new Blob([resp], { type: 'application/pdf' })
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      var a         = document.createElement('a');
      a.href        = fileURL;
      a.target      = '_blank';
      a.download    = this.convocationDescription.name+'.pdf';
      document.body.appendChild(a);
      a.click();
      this.clickFile=true;
    });
  }
  redirect(id:number, convocatory:any){
    this.router.navigate(['private/see-report/', id, convocatory])
  }
}
