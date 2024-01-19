import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CandidateService } from 'src/app/core/services/candidate.service';

@Component({
  selector: 'app-load-candidates',
  templateUrl: './load-candidates.component.html',
  styleUrls: ['./load-candidates.component.scss'],
  providers: [MessageService]

})
export class LoadCandidatesComponent {

  constructor(private candidatesService:CandidateService,
    private messageService:MessageService){}
  uplo: any | undefined;

  onUpload(event:any) {
    for (let file of event.files) {
      this.uplo = file;
    }
    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    const formData = new FormData();
    formData.append('file', this.uplo);
    this.candidatesService.postCandidatesFile(formData).subscribe({
      next: data => {
        if(data=='true'||data==true){
          this.messageService.add({severity:'success', summary:'Candidatos cargados', detail:'Su solicitud fue ejecutada exitosamente'});
            setTimeout(() => {
              this.messageService.clear();
            }, 3000);

          }
      },
      error: (error) => {
        if (error.ok==false) {
          this.messageService.add({severity:'error', summary:'Candidatos no cargados',detail: 'Alguno(s) de los usuarios ya existían, se aborta la carga.'});
          setTimeout(() => {
            this.messageService.clear();
          }, 3000);
        }
      }}
    );
  }
}
