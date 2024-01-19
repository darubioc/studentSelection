import { Component, OnInit, ViewChild } from '@angular/core';
import { Candidate } from 'src/app/core/dto/candidateInterface';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { DialogService } from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

import { CrearCandidatoComponent } from 'src/app/public/crear-candidato/crear-candidato.component';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.scss'],
  providers: [DialogService,  MessageService]
})
export class ListCandidatesComponent implements OnInit{
  candidateList: Candidate[] = [];
  selectedCandidate: Candidate | undefined;
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;
  displayBasic=false;

  @ViewChild('dt') dt: Table | undefined;
  rows: number = 10;
  totalRecords: number = 0;
  rowsPerPageOptions: number = 0;
  page: number = 0;

  constructor(private candidateService: CandidateService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private router: Router
    ){

  }

  ngOnInit(): void {
    this.getCandidates();

  }
  getCandidates(page: number = this.page, size: number = this.rows){
    this.candidateService.getCandidateList(page,size).subscribe(resp => {
      this.candidateList = resp.content;
      this.rows = resp.size;
      this.totalRecords = resp.totalElements;
      this.rowsPerPageOptions = resp.numberOfElements;
    /*this.totalRecords = candidate.length; */
    })
  }
  loadCustomers(event: LazyLoadEvent) {
    if (event.first !== undefined && event.rows !== undefined) {
      this.page = Math.floor(event.first / event.rows);
    }

    this.getCandidates(this.page, event.rows);
  }


  openEditDialog(candidate: Candidate) {
    this.candidateService.setSelectedCandidate(candidate)
    this.displayBasic = true;
    const ref = this.dialogService.open(CrearCandidatoComponent,{
      header: "Editar candidato",
      width: '80%'
    })
  }

  eliminateCandidate(id: number){
    this.candidateService.deleteCandidate(id).subscribe({
      next: (resp) => {
        if(resp=='Candidate deleted'){
          this.messageService.add({severity:'warn', summary:'Cuidado!', detail:'Número de documento ya existente. Candidato activo.'});
        }
        setTimeout(() => {
          this.messageService.clear();
          this.router.navigate(['private/list-candidates'])
          this.getCandidates();
        }, 3000);
      },
      error: (error) => {
        if(error.error.text=='Candidate deleted'){
          this.messageService.add({severity:'success', summary:'Éxito!', detail:'El candidato fue inactivado.'});
        }
        setTimeout(() => {
          this.messageService.clear();
          this.router.navigate(['private/list-candidates'])
          this.getCandidates();
        }, 3000);
      }
    })
  }


}
