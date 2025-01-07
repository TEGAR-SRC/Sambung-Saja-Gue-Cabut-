import { Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../shared/interface/core.interface';
import { Refund, RefundModel } from '../../shared/interface/refund.interface';
import { RefundState } from '../../shared/store/state/refund.state';
import { GetRefund, UpdateRefundStatus } from '../../shared/store/action/refund.action';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { PayoutModalComponent } from '../../shared/components/ui/modal/payout-modal/payout-modal.component';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-refund',
  standalone: true,
  imports: [PageWrapperComponent, TableComponent, PayoutModalComponent],
  templateUrl: './refund.component.html',
  styleUrl: './refund.component.scss'
})
export class RefundComponent {

  @Select(RefundState.refund) refund$: Observable<RefundModel>;

  @ViewChild("payoutModal") PayoutModal: PayoutModalComponent;

  public tableConfig: TableConfig = {
    columns: [
      { title: "order_number", dataField: "order_id" },
      { title: "consumer_name", dataField: "consumer_name", sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "refund_status" },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' }
    ],
    rowActions: [
      { label: "View", actionToPerform: "view", icon: "ri-eye-line" },
    ],
    data: [] as Refund[],
    total: 0
  };

  constructor(private store: Store) { }

  ngOnInit() {
    this.refund$.subscribe(refund => {
      let refunds = refund?.data?.filter((element: Refund) => {
        element.consumer_name = element?.user?.name
        element.order_id = `<span class="fw-bolder">#${element?.order?.order_number}</span>`
        element.refund_status = element.status ? `<div class="status-${element.status}"><span>${element.status.replace(/_/g, " ")}</span></div>` : '-';
        return element;
      });
      this.tableConfig.data = refund ? refunds : [];
      this.tableConfig.total = refund ? refund?.total : 0;
    });
  }

  onActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'view')
      this.PayoutModal.openModal(action.data);
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetRefund(data));
  }

  approved(event: any) {
    this.store.dispatch(new UpdateRefundStatus(event.data.id, event.status));
  }


}
