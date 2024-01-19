import { Component, OnInit } from '@angular/core';
import { QuestCategory } from 'src/app/core/dto/questionnaireInterface';
import { AnswAnswers } from 'src/app/core/dto/questionnaireInterface copy';
import { CandidateSelectionService } from 'src/app/core/services/candidate-selection.service';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-create-convocation',
  templateUrl: './create-convocation.component.html',
  styleUrls: ['./create-convocation.component.scss'],
  providers: [MessageService]
})
export class CreateConvocationComponent implements OnInit {
  nameConvocation =""
  questionnaire: QuestCategory[] = [];
  formAnswersList: any[] = [];
  loaded = false;
  answersList: AnswAnswers[] = [];
  totalWeight=0;
  maxWeight=100;
  constructor(
    private questionnaireService: QuestionnaireService,
    private candidateSelectionService:CandidateSelectionService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.questionnaireService.getQuestionnaire().subscribe(resp => {
      this.questionnaire = resp;
      this.setCandidateForm()
    })
    this.questionnaireService.getAnswers().subscribe(resp =>{
      this.answersList = resp;

    });
  }
  selectAnswer(event: any, categId: number, questionId: number,priority:number=0): void {
    if(!this.formAnswersList[categId][questionId].answers.find((answ: { id: any; }) => answ.id ===event.value.id))
    this.formAnswersList[categId][questionId].answers.push({
      id:event.value.id,
      name:this.answersList.find(element => element.id ==event.value.id)?.name,
      priority:priority,
    })
  }
  setCandidateForm(){
    this.questionnaire.forEach(category =>{
      this.formAnswersList[category.id] ={
        categoryId:category.id,
        weight: 0,
      }
      category.questions.forEach(question =>{
        this.formAnswersList[category.id][question.id] ={
            active: false,
            answers: []
        }
      });
    })
    this.loaded=true;
  }
  calcTotalWeight(event:any,categId:number){
    /* this.totalWeight+=event; */
    if(event==0){
      this.disableOtherQuestions(categId,null);
    }
    this.totalWeight=0;
    this.formAnswersList.forEach(element =>{
      this.totalWeight+=parseInt(element.weight);

    })



  }
  disableOtherQuestions(categId:number, questionId: number | null){
    Object.keys(this.formAnswersList[categId]).forEach(iterator =>{
      if(!isNaN(parseInt(iterator)) && parseInt(iterator)!== questionId){
        this.formAnswersList[categId][parseInt(iterator)].active = false;
        this.formAnswersList[categId][parseInt(iterator)].answers = [];
      }
    })
  }
  guardar(){
    let categoryList:any[] = [];
    this.formAnswersList.forEach(category =>{
      let tempAnswers: any[]= [];
      Object.keys(this.formAnswersList[category.categoryId]).forEach(iterator =>{
        if(!isNaN(parseInt(iterator)) /* && iterator.active==true */){
          if(this.formAnswersList[category.categoryId][parseInt(iterator)].active ==true){
            this.formAnswersList[category.categoryId][parseInt(iterator)].answers.forEach((element:any) => {
              tempAnswers.push({
                answerId:element.id,
                priority:element.priority
              })
            })
          }
        }
      });
      let temp = {categoryId: category.categoryId,
        weigth: category.weight,
        answers: tempAnswers,
      }
      if(temp.answers.length > 0)
        categoryList.push(temp);
    })

    let dataToSend ={
      nameConvocation:this.nameConvocation,
      categories: categoryList
    }
    this.candidateSelectionService.postConvocation(dataToSend).subscribe({
      next:(resp) =>{
        const tempObj = {id: resp.id, name: resp.name, dateConvocation:resp.dateConvocation
        }
        this.messageService.add({severity:'success', summary:'Convocatoria creada', detail:'Su solicitud fue ejecutada exitosamente'});
          setTimeout(() => {
            this.messageService.clear();
            this.router.navigate(['private/see-report/', resp.id])
          }, 3000);

      },
      error:(err) =>{
        this.messageService.add({severity:'error', summary:'Error', detail:err.error.Error});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);

        }
    })


  }
  cancelar(){}
}
