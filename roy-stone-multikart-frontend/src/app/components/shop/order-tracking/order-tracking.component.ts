import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            BreadcrumbComponent, AlertComponent, ButtonComponent
  ],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent {

  public form: FormGroup;

  public breadcrumb: breadcrumb = {
    title: "Order Tracking",
    items: [{ label: 'Order Tracking', active: true }]
  }

  constructor(private store: Store, private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      order_number: new FormControl('', [Validators.required]),
      email_or_phone: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.router.navigate([ 'order/details' ], { queryParams: this.form.value });
    }
  }

}
