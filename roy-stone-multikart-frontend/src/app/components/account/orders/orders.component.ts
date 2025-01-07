import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { OrderState } from '../../../shared/store/state/order.state';
import { Observable } from 'rxjs';
import { OrderModel } from '../../../shared/interface/order.interface';
import { Params, RouterModule } from '@angular/router';
import { GetOrders } from '../../../shared/store/action/order.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency.pipe';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule,
            CurrencySymbolPipe, PaginationComponent, NoDataComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  @Select(OrderState.order) order$: Observable<OrderModel>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  constructor(private store: Store) {
    this.store.dispatch(new GetOrders(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new GetOrders(this.filter));
  }

}
