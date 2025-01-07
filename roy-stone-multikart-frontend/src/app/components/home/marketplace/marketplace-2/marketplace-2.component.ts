import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { FeaturedBanner, MarketplaceTwo } from '../../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeBannerComponent } from '../../widgets/theme-banner/theme-banner.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';
import { ThemeFourColumnProductComponent } from '../../widgets/theme-four-column-product/theme-four-column-product.component';
import { ThemeServicesComponent } from '../../widgets/theme-services/theme-services.component';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';

@Component({
  selector: 'app-marketplace-2',
  standalone: true,
  imports: [CommonModule, ThemeHomeSliderComponent, ThemeBannerComponent,
            ThemeProductComponent, ThemeTitleComponent, ThemeFourColumnProductComponent,
            ThemeServicesComponent, ImageLinkComponent, ThemeBrandComponent],
  templateUrl: './marketplace-2.component.html',
  styleUrl: './marketplace-2.component.scss'
})
export class Marketplace2Component {

  @Input() data?: MarketplaceTwo;
  @Input() slug?: string;

  public banners: FeaturedBanner[];

  constructor(
    private store: Store,
    private themeOptionService: ThemeOptionService) {
  }

  ngOnInit() {
    if(this.data?.slug == this.slug) {

      this.banners = [];
      if(this.data?.content?.offer_banner_1?.banner_1?.status){
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_1]
      }
      if(this.data?.content?.offer_banner_1?.banner_2?.status){
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_2]
      }
      if(this.data?.content?.offer_banner_1?.banner_3?.status){
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_3]
      }
      if(this.data?.content?.offer_banner_1?.banner_4?.status){
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_4]
      }

      // Get Products
      let getProduct$;
      if(this.data?.content?.products_ids?.length){
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve:1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        })) 
      } else { getProduct$ = of(null)}


      // Get Brand
      let getBrands$;
      if(this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids){
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null)}

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      // color header class
      document.body.classList.add('header-theme-color');
 
      forkJoin([getProduct$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });

    }
  }


  ngOnDestroy(){
    document.body.classList.remove('header-theme-color');
  }

}
