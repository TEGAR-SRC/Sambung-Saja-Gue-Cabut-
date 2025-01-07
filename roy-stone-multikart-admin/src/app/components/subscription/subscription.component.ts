import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SubscriptionState } from '../../shared/store/state/subscription.state';
import { GetSubscriptionList } from '../../shared/store/action/subscription.action';
import { TableConfig } from '../../shared/interface/table.interface';
import { Subscription, SubscriptionModel } from '../../shared/interface/subscription.interface';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [PageWrapperComponent, TableComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {

  @Select(SubscriptionState.subscribeList) subscribe$: Observable<SubscriptionModel>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "email", dataField: "email", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' }
    ],
    data: [] as Subscription[],
    total: 0
  };

  constructor(private store: Store){ }

  ngOnInit() {
    this.subscribe$.subscribe(subscribe => {
      this.tableConfig.data = subscribe ? subscribe?.data : [];
      this.tableConfig.total = subscribe ? subscribe?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetSubscriptionList(data!));
  }

}
