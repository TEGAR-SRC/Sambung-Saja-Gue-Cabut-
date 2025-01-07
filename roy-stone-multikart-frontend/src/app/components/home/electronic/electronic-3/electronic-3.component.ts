import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ElectronicThree } from '../../../../shared/interface/theme.interface';
import { CommonModule } from '@angular/common';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeServicesComponent } from '../../widgets/theme-services/theme-services.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { productSlider } from '../../../../shared/data/owl-carousel';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { Category } from '../../../../shared/interface/category.interface';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { ThemeBannerComponent } from '../../widgets/theme-banner/theme-banner.component';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { GetBrands } from '../../../../shared/store/action/brand.action';

@Component({
  selector: 'app-electronic-3',
  standalone: true,
  imports: [CommonModule, ThemeHomeSliderComponent, ThemeServicesComponent,
            ThemeProductComponent, ImageLinkComponent, ThemeBannerComponent,
            ThemeProductTabSectionComponent, ThemeBrandComponent, CategoriesComponent],
  templateUrl: './electronic-3.component.html',
  styleUrl: './electronic-3.component.scss'
})
export class Electronic3Component {

  @Input() data?: ElectronicThree;
  @Input() slug?: string;

  public options = productSlider;
  public categories: Category[];

  constructor(
    private store: Store,
    private themeOptionService: ThemeOptionService) {
  }

  ngOnChanges() {

    if(this.data?.slug == this.slug) {

      let categoryIds = [...new Set(this.data?.content?.category_product_1?.categories?.category_ids.concat(this.data.content.category_product_2.category_ids))];

      this.options = { 
        ...this.options, center : true,
      responsive: {
        ...this.options.responsive,
        999: {
          items: 5
        }
      }}

      // Get Products
      let getProduct$;
      if(this.data?.content?.products_ids?.length){
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      } else { getProduct$ = of(null); };


      // Get Category
      let getCategory$;
      if(categoryIds?.length) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }));
      } else { getCategory$ = of(null); };

      // Get Brand
      let getBrands$;
      if(this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids.length) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null); };
      
      // Skeleton Loader
      document.body.classList.add('skeleton-body');
    
      forkJoin([getProduct$, getCategory$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
  }
}
