import { Component } from '@angular/core';
import { Params, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { Brand, BrandModel } from '../../shared/interface/brand.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { DeleteAllBrand, DeleteBrand, GetBrands, UpdateBrandStatus } from '../../shared/store/action/brand.action';
import { BrandState } from '../../shared/store/state/brand.state';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [TranslateModule, RouterModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent
  ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {

  @Select(BrandState.brand) brand$: Observable<BrandModel>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "image", dataField: "brand_image", class: 'tbl-image', type: 'image', placeholder: 'assets/images/product.png' },
      { title: "Name", dataField: "name", sortable: true, sort_direction: 'desc'  },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "brand.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "brand.destroy" },
    ],
    data: [] as Brand[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.brand$.subscribe(brand => {
      this.tableConfig.data  = brand ? brand?.data  : [];
      this.tableConfig.total = brand ? brand?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetBrands(data));
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

  edit(data: Brand) {
    this.router.navigateByUrl(`/brand/edit/${data.id}`);
  }

  status(data: Brand) {
    this.store.dispatch(new UpdateBrandStatus(data.id, data.status));
  }

  delete(data: Brand) {
    this.store.dispatch(new DeleteBrand(data.id));
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllBrand(ids));
  }

}
