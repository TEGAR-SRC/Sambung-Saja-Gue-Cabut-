import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CurrencyState } from '../../shared/store/state/currency.state';
import { Observable } from 'rxjs';
import { Currency, CurrencyModel } from '../../shared/interface/currency.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { Params, Router, RouterModule } from '@angular/router';
import { DeleteAllCurrency, DeleteCurrency, GetCurrencies, UpdateCurrencyStatus } from '../../shared/store/action/currency.action';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [TranslateModule, RouterModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent {

  @Select(CurrencyState.currency) currency$: Observable<CurrencyModel>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "code", dataField: "code", sortable: true, sort_direction: 'desc' },
      { title: "symbol", dataField: "symbol" },
      { title: "exchange_rate", dataField: "exchange_rate" },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "currency.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "currency.destroy" },
    ],
    data: [] as Currency[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit(): void {
    this.currency$.subscribe(currency => {
      this.tableConfig.data = currency ? currency?.data : [];
      this.tableConfig.total = currency ? currency?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetCurrencies(data));
  }

  onActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'edit')
      this.edit(action.data)
    else if(action.actionToPerform == 'status')
      this.status(action.data)
    else if(action.actionToPerform == 'delete')
      this.delete(action.data)
    else if(action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)
  }

  edit(data: Currency) {
    this.router.navigateByUrl(`/currency/edit/${data.id}`);
  }

  status(data: Currency) {
    this.store.dispatch(new UpdateCurrencyStatus(data.id, data.status));
  }

  delete(data: Currency) {
    this.store.dispatch(new DeleteCurrency(data.id));
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllCurrency(ids));
  }
}
