import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PaymentDetailsState } from '../../shared/store/state/payment-details.state';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../../shared/interface/payment-details.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetPaymentDetails, UpdatePaymentDetails } from '../../shared/store/action/payment-details.action';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { FormFieldsComponent } from '../../shared/components/ui/form-fields/form-fields.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-payout-details',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            NgbModule, PageWrapperComponent, FormFieldsComponent, ButtonComponent
  ],
  templateUrl: './payout-details.component.html',
  styleUrl: './payout-details.component.scss'
})
export class PayoutDetailsComponent {

  @Select(PaymentDetailsState.paymentDetails) paymentDetails$: Observable<PaymentDetails>;

  public form: FormGroup;
  public active = 'bank';

  constructor(private store: Store) {
    this.form = new FormGroup({
      bank_account_no: new FormControl(),
      bank_name: new FormControl(),
      bank_holder_name: new FormControl(),
      swift: new FormControl(),
      ifsc: new FormControl(),
      paypal_email: new FormControl('', [Validators.email]),
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetPaymentDetails());
    this.paymentDetails$.subscribe(paymentDetails => {
      this.form.patchValue({
        bank_account_no: paymentDetails?.bank_account_no,
        bank_name: paymentDetails?.bank_name,
        bank_holder_name: paymentDetails?.bank_holder_name,
        swift:paymentDetails?.swift,
        ifsc: paymentDetails?.ifsc,
        paypal_email: paymentDetails?.paypal_email
      })
    });
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new UpdatePaymentDetails(this.form.value));
    }
  }

}
