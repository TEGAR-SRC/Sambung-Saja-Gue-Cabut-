import { Component, Input } from '@angular/core';
import { Bicycle } from '../../../shared/interface/theme.interface';
import { Store } from '@ngxs/store';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { forkJoin, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { productSlider } from '../../../shared/data/owl-carousel';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeBannerComponent } from '../widgets/theme-banner/theme-banner.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-bicycle',
  standalone: true,
  imports: [CommonModule, ThemeHomeSliderComponent, ThemeTitleComponent,
            ThemeProductComponent, ThemeProductTabSectionComponent, ThemeBannerComponent,
            ThemeSocialMediaComponent, ThemeBrandComponent, ImageLinkComponent],
  templateUrl: './bicycle.component.html',
  styleUrl: './bicycle.component.scss'
})
export class BicycleComponent {

  @Input() data?: Bicycle;
  @Input() slug?: string;

  public options = productSlider;
  public StorageURL = environment.storageURL;

  constructor(
    private store: Store,
    public themeOptionService: ThemeOptionService) {
  }

  ngOnInit() {
    if(this.data?.slug == this.slug) {

      this.options = {
        ...this.options,
        center: true,
        nav: true,
        navText: ["<i class='ri-arrow-left-s-line'></i>","<i class='ri-arrow-right-s-line'></i>",],
        responsive: {
          0: {
            items: 1
          },
          992: {
            items: 3
          }
        }
      }

      // Get Products
      let getProduct$;
      if(this.data?.content?.products_ids && this.data?.content?.products_list?.status){
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
      if(this.data?.content.category_product.category_ids.length && this.data?.content?.category_product?.status){
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: this.data?.content.category_product.category_ids?.join(',')
        }));
      }else {
        getCategory$ = of(null);
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

      forkJoin([getProduct$, getCategory$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

  }
}
