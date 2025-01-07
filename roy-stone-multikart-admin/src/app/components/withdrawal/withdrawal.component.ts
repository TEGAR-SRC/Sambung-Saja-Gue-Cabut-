import { Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { WithdrawalState } from '../../shared/store/state/withdrawal.state';
import { Observable } from 'rxjs';
import { Withdrawal, WithdrawalModel } from '../../shared/interface/withdrawal.interface';
import { VendorWalletState } from '../../shared/store/state/vendor-wallet.state';
import { Wallet } from '../../shared/interface/wallet.interface';
import { SettingState } from '../../shared/store/state/setting.state';
import { Values } from '../../shared/interface/setting.interface';
import { AccountState } from '../../shared/store/state/account.state';
import { PayoutModalComponent } from '../../shared/components/ui/modal/payout-modal/payout-modal.component';
import { WithdrawRequestModalComponent } from './withdraw-request-modal/withdraw-request-modal.component';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { GetVendorTransaction } from '../../shared/store/action/vendor-wallet.action';
import { Params } from '@angular/router';
import { GetWithdrawRequest, UpdateWithdrawStatus } from '../../shared/store/action/withdrawal.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../shared/pipe/currency-symbol.pipe';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-withdrawal',
  standalone: true,
  imports: [CommonModule, TranslateModule, CurrencySymbolPipe,
            PageWrapperComponent, TableComponent, PayoutModalComponent,
            WithdrawRequestModalComponent
  ],
  templateUrl: './withdrawal.component.html',
  styleUrl: './withdrawal.component.scss'
})
export class WithdrawalComponent {

  @Select(WithdrawalState.withdrawal) withdrawal$: Observable<WithdrawalModel>;
  @Select(VendorWalletState.vendorWallet) wallet$: Observable<Wallet>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(AccountState.getRoleName) roleName$: Observable<string>;

  @ViewChild("payoutModal") PayoutModal: PayoutModalComponent;
  @ViewChild("requestModal") RequestModal: WithdrawRequestModalComponent;

  public tableConfig: TableConfig = {
    columns: [
      { title: "name", dataField: "vendor_name", sortable: true, sort_direction: 'desc' },
      { title: "amount", dataField: "amount", type: 'price' },
      { title: "status", dataField: "withdrawal_status" },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' }
    ],
    rowActions: [
      { label: "View", actionToPerform: "view", icon: "ri-eye-line" },
    ],
    data: [] as Withdrawal[],
    total: 0
  };

  constructor(private store: Store) {
    if(this.store.selectSnapshot(state => state.account.roleName === 'vendor')){
      this.store.dispatch(new GetVendorTransaction())
    }
  }

  ngOnInit() {
    this.withdrawal$.subscribe(withdrawal => {
      let withdrawals = withdrawal?.data?.filter((element: Withdrawal) => {
        element.vendor_name = element?.user?.name;
        element.withdrawal_status = element.status ? `<div class="status-${element.status}"><span>${element.status.replace(/_/g, " ")}</span></div>` : '-';
        return element;
      });
      this.tableConfig.data = withdrawal ? withdrawals : [];
      this.tableConfig.total = withdrawal ? withdrawal?.total : 0;
    });
  }

  onActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'view')
      this.PayoutModal.openModal(action.data);
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetWithdrawRequest(data));
  }

  approved(event: any) {
    this.store.dispatch(new UpdateWithdrawStatus(event.data.id, event.status));
  }

}
