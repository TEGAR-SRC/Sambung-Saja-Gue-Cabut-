import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../shared/store/state/product.state';
import { SettingState } from '../../shared/store/state/setting.state';
import { CategoryState } from '../../shared/store/state/category.state';
import { BrandState } from '../../shared/store/state/brand.state';
import { StoreState } from '../../shared/store/state/store.state';
import { AccountState } from '../../shared/store/state/account.state';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../shared/interface/product.interface';
import { Values } from '../../shared/interface/setting.interface';
import { CategoryModel } from '../../shared/interface/category.interface';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';
import { AccountUser } from '../../shared/interface/account.interface';
import { ImportCsvModalComponent } from '../../shared/components/ui/modal/import-csv-modal/import-csv-modal.component';
import { DigitalDownloadModalComponent } from '../../shared/components/ui/modal/digital-download-modal/digital-download-modal.component';
import { Params, Router, RouterModule } from '@angular/router';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GetCategories } from '../../shared/store/action/category.action';
import { GetBrands } from '../../shared/store/action/brand.action';
import { GetStores } from '../../shared/store/action/store.action';
import { ApproveProductStatus, DeleteAllProduct, DeleteProduct, Download, ExportProduct, GetProducts, ReplicateProduct, UpdateProductStatus } from '../../shared/store/action/product.action';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { AdvanceDropdownComponent } from '../../shared/components/ui/advance-dropdown/advance-dropdown.component';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, HasPermissionDirective,
            Select2Module, PageWrapperComponent, TableComponent,
            AdvanceDropdownComponent, ImportCsvModalComponent, DigitalDownloadModalComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(BrandState.brands) brand$: Observable<Select2Data>;
  @Select(StoreState.stores) store$: Observable<Select2Data>;
  @Select(AccountState.user) user$: Observable<AccountUser>;

  @ViewChild("csvModal") CSVModal: ImportCsvModalComponent;
  @ViewChild("downloadModal") DownloadModal: DigitalDownloadModalComponent;

  public mainProductType: Select2Data = [{
    value: 'physical',
    label: 'Physical Product',
  }, {
    value: 'digital',
    label: 'Digital Product',
  }, {
    value: 'external',
    label: 'External/Affiliate product',
  }];

  public filter: Params = {
    'search': '',
    'field': '',
    'category_ids': '',
    'brand_ids': '',
    'store_ids': '',
    'sort': '', // current Sorting Order
    'page': 1, // current page number
    'paginate': 15, // Display per page,
  };

  public advanceFilter: any[] = []


  public url: string;
  public open: boolean = true;

  public tableConfig: TableConfig = {
    columns: [
      { title: "image", dataField: "product_thumbnail", class: 'tbl-image', type: 'image', placeholder: 'assets/images/product.png' },
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "sku", dataField: "sku", sortable: true, sort_direction: 'desc' },
      { title: "price", dataField: "sale_price", type: 'price', sortable: true, sort_direction: 'desc' },
      { title: "stock", dataField: "stock" },
      { title: "store", dataField: "store_name" },
      { title: "approved", dataField: "is_approved", type: "switch", canAllow: ['admin'] },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "product.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "product.destroy" },
      { label: "View", actionToPerform: "view", icon: "ri-eye-line" },
      { label: "Download", actionToPerform: "download", icon: "ri-download-2-line", permission: "product.edit", conditional: { field: 'is_file', condition: "!=", value: '0' } }
    ],
    data: [] as Product[],
    total: 0
  };

  constructor(private store: Store,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router) {
    this.setting$.subscribe(setting => {
      this.url = setting.general.site_url;
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetCategories({ status: 1 }))
    this.store.dispatch(new GetBrands({ status: 1 }))
    this.store.dispatch(new GetStores({ status: 1 }))
    this.product$.subscribe(product => {
      let products = product?.data?.filter((element: Product) => {
        element.stock = element.stock_status ? `<div class="status-${element.stock_status}"><span>${element.stock_status.replace(/_/g, " ")}</span></div>` : '-';
        element.store_name = element?.store ? element?.store?.store_name : '-';
        return element;
      });
      this.tableConfig.data = product ? products : [];
      this.tableConfig.total = product ? product?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.filter = { ...this.filter, ...data }
    this.store.dispatch(new GetProducts(this.filter));
  }

  applyFilter(data: Select2UpdateEvent) {
    this.filter['product_type'] = data && data.value ? data.value : null;
    if (!this.filter['product_type']) {
      delete this.filter['product_type'];
    }
    this.onTableChange(this.filter);
  }

  onActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'edit')
      this.edit(action.data)
    else if (action.actionToPerform == 'is_approved')
      this.approve(action.data)
    else if (action.actionToPerform == 'status')
      this.status(action.data)
    else if (action.actionToPerform == 'delete')
      this.delete(action.data)
    else if (action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)
    else if (action.actionToPerform == 'duplicate')
      this.duplicate(action.data)
    else if (action.actionToPerform == 'download')
      this.download(action.data)
    else if (action.actionToPerform == 'view')
      this.view(action.data)
  }

  edit(data: Product) {
    this.router.navigateByUrl(`/product/edit/${data.id}`);
  }

  approve(data: Product) {
    this.store.dispatch(new ApproveProductStatus(data.id, data.is_approved));
  }

  status(data: Product) {
    this.store.dispatch(new UpdateProductStatus(data.id, data.status));
  }

  delete(data: Product) {
    this.store.dispatch(new DeleteProduct(data.id));
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllProduct(ids));
  }

  duplicate(ids: number[]) {
    this.store.dispatch(new ReplicateProduct(ids));
  }

  download(data: Product) {
    if (data?.variations?.length) {
      this.DownloadModal.openModal(data);
    } else {
      this.store.dispatch(new Download({ product_id: data.id, variation_id: null }));
    }
  }

  view(data: Product) {
    window.open(this.url + '/product/' + data.slug, "_blank");
  }

  export() {
    this.store.dispatch(new ExportProduct(this.filter));
  }

  openFilter() {
    this.open = !this.open;
  }

  selectItem(data: number[]) {
    this.renderer.addClass(this.document.body, 'loader-none');
    if (Array.isArray(data) && data.length) {
      this.filter['category_ids'] = data.join();
    } else {
      this.filter['category_ids'] = []
    }
    this.onTableChange(this.filter);
  }

  filters(data: any, key: string) {
    this.renderer.addClass(this.document.body, 'loader-none');
    if (data && data.value) {
      this.filter[key] = data.value.join();
    } else {
      this.filter[key] = [];
    }
    this.onTableChange(this.filter);
  }

}
