import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CommissionState } from '../../shared/store/state/commission.state';
import { Observable } from 'rxjs';
import { Commission, CommissionModel } from '../../shared/interface/commission.interface';
import { Params, Router } from '@angular/router';
import { GetCommission } from '../../shared/store/action/commission.action';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-commission',
  standalone: true,
  imports: [PageWrapperComponent, TableComponent],
  templateUrl: './commission.component.html',
  styleUrl: './commission.component.scss'
})
export class CommissionComponent {

  @Select(CommissionState.commission) commission$: Observable<CommissionModel>;

  public tableConfig = {
    columns: [
      { title: "order_id", dataField: "order_id"},
      { title: "store_name", dataField: "store_name"},
      { title: "admin_commission", dataField: "admin_commission", type: "price" },
      { title: "vendor_commission", dataField: "vendor_commission", type: "price" },
      { title: "created_at", dataField: "created_at", type: "date" },
    ],
    data: [] as Commission[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.commission$.subscribe(commission => {
      let commissions = commission?.data?.filter((element: Commission) => {
        element.store_name = `<span class="text-capitalize">${element.store.store_name}</span>`;
        element.order_id = `<span class="fw-bolder">#${element.order.order_number}</span>`;
        return element;
      });
      this.tableConfig.data = commission ? commissions : [];
      this.tableConfig.total = commission ? commission?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetCommission(data));
  }

}
