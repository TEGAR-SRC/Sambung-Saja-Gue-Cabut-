import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, of } from 'rxjs';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';
import { switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { CreateCurrency, EditCurrency, UpdateCurrency } from '../../../shared/store/action/currency.action';
import { CurrencyState } from '../../../shared/store/state/currency.state';
import * as data from '../../../shared/data/currency';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-currency',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            Select2Module, FormFieldsComponent, ButtonComponent
  ],
  templateUrl: './form-currency.component.html',
  styleUrl: './form-currency.component.scss'
})
export class FormCurrencyComponent {

  @Input() type: string;

  public form: FormGroup;
  public id: number;

  public symbolPosition: Select2Data = [{
    value: 'before_price',
    label: 'Before Price',
  },{
    value: 'after_price',
    label: 'After Price',
  }];

  private destroy$ = new Subject<void>();

  public currency = data.currency
  public currency_dropdown: Select2Data = [];

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
      symbol: new FormControl('', [Validators.required]),
      no_of_decimal: new FormControl(0),
      exchange_rate: new FormControl('', [Validators.required]),
      symbol_position: new FormControl('', [Validators.required]),
      status: new FormControl(1)
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditCurrency(params['id']))
                      .pipe(mergeMap(() => this.store.select(CurrencyState.selectedCurrency)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(currency => {
        this.id = currency?.id!;
        this.form.patchValue({
          code: currency?.code,
          symbol: currency?.symbol,
          no_of_decimal: currency?.no_of_decimal,
          exchange_rate: currency?.exchange_rate,
          symbol_position: currency?.symbol_position,
          status: currency?.status
        });
      });

      this.currency.forEach(data => {
        this.currency_dropdown.push({
          label: data.currency_code,
          value: data.currency_code
        })
      })

  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateCurrency(this.form.value);

    if(this.type == 'edit' && this.id) {
      action = new UpdateCurrency(this.form.value, this.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/currency');
        }
      });
    }
  }

  changeCurrency(data: Select2UpdateEvent) {
    let selected_currency = this.currency?.find((curr) =>{
      return curr.currency_code === data.value
    });
    this.form.patchValue({
      symbol: selected_currency?.currency_symbol
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
