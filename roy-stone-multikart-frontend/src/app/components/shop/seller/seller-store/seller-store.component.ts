import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreService } from '../../../../shared/services/store.service';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { StoresModel } from '../../../../shared/interface/store.interface';
import { ThemeOptionState } from '../../../../shared/store/state/theme-option.state';
import { StoreState } from '../../../../shared/store/state/store.state';
import { breadcrumb } from '../../../../shared/interface/breadcrumb.interface';
import { GetStores } from '../../../../shared/store/action/store.action';
import { GetStoreProducts } from '../../../../shared/store/action/product.action';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../../../shared/components/widgets/pagination/pagination.component';
import { SellerStoreLogoComponent } from '../widgets/seller-store-logo/seller-store-logo.component';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { SellerStoreRatingComponent } from '../widgets/seller-store-rating/seller-store-rating.component';
import { SellerStoreProductsComponent } from '../widgets/seller-store-products/seller-store-products.component';
import { SellerStoreProductCountComponent } from '../widgets/seller-store-product-count/seller-store-product-count.component';
import { SellerContactDetailsComponent } from '../widgets/seller-contact-details/seller-contact-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonSellerComponent } from '../widgets/skeleton-seller/skeleton-seller.component';

@Component({
  selector: 'app-seller-store',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, PaginationComponent, RouterModule ,SellerStoreLogoComponent, NoDataComponent,
    SellerStoreProductCountComponent, SellerStoreProductsComponent, SellerStoreRatingComponent,
    SellerContactDetailsComponent, TranslateModule, SkeletonSellerComponent],
  templateUrl: './seller-store.component.html',
  styleUrl: './seller-store.component.scss'
})
export class SellerStoreComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;
  @Select(StoreState.store) store$: Observable<StoresModel>;

  public breadcrumb: breadcrumb = {
    title: "Seller Stores",
    items: [{ label: 'Seller Stores', active: true }]
  }
  public totalItems: number = 0;
  public filter = {
    'status': 1,
    'page': 1, // Current page number
    'paginate': 9, // Display per page,
  };

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);
  public layout: string = 'basic_store';

  constructor(public store: Store, private route: ActivatedRoute,
    public storeService: StoreService){

    // Params For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      this.store.dispatch(new GetStores(this.filter));
      this.store$.subscribe(store => this.totalItems = store?.total);

      if(params['layout']) {
        this.layout = params['layout'];
      } else {
        this.themeOptions$.subscribe(option => {
          this.layout = option.seller && option.seller.store_layout ? option.seller.store_layout : 'basic_store';
        });
      }
    });

    this.store$.subscribe(store => {
      const storeIds = store?.data.map(store => store.id);
      if(Array.isArray(storeIds) && storeIds.length){
        this.store.dispatch(new GetStoreProducts({ status: 1, store_ids: storeIds?.join(',')}));
      }
    })
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.store.dispatch(new GetStores(this.filter));
  }
}
