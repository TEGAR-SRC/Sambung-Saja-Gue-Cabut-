import { Component, Input, ViewChild } from '@angular/core';
import { Shipping, ShippingRule } from '../../../shared/interface/shipping.interface';
import { DeleteModalComponent } from '../../../shared/components/ui/modal/delete-modal/delete-modal.component';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../shared/store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../shared/interface/setting.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { CreateShippingRule, DeleteShippingRule, UpdateShippingRule } from '../../../shared/store/action/shipping.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-shipping',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, Select2Module, FormFieldsComponent,
            ButtonComponent, DeleteModalComponent
  ],
  templateUrl: './form-shipping.component.html',
  styleUrl: './form-shipping.component.scss'
})
export class FormShippingComponent {

  @Input() data: ShippingRule;

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;
  @Select(SettingState.setting) setting$: Observable<Values>;

  public form: FormGroup;
  public shipping_id: number;

  public ruleType: Select2Data = [{
    value: 'base_on_price',
    label: 'Base on Price',
  },{
    value: 'base_on_weight',
    label: 'Base on Weight',
  }];

  public shippingType: Select2Data = [{
    value: 'percentage',
    label: 'Percentage',
  },{
    value: 'free',
    label: 'Free',
  },{
    value: 'fixed',
    label: 'Fixed',
  }];

  constructor(private modalService: NgbModal,
    private store: Store,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.shipping_id = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      shipping_id: new FormControl(this.shipping_id, []),
      rule_type: new FormControl('', [Validators.required]),
      min: new FormControl('', [Validators.required]),
      max: new FormControl('', [Validators.required]),
      shipping_type: new FormControl('fixed', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      status: new FormControl(1),
    });
  }

  ngOnChanges() {
    if(this.data) {
      this.form.patchValue({
        name: this.data?.name,
        shipping_id: this.data?.shipping_id,
        rule_type: this.data?.rule_type,
        min: this.data?.min,
        max: this.data?.max,
        shipping_type: this.data?.shipping_type,
        amount: this.data?.amount,
        status: this.data?.status,
      });
    }
  }

  ngOnInit(){
    this.form.controls['shipping_type'].valueChanges.subscribe((data) => {
      if(data === 'free') {
        this.form.removeControl('amount');
      } else {
        this.form.setControl('amount', new FormControl(this.data ? this.data.amount : '', [Validators.required]));
      }
    })
  }

  selectShippingType(){
    this.form.get('amount')?.setValue('');
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateShippingRule(this.form.value);
    if(this.data) {
      action = new UpdateShippingRule(this.form.value, this.data.id)
    }
    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.modalService.dismissAll();
        }
      });
    }
  }

  delete(actionType: string, data: Shipping) {
    this.store.dispatch(new DeleteShippingRule(data?.id));
  }

}
