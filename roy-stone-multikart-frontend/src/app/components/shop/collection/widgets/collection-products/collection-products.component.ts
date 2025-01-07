import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../../../shared/store/state/product.state';
import { Observable, Subscription } from 'rxjs';
import { Product, ProductModel } from '../../../../../shared/interface/product.interface';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ProductService } from '../../../../../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../../../../../shared/components/widgets/product-box/product-box.component';
import { CollectionSortComponent } from '../collection-sort/collection-sort.component';
import { CollectionPaginateComponent } from '../collection-paginate/collection-paginate.component';
import { NoDataComponent } from '../../../../../shared/components/widgets/no-data/no-data.component';
import { GetMoreProduct } from '../../../../../shared/store/action/product.action';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxElevenComponent } from '../../../../../shared/components/widgets/product-box/product-box-eleven/product-box-eleven.component';
import { SkeletonProductBoxComponent } from '../../../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component';

@Component({ 
  selector: 'app-collection-products',
  standalone: true,
  imports: [CommonModule, TranslateModule,ProductBoxComponent, CollectionSortComponent,
            CollectionPaginateComponent, NoDataComponent, InfiniteScrollModule, ProductBoxElevenComponent, SkeletonProductBoxComponent],
  templateUrl: './collection-products.component.html',
  styleUrl: './collection-products.component.scss'
})
export class CollectionProductsComponent {

  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(ProductState.moreProduct) moreProduct$: Observable<Product[]>;

  @Input() filter: Params;
  @Input() gridCol: string;
  @Input() topFilter: boolean = false;
  @Input() infiniteScroll: boolean = false;

  public gridClass: string = "col-xl-3 col-6";
  public listView: boolean = false;
  public products: number;
  public button_text: string;
  public total_product: number;
  public button_loader: boolean = false;
  public finished: boolean = false  // boolean when end of data is reached

  private productSubscription: Subscription;
  private moreProductSubscription: Subscription;

  public skeletonItems = Array.from({ length: 40 }, (_, index) => index);

  public scrollFilter: Params = {
    'page': 1,
    'paginate': 9
  }

  public pagination: number = 9;

  constructor(
    private store: Store,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    }

    ngOnChanges(){
      this.route.queryParams.subscribe( () => {
        this.total_product = 0;
        this.productSubscription = this.product$.subscribe((product) => {
        if(product && product.total){
          this.total_product = product.total;
        }
    })

    if(this.filter['layout'] == 'collection_product_infinite_scroll'){
      this.moreProductSubscription = this.moreProduct$.subscribe((product) => {
        if(product && product.length){
          this.products = product.length;
        }
        if(this.total_product != this.products){
          this.finished = false;
        }else{
          this.finished = true
        }
      })
      this.scrollFilter = {
        ...this.filter,
        'page': this.scrollFilter['page'],
        'paginate': this.scrollFilter['paginate']
      }
    }

    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        if (this.productSubscription && this.moreProductSubscription) {
          this.productSubscription.unsubscribe();
          this.moreProductSubscription.unsubscribe();
        }
      }
    });
    })
  }

  setGridClass(value: {class: string, list_view: boolean}) {
     this.gridClass = value.class;
    this.listView = value.list_view;
  }

  onScroll(value: number){
    if(this.products != this.total_product){
      this.button_loader = true;
      this.scrollFilter['page'] = this.scrollFilter['page'] + value;
      this.store.dispatch(new GetMoreProduct(this.scrollFilter, true)).subscribe({
        complete: () => {
          this.button_loader = false;
        }
      })
    }else{
      this.finished = true;
    }
  }

  ngOnDestroy() {
    if (this.productSubscription && this.moreProductSubscription) {
      this.productSubscription.unsubscribe();
      this.moreProductSubscription.unsubscribe();
    }
  }
}
