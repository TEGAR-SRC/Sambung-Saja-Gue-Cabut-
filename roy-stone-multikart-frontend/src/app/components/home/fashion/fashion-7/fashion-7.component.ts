import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, forkJoin } from 'rxjs';

import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';
import { ThemeBannerComponent } from '../../widgets/theme-banner/theme-banner.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

import { productSlider } from '../../../../shared/data/owl-carousel';

import { CategoryModel } from '../../../../shared/interface/category.interface';
import { Params } from '../../../../shared/interface/core.interface';
import { Product, ProductModel } from '../../../../shared/interface/product.interface';
import { FashionSeven, FeaturedBanner } from '../../../../shared/interface/theme.interface';

import { ThemeOptionService } from '../../../../shared/services/theme-option.service';

import { GetMoreProduct, GetProductByIds, GetProducts } from '../../../../shared/store/action/product.action';

import { CategoryState } from '../../../../shared/store/state/category.state';
import { ProductState } from '../../../../shared/store/state/product.state';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-fashion-7',
  standalone: true,
  imports: [CommonModule, TranslateModule,ImageLinkComponent, ThemeTitleComponent,
            ThemeProductComponent, ProductBoxComponent, ThemeBannerComponent,
            ThemeBrandComponent, ButtonComponent],
  templateUrl: './fashion-7.component.html',
  styleUrl: './fashion-7.component.scss'
})
export class Fashion7Component {

  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(ProductState.moreProduct) moreProduct$: Observable<Product[]>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;

  @Input() data?: FashionSeven;
  @Input() slug?: string;

  public finished: boolean;
  public total_product: number;
  public button_loader: boolean = false;
  public options = productSlider;
  public products: number;
  public banners: FeaturedBanner[];

  private productSubscription: Subscription;
  private productsSubscription: Subscription;
  public StorageURL = environment.storageURL;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 4, // Display per page,
    'status': 1,
    'approve': 1,
    'category_id': '',
  }

  constructor(
    private store: Store,
    private themeOptionService: ThemeOptionService) {
    }

    ngOnInit() {
      if(this.data?.slug == this.slug) {
        this.filter['category_id'] = this.data?.content.products_list_1.category_id;
        this.productsSubscription = this.product$.subscribe((product) => {
          if(product && product.total){
            this.total_product = product.total;
          }
        })

      this.productSubscription = this.moreProduct$.subscribe((product) => {
        if(product && product.length){
          this.products = product.length;
        }

        if(this.total_product != this.products){
          this.finished = false;
        }else{
          this.finished = true
        }
      })

      this.banners = [];
      if(this.data?.content?.featured_banners?.banner_1?.status){
        this.banners = [...this.banners, this.data?.content?.featured_banners?.banner_1]
      }
      if(this.data?.content?.featured_banners?.banner_2?.status){
        this.banners = [...this.banners, this.data?.content?.featured_banners?.banner_2]
      }
      if(this.data?.content?.featured_banners?.banner_3?.status){
        this.banners = [...this.banners, this.data?.content?.featured_banners?.banner_3]
      }

      this.options = {
        ...this.options,
        responsive: {
          0: {
            items: 1,
          },
          668: {
            items: 2,
          },
          992: {
            items: 3,
          }
        }
      }

      // Get Products
      const getProducts$ = this.store.dispatch(new GetProductByIds({
        status: 1,
        approve: 1,
        ids: this.data?.content?.products_ids?.join(','),
        paginate: this.data?.content?.products_ids?.length
      }));

      // Get Products
      const getMoreProducts$ = this.store.dispatch(new GetMoreProduct(this.filter));

      // Get Brand
      const getBrands$ = this.store.dispatch(new GetBrands({
        status: 1,
        ids: this.data?.content?.brand?.brand_ids?.join(',')
      }));

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBrands$, getMoreProducts$]).subscribe({
        complete: () => {
          this.store.dispatch(new GetProducts(this.filter));

          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
  }

  loadMore(value: number){
    if(this.products != this.total_product){
      this.button_loader = true;
      this.filter['page'] = this.filter['page'] + value;
      this.store.dispatch(new GetMoreProduct(this.filter, true)).subscribe({
        complete: () => {
          this.button_loader = false;
        }
      })
    }else{
      this.finished = true;
    }
  }

  ngOnDestroy() {
    if (this.productSubscription && this.productsSubscription) {
      this.productSubscription.unsubscribe();
      this.productsSubscription.unsubscribe();
    }
  }
}
