import { Component, Input } from '@angular/core';
import { Bag } from '../../../shared/interface/theme.interface';
import { Store } from '@ngxs/store';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { CommonModule } from '@angular/common';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { GetCategories } from '../../../shared/store/action/category.action';
import { Category } from '../../../shared/interface/category.interface';
import { ThemeParallaxBannerComponent } from '../widgets/theme-parallax-banner/theme-parallax-banner.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { SocialMediaSlider, bagsProduct, productSlider } from '../../../shared/data/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ThemeServicesComponent } from '../widgets/theme-services/theme-services.component';
import { ThemeBannerComponent } from '../widgets/theme-banner/theme-banner.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { TranslateModule } from '@ngx-translate/core';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [CommonModule, CarouselModule, TranslateModule,ThemeHomeSliderComponent, ThemeTitleComponent,
            ThemeProductTabSectionComponent, ThemeParallaxBannerComponent, ThemeProductComponent,
            ThemeServicesComponent, ThemeBannerComponent, ImageLinkComponent,
            ThemeBlogComponent, ThemeSocialMediaComponent, ThemeBrandComponent, CategoriesComponent,
            ButtonComponent],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss'
})
export class BagComponent {

  @Input() data?: Bag;
  @Input() slug?: string;

  public category: Category[];
  public options = bagsProduct;
  public StorageURL = environment.storageURL;

  constructor(
    private store: Store,
    private themeOptionService: ThemeOptionService) {
  }

  ngOnChanges() {
    if(this.data?.slug == this.slug) {

      let categoryIds = [...new Set(this.data?.content?.category?.category_ids.concat(this.data.content.category_product.category_ids))];

      // Get Products
      let getProduct$;
      if(this.data?.content?.products_ids.length){
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      }else {
        getProduct$ = of(null);
      }

      // Get Category
      let getCategory$;
      if(categoryIds.length && (this.data?.content?.category_product?.status || this.data?.content?.category?.status)){
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
      }else {
        getBlog$ = of(null);
      }

      // Get Brand
      let getBrands$;
      if(this.data?.content?.brand?.brand_ids.length && this.data?.content?.brand?.status){
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      }else {
        getBrands$ = of(null);
      }
     
      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProduct$, getCategory$, getBlog$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });

    }
  }
}
