import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Candidate, CreateCandidate } from 'src/app/core/dto/candidateInterface';
import { typeObject } from 'src/app/core/dto/typeInterface';
import { QuestCategory} from 'src/app/core/dto/questionnaireInterface';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { DocumentTypeService } from 'src/app/core/services/document-type.service';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';

@Component({
  selector: 'app-crear-candidato',
  templateUrl: './crear-candidato.component.html',
  styleUrls: ['./crear-candidato.component.scss'],
  providers: [MessageService]
})
export class CrearCandidatoComponent implements OnInit, OnDestroy {
  @Input() inputCandidate!: Candidate;
  candidateForm: FormGroup ;
  private candidate: Candidate | undefined ;
  documentTypeList: typeObject[] = [];
  questionnaire: QuestCategory[] = [];
  formAnswersList: any[] = [];
  loaded = false;
  formControlList: any[] = [];

  constructor(
      private formBuilder: FormBuilder,
      private documentTypeService: DocumentTypeService,
      private questionnaireService: QuestionnaireService,
      private candidateService: CandidateService,
      private messageService: MessageService
    ) {

    this.candidateForm = this.formBuilder.group({
      id: [null,],
      names: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      docNum: [0, [Validators.required,Validators.minLength(5)]],
      docType: [{
            "id": 1,
            "name": "Cedula de ciudadania"
          }, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
    });
    /* this.candidate = this.config.data.candidate */
  }
  ngOnDestroy(): void {
    this.candidate= undefined ;
    this.documentTypeList = [];
    this.questionnaire= [];
    this.formAnswersList = [];
    this.loaded = false;
    this.formControlList= [];
    this.candidateService.setSelectedCandidate(undefined);
  }

  ngOnInit() {
    this.documentTypeService.getDocumentTypes().subscribe(resp => {
      this.documentTypeList = resp
    })
    this.questionnaireService.getQuestionnaire().subscribe(resp => {

      this.questionnaire = resp;
      this.setCandidateForm();

      if(this.questionnaire.length>0)
        this.fillCandidateForm();
    })
    this.candidate = this.candidateService.getSelectedCandidate()

    if(this.candidate){
      this.candidateForm.patchValue({
        id: this.candidate?.id,
        names: this.candidate?.names,
        surnames: this.candidate?.surnames,
        docNum: this.candidate?.docNum,
        docType: this.candidate?.docType,
        email: this.candidate?.email,
        birthday: new Date(this.candidate?.birthday)
      })
    }

  }

  selectAnswer(event: any, idQuestion: number){
    this.formAnswersList[idQuestion].answer.id= event.target.value;
  }

  get categories() : FormArray {
    return this.candidateForm.get("userInfo") as FormArray
  }

  questions(index : number): FormArray{
    return this.categories.controls[index].get("question") as FormArray;
  }

  newuserInfo(answerId:number | null, questionId:number) : FormGroup {
    return this.formBuilder.group({
      id: [answerId,Validators.required],
      questionId: [questionId, Validators.required]
    })
  }

  setCandidateForm(){
    this.questionnaire.forEach(category =>{
      category.questions.forEach(question =>{
        if(question.name !== 'age'){
          this.formAnswersList[question.id]={
            answer: {
              id: null
            },
            questionId: question.id,
            [question.id]: question.id
          }
        }
      });
    })

    this.loaded=true;

  }
  fillCandidateForm(){

    this.candidate?.userInformationList.forEach(
      userInfo => {
        this.formAnswersList[userInfo.answer.question.id].answer.id = userInfo.answer.id
        this.formAnswersList[userInfo.answer.question.id].id = userInfo.id
      }
    )
  }

  searchAnswer(questionId:number, categIndex:number, questionIndex:number){
      let answerFound=this.questionnaire[categIndex].questions[questionIndex].answers.find(answer =>
        answer.id == this.formAnswersList[questionId].answer.id)
    return answerFound;
  }

  guardar(){
    let tempArr:any[] = [];

    this.formAnswersList.forEach(answer =>{
      tempArr.push({
        id: answer.id,
        answer: {id: answer.answer.id}
      })
    });

    const dataToSend : CreateCandidate = {
      id: this.candidateForm.get('id')?.value,
      names: this.candidateForm.get('names')?.value,
      surnames: this.candidateForm.get('surnames')?.value,
      birthday: this.candidateForm.get('birthday')?.value,
      docNum: this.candidateForm.get('docNum')?.value,
      docType: this.candidateForm.get('docType')?.value,
      email: this.candidateForm.get('email')?.value,
      userInformationList: tempArr,
    }
    if(dataToSend.id)
      this.candidateService.updateCandidate(dataToSend).subscribe(resp =>{
        if(resp.id){
          this.messageService.add({severity:'success', summary:'Candidato actualizado', detail:'Su solicitud fue ejecutada exitosamente'});
          setTimeout(() => {
            this.messageService.clear();
          }, 3000);
        }
      })
    else
      this.candidateService.createCandidate(dataToSend).subscribe({
        next: (resp) => {
          if(resp){
            this.messageService.add({severity:'success', summary:'Candidato guardado', detail:'Su solicitud fue ejecutada exitosamente'});

            setTimeout(() => {
              this.messageService.clear();
            }, 3000);
          }
        },
        error: (error) =>{
          let errorMessage ={};
          if(error?.statusText == "Unknown Error"){
            errorMessage ={severity:'error', summary:'Error', detail:'Ha surgido un error desconocido con el servidor, comuníquese con soporte.'};
          }else if(error?.error.Error == "Error interno, el candidato no pudo crearse. Candidate does already exist and it's status is:true"){
            errorMessage = {severity:'warn', summary:'Cuidado!', detail:'Número de documento ya existente. Candidato activo.'};
          }else if(error?.error.Error == "Error interno, el candidato no pudo crearse. Candidate does already exist and it's status is:false"
          || error?.error.Error == "Error interno, el candidato no pudo crearse. Document number already exist, candidate were updated."){
            errorMessage= {severity:'info', summary:'!ATENCIÓN!', detail:'Número de documento ya existente. Candidato inactivo, se ha reactivado.'};
          }else if(error?.error.Error == "Error interno, el candidato no pudo crearse. Candidate does already exist and it's status is:false"){
            errorMessage ={severity:'warn', summary:'Cuidado!', detail:'Número de documento ya existe, el candidato fue actualizado.'};
          }
          this.messageService.add(errorMessage);
          setTimeout(() => {
            this.messageService.clear();
          }, 10000);

        }

      });

  }

}
