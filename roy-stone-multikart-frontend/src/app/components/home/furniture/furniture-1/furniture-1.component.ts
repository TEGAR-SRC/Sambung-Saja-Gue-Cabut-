import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';

import { ThemeBannerComponent } from '../../widgets/theme-banner/theme-banner.component';
import { ThemeBlogComponent } from '../../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeParallaxBannerComponent } from '../../widgets/theme-parallax-banner/theme-parallax-banner.component';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

import { ThemeOptionService } from '../../../../shared/services/theme-option.service';

import { FeaturedBanner, FurnitureOne } from '../../../../shared/interface/theme.interface';

import { forkJoin, of } from 'rxjs';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { GetBlogs } from '../../../../shared/store/action/blog.action';

@Component({
  selector: 'app-furniture-1',
  standalone: true,
  imports: [CommonModule, ThemeHomeSliderComponent, ThemeBannerComponent,
            ThemeTitleComponent, ThemeProductTabSectionComponent, ThemeParallaxBannerComponent,
            ThemeBlogComponent, ThemeBrandComponent, ImageLinkComponent],
  templateUrl: './furniture-1.component.html',
  styleUrl: './furniture-1.component.scss'
})
export class Furniture1Component {

  @Input() data?: FurnitureOne;
  @Input() slug?: string;

  public banners: FeaturedBanner[];

  constructor(
    private store: Store,
    private themeOptionService: ThemeOptionService) {
  }

  ngOnChanges() {
    if(this.data?.slug == this.slug) {

      this.banners = [];
      if(this.data?.content?.offer_banner?.banner_1?.status){
        this.banners = [...this.banners, this.data?.content?.offer_banner?.banner_1]
      }
      if(this.data?.content?.offer_banner?.banner_2?.status){
        this.banners = [...this.banners, this.data?.content?.offer_banner?.banner_2]
      }
      if(this.data?.content?.offer_banner?.banner_3?.status){
        this.banners = [...this.banners, this.data?.content?.offer_banner?.banner_3]
      }

      // Get Category
      let getCategory$;
      if(this.data?.content.category_product?.status && this.data?.content.category_product.category_ids?.length){
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: this.data?.content.category_product.category_ids?.join(',')
        }));
      } else { getCategory$ = of(null); };

      // Get Brand
      let getBrands$;
      if(this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids?.length){
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null); }

      // Get Blog
      let getBlog$;
      if(this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status){
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else { getBlog$ = of(null); }
      
      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getCategory$, getBrands$, getBlog$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
  }
}
