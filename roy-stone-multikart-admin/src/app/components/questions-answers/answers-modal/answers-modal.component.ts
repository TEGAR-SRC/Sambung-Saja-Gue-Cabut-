import { Component, TemplateRef, ViewChild } from '@angular/core';
import { QuestionAnswers } from '../../../shared/interface/questions-answers.interface';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateQuestionAnswers } from '../../../shared/store/action/questions-answers.action';
import { Store } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-answers-modal',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './answers-modal.component.html',
  styleUrl: './answers-modal.component.scss'
})
export class AnswersModalComponent {

  public modalOpen: boolean = false;
  public closeResult: string;
  public qna: QuestionAnswers;
  public answers = new FormControl('', [Validators.required]);

  @ViewChild("answersModal", { static: false }) AnswersModal: TemplateRef<string>;

  constructor( private modalService: NgbModal, private store: Store) { }

  async openModal(data: QuestionAnswers) {
    this.modalOpen = true;
    this.qna = data;
    if(data.answer){
      this.answers.patchValue(data.answer);
    } else {
      this.answers.patchValue('');
    }
    this.modalService.open(this.AnswersModal, {
      ariaLabelledBy: 'Payout-Modal',
      centered: true,
      windowClass: 'theme-modal text-center'
    }).result.then((result) => {
      `Result ${result}`
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submit(){
    this.answers.markAllAsTouched();
    if(this.answers.valid){
      let data = {
        question: this.qna.question,
        answer: this.answers.value,
        product_id: this.qna.product_id
      }
      this.store.dispatch(new UpdateQuestionAnswers(data, this.qna.id)).subscribe({
        complete: () => {
          this.modalService.dismissAll();
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
