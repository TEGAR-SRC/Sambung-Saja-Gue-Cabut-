import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CouponState } from '../../shared/store/state/coupon.state';
import { Observable } from 'rxjs';
import { Coupon, CouponModel } from '../../shared/interface/coupon.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { Params, Router, RouterModule } from '@angular/router';
import { DeleteAllCoupon, DeleteCoupon, GetCoupons, UpdateCouponStatus } from '../../shared/store/action/coupon.action';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [TranslateModule, RouterModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent
  ],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.scss'
})
export class CouponComponent {

  @Select(CouponState.coupon) coupon$: Observable<CouponModel>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "title", dataField: "title", sortable: true, sort_direction: 'desc' },
      { title: "code", dataField: "code", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "coupon.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "coupon.destroy" },
    ],
    data: [] as Coupon[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.coupon$.subscribe(coupon => {
      this.tableConfig.data = coupon ? coupon?.data : [];
      this.tableConfig.total = coupon ? coupon?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetCoupons(data)).subscribe();
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

  edit(data: Coupon) {
    this.router.navigateByUrl(`/coupon/edit/${data.id}`);
  }

  status(data: Coupon) {
    this.store.dispatch(new UpdateCouponStatus(data.id, data.status))
  }

  delete(data: Coupon) {
    this.store.dispatch(new DeleteCoupon(data.id))
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllCoupon(ids))
  }

}
