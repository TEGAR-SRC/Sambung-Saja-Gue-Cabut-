import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TaxState } from '../../shared/store/state/tax.state';
import { Observable } from 'rxjs';
import { Tax, TaxModel } from '../../shared/interface/tax.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { Params, Router, RouterModule } from '@angular/router';
import { DeleteAllTax, DeleteTax, GetTaxes, UpdateTaxStatus } from '../../shared/store/action/tax.action';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-tax',
  standalone: true,
  imports: [TranslateModule, RouterModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent
  ],
  templateUrl: './tax.component.html',
  styleUrl: './tax.component.scss'
})
export class TaxComponent {

  @Select(TaxState.tax) tax$: Observable<TaxModel>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "tax.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "tax.destroy" },
    ],
    data: [] as Tax[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.tax$.subscribe(tax => {
      this.tableConfig.data = tax ? tax?.data : [];
      this.tableConfig.total = tax ? tax?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetTaxes(data));
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

  edit(data: Tax) {
    this.router.navigateByUrl(`/tax/edit/${data.id}`);
  }

  status(data: Tax) {
    this.store.dispatch(new UpdateTaxStatus(data.id, data.status));
  }

  delete(data: Tax) {
    this.store.dispatch(new DeleteTax(data.id));
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllTax(ids));
  }

}
