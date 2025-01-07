import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subscription } from 'rxjs';

import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';

import { Category, CategoryModel } from '../../../../shared/interface/category.interface';
import { Params } from '../../../../shared/interface/core.interface';
import { Product } from '../../../../shared/interface/product.interface';

import { GetCategoryProducts } from '../../../../shared/store/action/product.action';

import { CategoryState } from '../../../../shared/store/state/category.state';
import { ProductState } from '../../../../shared/store/state/product.state';

import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { productSlider4 } from '../../../../shared/data/owl-carousel';
import { ProductTabSection } from '../../../../shared/interface/theme.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { SkeletonProductBoxComponent } from '../../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component';

@Component({
  selector: 'app-theme-product-tab-section',
  standalone: true,
  imports: [CommonModule, ProductBoxComponent, CarouselModule, NoDataComponent, CategoriesComponent, SkeletonProductBoxComponent],
  templateUrl: './theme-product-tab-section.component.html',
  styleUrl: './theme-product-tab-section.component.scss'
})
export class ThemeProductTabSectionComponent {

  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(ProductState.categoryProducts) product$: Observable<Product[]>;

  @Input() categoryIds?: number[];
  @Input() slider: boolean = false;
  @Input() style: string;
  @Input() tab_title_class: string;
  @Input() tab_style: string;
  @Input() showItems: number = 4;
  @Input() class: string = 'row row-cols-xl-4 row-cols-md-3 row-cols-2 g-md-4 g-3';
  @Input() type: string;
  @Input() title: ProductTabSection | undefined;
  @Input() product_box_style: string;
  @Input() options: OwlOptions = productSlider4;

  public skeletonItems = Array.from({ length: this.showItems ? this.showItems : this.showItems ? this.showItems : 4 }, (_, index) => index);

  public categories: Category[];
  public categoryProduct: Category[];
  public activeCategory: number;
  private categorySubscription: Subscription

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 4, // Display per page,
    'status': 1,
    'category_id': '',
  };

  constructor(private store: Store, public productService: ProductService) {}

  ngOnChanges(){
    // Get Category
    this.filter['paginate'] = this.showItems;
    this.skeletonItems = Array.from({ length: this.showItems ? this.showItems : this.showItems ? this.showItems : 4 }, (_, index) => index);
    if(this.categoryIds && this.categoryIds.length) {
      this.categorySubscription = this.category$.subscribe((res) => {
        if(res){
          this.categories = res.data.filter(category => this.getCategory(category))

          if(this.categories.length){
            this.activeCategory = this.categories[0].id;

            this.filter['category_id'] = this.categories[0].id;

            if(this.filter['category_id']){
              this.store.dispatch(new GetCategoryProducts(this.filter));
            }
          }
        }
      })
    }
  }

  getCategory(category: Category) {
    if(this.categoryIds?.includes(category.id)) {
      if(category){
        return category;
      }
    }

    if(category.subcategories?.length){
      category.subcategories.map((subcategory) => {
        this.getCategory(subcategory)
      })
    }
  }

  changeTab(value: Category){
    this.activeCategory = value.id;

    this.filter['category_id'] = value.id,

    this.store.dispatch(new GetCategoryProducts(this.filter));
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
