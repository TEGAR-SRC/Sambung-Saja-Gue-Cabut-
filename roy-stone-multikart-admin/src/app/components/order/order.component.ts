import { Component, Inject, Renderer2 } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { OrderState } from '../../shared/store/state/order.state';
import { DashboardState } from '../../shared/store/state/dashboard.state';
import { Observable } from 'rxjs';
import { Order, OrderModel } from '../../shared/interface/order.interface';
import { StatisticsCount } from '../../shared/interface/dashboard.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GetOrders } from '../../shared/store/action/order.action';
import { GetStatisticsCount } from '../../shared/store/action/dashboard.action';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule,
            HasPermissionDirective, PageWrapperComponent, TableComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  @Select(OrderState.order) order$: Observable<OrderModel>;
  @Select(DashboardState.statistics) statistics$: Observable<StatisticsCount>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "order_number", dataField: "order_id" },
      { title: "order_date", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' },
      { title: "customer_name", dataField: "consumer_name" },
      { title: "total_amount", dataField: "total", type: 'price' },
      { title: "payment_status", dataField: "order_payment_status" },
      { title: "payment_method", dataField: "payment_mode" }
    ],
    rowActions: [
      { label: "View", actionToPerform: "view", icon: "ri-eye-line", permission: "order.edit" }
    ],
    data: [],
    total: 0
  };
  public selectedStatus: string;
  public filterPills: any[] = [
    {
      value: 'pending',
      label: 'Pending',
      countKey: 'total_pending_orders',
      color: 'pending',
    },
    {
      value: 'processing',
      label: 'Processing',
      countKey: 'total_processing_orders',
      color: 'processing',

    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      countKey: 'total_cancelled_orders',
      color: 'cancel',
    },
    {
      value: 'shipped',
      label: 'Shipped',
      countKey: 'total_shipped_orders',
      color: 'shipped',
    },
    {
      value: 'out_for_delivery',
      label: 'Out for delivery',
      countKey: 'total_out_of_delivery_orders',
      color: 'out-delivery',
    },
    {
      value: 'delivered',
      label: 'Delivered',
      countKey: 'total_delivered_orders',
      color: 'completed',
    },
  ]

  public filter: Params = {}

  constructor(private store: Store, private activatedRoute: ActivatedRoute,
    private router: Router, private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this.order$.subscribe(order => {
      let orders = order?.data?.filter((element: Order) => {
        element.order_id = `<span class="fw-bolder">#${element?.order_number}</span>`;
        element.order_payment_status = element?.payment_status ? `<div class="status-${element.payment_status.toLowerCase()}"><span>${element.payment_status.replace(/_/g, " ")}</span></div>` : '-';
        element.payment_mode = element?.payment_method ? `<div class="payment-mode"><span>${element.payment_method.replace(/_/g, " ").toUpperCase()}</span></div>` : '-';
        element.consumer_name = `<span class="text-capitalize">${element?.consumer?.name}</span>`;
        return element;
      });
      this.tableConfig.data = order ? orders : [];
      this.tableConfig.total = order ? order?.total : 0;
    });

    this.statistics$.subscribe((statistics:any) => {
      this.filterPills.forEach((status, index) => {
        const countKey = status.countKey;
        if (statistics.hasOwnProperty(countKey)) {
          status['count'] = statistics[countKey];
        }
      });
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.filter = {...this.filter, status : params['status'] ? params['status'] : ''};
      this.selectedStatus = params['status'];
      this.store.dispatch(new GetOrders(this.filter));
    })
  }

  onTableChange(data?: Params) {
    const startDate = data && data['start_date'] ? data['start_date'] : '';
    const endDate = data && data['end_date'] ? data['end_date'] : '';
    const status = this.selectedStatus ? this.selectedStatus : '';

    this.filter = { ...this.filter, ...data, start_date: startDate, end_date: endDate };
    this.filter['status'] = status;

    this.store.dispatch(new GetOrders(this.filter));
    this.store.dispatch(new GetStatisticsCount({ start_date: startDate, end_date: endDate, status: status }));
  }

  onActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'view')
      this.view(action.data)
  }

  view(data: Order) {
    this.router.navigateByUrl(`/order/details/${data.order_number}`);
  }

  filterOrder(status: string) {
    this.renderer.addClass(this.document.body, 'loader-none');
    this.router.navigate([], {
      queryParams: {
        'status': status ? status : null,
      },
      queryParamsHandling: 'merge'
    });
  }

}
