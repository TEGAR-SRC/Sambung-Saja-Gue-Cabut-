import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { countryCodes } from '../../../../../shared/data/country-code';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { CustomValidators } from '../../../../../shared/validator/password-match';
import { CreateUser } from '../../../../../shared/store/action/user.action';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Module } from 'ng-select2-component';
import { FormFieldsComponent } from '../../../../../shared/components/ui/form-fields/form-fields.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-add-customer-modal',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            Select2Module, FormFieldsComponent, ButtonComponent
  ],
  templateUrl: './add-customer-modal.component.html',
  styleUrl: './add-customer-modal.component.scss'
})
export class AddCustomerModalComponent {

  public form: FormGroup;
  public closeResult: string;
  public modalOpen: boolean = false;
  public codes = countryCodes;

  @ViewChild("addCustomerModal", { static: false }) AddCustomerModal: TemplateRef<string>;

  constructor(private modalService: NgbModal,
    private store: Store,
    private formBuilder: FormBuilder ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country_code: new FormControl('1', [Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]*$/)]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
      status: new FormControl(1, [Validators.required]),
    },{validator: CustomValidators.MatchValidator('password', 'password_confirmation')})
  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('password_confirmation')?.touched
    );
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.AddCustomerModal, {
      ariaLabelledBy: 'add-customer-Modal',
      centered: true,
      windowClass: 'theme-modal modal-lg'
    }).result.then((result) => {
      `Result ${result}`
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
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new CreateUser(this.form.value))
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
