import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { Kids } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBannerComponent } from '../widgets/theme-banner/theme-banner.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeFourColumnProductComponent } from '../widgets/theme-four-column-product/theme-four-column-product.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeParallaxBannerComponent } from '../widgets/theme-parallax-banner/theme-parallax-banner.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [CommonModule, ThemeHomeSliderComponent, ThemeBannerComponent,
            ThemeTitleComponent, ThemeProductComponent, ThemeParallaxBannerComponent,
            ThemeFourColumnProductComponent, ThemeSocialMediaComponent, ThemeBrandComponent,
            ImageLinkComponent],
  templateUrl: './kids.component.html',
  styleUrl: './kids.component.scss'
})
export class KidsComponent {

  @Input() data?: Kids;
  @Input() slug?: string;

  constructor(
    private store: Store,
    public themeOptionService: ThemeOptionService) {
  }

  ngOnInit() {
    if(this.data?.slug == this.slug) {

      // Get Products
      let getProducts$;
      if(this.data?.content?.products_ids?.length && (this.data?.content?.products_list?.status || this.data?.content?.slider_products?.status)){
        getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve:1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      }else{
        getProducts$ = of(null);
      }

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
      forkJoin([getProducts$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
  }
}
