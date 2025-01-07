import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';
import { productSlider6 } from '../../../../shared/data/owl-carousel';
import { FeaturedBanner, MarketplaceOne } from '../../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeBannerComponent } from '../../widgets/theme-banner/theme-banner.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../../widgets/theme-services/theme-services.component';
import { ThemeSocialMediaComponent } from '../../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

@Component({
  selector: 'app-marketplace-1',
  standalone: true,
  imports: [CommonModule, ThemeHomeSliderComponent, ThemeBannerComponent,
            ThemeTitleComponent, ThemeProductComponent, ProductBoxComponent,
            ThemeProductTabSectionComponent, ThemeServicesComponent, ThemeSocialMediaComponent,
            ThemeBrandComponent,ImageLinkComponent],
  templateUrl: './marketplace-1.component.html',
  styleUrl: './marketplace-1.component.scss'
})
export class Marketplace1Component {

  @Input() data?: MarketplaceOne;
  @Input() slug?: string;
  
  public banners: FeaturedBanner[];

  public productSlider6 = productSlider6;

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
      if(this.data?.content?.offer_banner_1?.banner_3?.status){
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
      } else { getProduct$ = of(null); };

      // Get Category
      let getCategory$;
      if(this.data?.content.category_product.right_panel.product_category.status && this.data?.content.category_product.right_panel.product_category.category_ids?.length){
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: this.data?.content.category_product.right_panel.product_category.category_ids?.join(',')
        }));
      } else { getCategory$ = of(null); };

      // Get Brand
      let getBrands$; 
      if(this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids?.length){
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
