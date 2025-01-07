import { Component, Inject, Renderer2 } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoaderState } from '../../../shared/store/state/loader.state';
import { CategoryState } from '../../../shared/store/state/category.state';
import { ProductState } from '../../../shared/store/state/product.state';
import { CartState } from '../../../shared/store/state/cart.state';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { ProductModel } from '../../../shared/interface/product.interface';
import { Category, CategoryModel } from '../../../shared/interface/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NavService } from '../../../shared/services/nav.service';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetCartItems, UpdateCart } from '../../../shared/store/action/cart.action';
import { Params, RouterModule } from '@angular/router';
import { GetProducts } from '../../../shared/store/action/product.action';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { AdvanceDropdownComponent } from '../../../shared/components/ui/advance-dropdown/advance-dropdown.component';
import { ProductBoxSkeletonComponent } from '../../../shared/components/ui/skeleton/product-box-skeleton/product-box-skeleton.component';
import { ProductBoxComponent } from '../../../shared/components/ui/product-box/product-box.component';
import { PaginationComponent } from '../../../shared/components/ui/pagination/pagination.component';
import { NoDataComponent } from '../../../shared/components/ui/no-data/no-data.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { HasPermissionDirective } from '../../../shared/directive/has-permission.directive';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, TranslateModule, CarouselModule,
            RouterModule, CurrencySymbolPipe, HasPermissionDirective,
            FormsModule, ReactiveFormsModule,
            LoaderComponent, AdvanceDropdownComponent, ProductBoxSkeletonComponent,
            ProductBoxComponent, PaginationComponent, NoDataComponent,
            ButtonComponent
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent {

  @Select(LoaderState.status) loadingStatus$: Observable<boolean>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(CartState.cartTotal) cartTotal$: Observable<number>;

  public skeletonItems = Array.from({ length: this.navServices.collapseSidebar ? 10 : 8 }, (_, index) => index);
  public activeCategory: Category | null;
  public selectedCategory: Number[] = [];
  public totalItems: number = 0;
  public filter = {
    'search': '',
    'field': '',
    'sort': '', // current Sorting Order
    'page': 1, // current page number
    'paginate': 20, // Display per page,
    'category_ids': '',
    "is_approved": 1
  };

  public customOptions: OwlOptions = {
    loop: true,
    margin: 15,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  public term = new FormControl();
  public loading: boolean = true;

  constructor(private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public navServices: NavService) {

    this.store.dispatch(new GetCategories({type: 'product', status: 1}));
    this.product$.subscribe(product => this.totalItems = product?.total);
    this.getProducts(this.filter, true);
    this.store.dispatch(new GetCartItems());

    this.term.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(
        (data: string) => {
          this.filter.search = data
          this.getProducts(this.filter);
      });
  }

  getProducts(filter: Params, loader?: boolean) {
    this.loading = true;
    filter['status'] = 1;
    this.store.dispatch(new GetProducts(filter)).subscribe({
      complete: () => {
        this.loading = false;
      }
    });
    if(!loader)
      this.renderer.addClass(this.document.body, 'loader-none');
  }

  selectCategory(data: Category) {
    this.activeCategory = this.activeCategory?.id != data?.id ? data : null;
    this.selectedCategory = [];
    this.filter.category_ids = String(this.activeCategory ? this.activeCategory?.id! : '')
    this.filter.page = 1;
    this.getProducts(this.filter);
  }

  selectCategoryItem(data: Number[]) {
    this.activeCategory = null;
    this.filter.category_ids = data.join();
    this.getProducts(this.filter);
  }

  updateQuantity(item: Cart, qty: number) {
    this.renderer.addClass(this.document.body, 'loader-none');
    const params: CartAddOrUpdate = {
      id: item?.id,
      product_id: item?.product?.id!,
      variation_id: item?.variation_id ? item?.variation_id : "",
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.getProducts(this.filter);
  }

  ngOnDestroy() {
    this.navServices.collapseSidebar = false;
    this.renderer.removeClass(this.document.body, 'loader-none');
  }
}
