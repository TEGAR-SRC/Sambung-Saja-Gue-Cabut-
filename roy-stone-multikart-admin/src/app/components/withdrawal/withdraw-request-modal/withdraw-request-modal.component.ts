import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { WithdrawRequest } from '../../../shared/store/action/withdrawal.action';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-withdraw-request-modal',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            Select2Module, FormFieldsComponent, ButtonComponent
  ],
  templateUrl: './withdraw-request-modal.component.html',
  styleUrl: './withdraw-request-modal.component.scss'
})
export class WithdrawRequestModalComponent {

  public modalOpen: boolean = false;
  public closeResult: string;
  public active = 'upload';
  public form: FormGroup;
  public payment_type : Select2Data = [
    {
      value: 'bank',
      label: 'Bank',
    },
    {
      value: 'paypal',
      label: 'Paypal',
    }
  ]

  @ViewChild("requestModal", { static: false }) RequestModal: TemplateRef<string>;

  constructor( private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private store: Store) {
    this.form = this.formBuilder.group({
      amount: new FormControl('', [Validators.required]),
      payment_type: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.RequestModal, {
      ariaLabelledBy: 'Payout-Modal',
      centered: true,
      windowClass: 'theme-modal'
    }).result.then((result) => {
      `Result ${result}`
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    this.active = 'upload';
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sendRequest(){
    if(this.form.valid){
      this.store.dispatch(new WithdrawRequest(this.form.value))
    }
  }

}
