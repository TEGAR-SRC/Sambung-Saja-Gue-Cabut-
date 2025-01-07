import { Component, Input } from '@angular/core';
import { Books } from '../../../shared/interface/theme.interface';
import { Store } from '@ngxs/store';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { forkJoin, of } from 'rxjs';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { GetCategories } from '../../../shared/store/action/category.action';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { CommonModule } from '@angular/common';
import { ThemeFourColumnProductComponent } from '../widgets/theme-four-column-product/theme-four-column-product.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,ThemeHomeSliderComponent, CategoriesComponent, ThemeTitleComponent,
            ThemeProductTabSectionComponent, ThemeFourColumnProductComponent, ImageLinkComponent,
            ThemeProductComponent, ThemeBlogComponent, ThemeBrandComponent
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

  @Input() data?: Books;
  @Input() slug?: string;

  public StorageURL = environment.storageURL;

  constructor(
    private store: Store,
    public themeOptionService: ThemeOptionService) {
  }

  ngOnInit() {
    if(this.data?.slug == this.slug) {

      let categoryIds = [...new Set(this.data?.content?.categories_1?.category_ids.concat(this.data.content.category_product.category_ids, this.data?.content?.categories_2?.category_ids))];

      // Get Products
      let getProducts$;
      if(this.data?.content?.products_ids?.length && (this.data?.content?.products_list?.status || this.data?.content?.slider_products?.status)){
        getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      }else{
        getProducts$ = of(null);
      }

      // Get Category
      let getCategory$;
      if(categoryIds.length && (this.data?.content?.category_product?.status || this.data?.content?.categories_1?.category_ids || this.data?.content?.categories_2?.category_ids)){
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }));
      }else {
        getCategory$ = of(null);
      }

      // Get Blog
      let getBlog$;
      if(this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status){
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else { getBlog$ = of(null); }

      // Get Brand
      let getBrands$;
      if(this.data?.content?.brand?.brand_ids?.length && this.data?.content?.brand?.status){
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      }else{
        getBrands$ = of(null);
      }

      // Skeleton Loader
      document.body.classList.add('skeleton-body');
      forkJoin([getProducts$, getCategory$, getBrands$, getBlog$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

    // header light
    document.body.classList.add('header-style-light');
  }

  ngOnDestroy(){
    document.body.classList.remove('header-style-light');
  }

}
