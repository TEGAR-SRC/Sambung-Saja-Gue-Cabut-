import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin } from 'rxjs';

import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';
import { ThemeBannerComponent } from '../../widgets/theme-banner/theme-banner.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeSocialMediaComponent } from '../../widgets/theme-social-media/theme-social-media.component';

import { ThemeOptionService } from '../../../../shared/services/theme-option.service';

import { FashionFive, FeaturedBanner } from '../../../../shared/interface/theme.interface';
import { Category } from '../../../../shared/interface/category.interface';

import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';

import { SocialMediaSlider, productSlider } from '../../../../shared/data/owl-carousel';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';

@Component({
  selector: 'app-fashion-5',
  standalone: true,
  imports: [CommonModule,
            ImageLinkComponent, ThemeTitleComponent, ThemeBannerComponent,
            ThemeProductComponent, ThemeSocialMediaComponent, ThemeBrandComponent,
            CategoriesComponent, ThemeProductTabSectionComponent],
  templateUrl: './fashion-5.component.html',
  styleUrl: './fashion-5.component.scss'
})
export class Fashion5Component {

  @Input() data?: FashionFive;
  @Input() slug: string;

  public categories: Category[];
  public options = productSlider;
  public SocialMediaSlider = SocialMediaSlider;
  
  constructor(
    private store: Store,
    private themeOptionService: ThemeOptionService) {}

    ngOnChanges() {
      if(this.data?.slug == this.slug) {
        this.options = {
          ...this.options,
          responsive: {
            0: {
              items: 2,
              mouseDrag: true,
            },
            890: {
              items: 3,
              mouseDrag: true
            },
            999: {
              items: 4,
              mouseDrag: false,
              touchDrag: false
            }
          }
        }

        this.SocialMediaSlider = { ...this.SocialMediaSlider, center : true,
        responsive: {
          ...this.SocialMediaSlider.responsive,
          1367: {
            items: 5
          }
        }}

        let categoryIds = this.data?.content.categories?.category_ids.concat(this.data?.content.category_product?.category_ids);

        // Get Products
        const getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          is_approved: 1,
          ids: this.data.content.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));

        // Get Category
        const getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }));

        // Get Brand
      const getBrands$ = this.store.dispatch(new GetBrands({
        status: 1,
        ids: this.data?.content?.brand?.brand_ids?.join(',')
      }));

      forkJoin([getProducts$,getCategory$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

    // Skeleton Loader
    document.body.classList.add('skeleton-body');
  }
}
