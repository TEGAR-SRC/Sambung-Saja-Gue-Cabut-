import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from '../../../shared/interface/product.interface';
import { Category } from '../../../shared/interface/category.interface';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { ProductState } from '../../../shared/store/state/product.state';
import { CategoryState } from '../../../shared/store/state/category.state';
import { GetProducts } from '../../../shared/store/action/product.action';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { SidebarComponent } from '../collection/widgets/sidebar/sidebar.component';
import { CollectionProductsComponent } from '../collection/widgets/collection-products/collection-products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, SidebarComponent, CollectionProductsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(CategoryState.selectedCategory) category$: Observable<Category>;

  public breadcrumb: breadcrumb = {
    title: "Category",
    items: [{ label: '', active: false }]
  };
  public layout: string = 'collection_category_slider';
  public skeleton: boolean = true;
  public category: Category;
  public activeCategory: string | null;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 40, // Display per page,
    'status': 1,
    'field': 'created_at',
    'price': '',
    'category': '',
    'tag': '',
    'sort': 'asc', // ASC, DSC
    'sortBy': 'asc',
    'rating': '',
    'attribute': ''
  };

  private subscriptions: Subscription = new Subscription();
  public totalItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store) {
      if(this.route.snapshot.paramMap.get('slug')){
        this.activeCategory = this.route.snapshot.paramMap.get('slug')
        this.filter['category'] = this.activeCategory
      }
  }

  ngOnInit() {
    this.subscriptions.add(this.category$.subscribe(category => {
      this.category = category;
      this.updateBreadcrumb();
      this.updateFilterAndFetchProducts();
    }));

    this.filter['category'] = this.route.snapshot.paramMap.get('slug');
    this.store.dispatch(new GetProducts(this.filter));
  }

  private updateBreadcrumb() {
    this.breadcrumb.title = `Category: ${this.category?.name}`;
    this.breadcrumb.items[0].label = this.category?.name;
  }

  private updateFilterAndFetchProducts() {
    if (this.category) {
      this.filter['category'] = this.category.slug;
    }
    this.store.dispatch(new GetProducts(this.filter));
  }

  public changePage(page: number) {
    this.filter['category'] = page;
    this.updateFilterAndFetchProducts();
  }

  public changePaginate(paginate: number) {
    this.filter['paginate'] = paginate;
    this.updateFilterAndFetchProducts();
  }
}
