import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { Observable } from 'rxjs';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { ConfirmationModalComponent } from '../../shared/components/ui/modal/confirmation-modal/confirmation-modal.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { Setting } from '../../shared/interface/setting.interface';
import { TableConfig } from '../../shared/interface/table.interface';
import { TransactionsData, Wallet } from '../../shared/interface/wallet.interface';
import { CurrencySymbolPipe } from '../../shared/pipe/currency-symbol.pipe';
import { GetUsers } from '../../shared/store/action/user.action';
import { CreditWallet, DebitWallet, GetUserTransaction } from '../../shared/store/action/wallet.action';
import { SettingState } from '../../shared/store/state/setting.state';
import { UserState } from '../../shared/store/state/user.state';
import { WalletState } from '../../shared/store/state/wallet.state';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, CurrencySymbolPipe, HasPermissionDirective, Select2Module,
            PageWrapperComponent, TableComponent, ButtonComponent,
            ConfirmationModalComponent
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {

  @Select(UserState.users) users$: Observable<Select2Data>;
  @Select(WalletState.wallet) wallet$: Observable<Wallet>;
  @Select(SettingState.setting) setting$: Observable<Setting>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  public form: FormGroup;
  public balance: number = 0.00;
  public paginateInitialData: Params;

  public tableConfig: TableConfig = {
    columns: [
      { title: "amount", dataField: "amount", type: "price" },
      { title: "type", dataField: "type_status" },
      { title: "remark", dataField: "detail" },
      { title: "created_at", dataField: "created_at", type: "date" },
    ],
    data: [] as TransactionsData[],
    total: 0
  };

  constructor(@Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2, private store: Store,
    private formBuilder: FormBuilder) {
    this.store.dispatch(new GetUsers({ role: "consumer", status: 1 }));
    this.form = this.formBuilder.group({
      consumer_id: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
    });

    this.form.controls['consumer_id'].valueChanges.subscribe(value => {
      if(value) {
        this.paginateInitialData['consumer_id'] = value;
        this.store.dispatch(new GetUserTransaction(this.paginateInitialData));
        this.wallet$.subscribe(wallet => {
          let transactions = wallet?.transactions?.data?.filter((element: TransactionsData) => {
            element.type_status = element.type ? `<div class="status-${element.type}"><span>${element.type.replace(/_/g, " ")}</span></div>` : '-';
            return element;
          });
          this.balance = wallet ? wallet?.balance : 0;
          this.tableConfig.data = wallet ? transactions : [];
          this.tableConfig.total = wallet ? wallet?.transactions?.total : 0;
        });
        this.renderer.addClass(this.document.body, 'loader-none');
      } else {
        this.balance = 0;
        this.tableConfig.data = [];
        this.tableConfig.total = 0;
        this.form.controls['balance'].reset();
      }
    });
  }

  onTableChange(data?: Params) {
    this.paginateInitialData = data!;
    let vendor_id = this.form.controls['consumer_id']?.value;
    this.paginateInitialData['consumer_id'] = vendor_id;
    if(vendor_id) {
      this.store.dispatch(new GetUserTransaction(data));
    }
  }

  submit(type: string) {
    this.form.markAllAsTouched();
    let action = new CreditWallet(this.form.value);

    if(type == 'debit') {
      action = new DebitWallet(this.form.value)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.form.controls['balance'].reset();
        }
      });
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'loader-none');
  }

}
