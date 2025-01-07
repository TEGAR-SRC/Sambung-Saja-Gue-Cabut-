import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';

import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeParallaxBannerComponent } from '../../widgets/theme-parallax-banner/theme-parallax-banner.component';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

import { ThemeOptionService } from '../../../../shared/services/theme-option.service';

import { FashionThree } from '../../../../shared/interface/theme.interface';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { productSlider4 } from '../../../../shared/data/owl-carousel';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';

@Component({
  selector: 'app-fashion-3',
  standalone: true,
  imports: [CommonModule, ThemeHomeSliderComponent, ThemeTitleComponent,
            ThemeProductComponent, ThemeParallaxBannerComponent, ThemeProductTabSectionComponent,
            ThemeBrandComponent, ImageLinkComponent],
  templateUrl: './fashion-3.component.html',
  styleUrl: './fashion-3.component.scss'
})
export class Fashion3Component {

  @Input() data?: FashionThree;
  @Input() slug?: string;

  public productSlider4 =  productSlider4;
  public productSlider: OwlOptions = {
    loop: true,
    nav: false,
    dots: false,
    margin: 24,
    items: 4,
    responsive: {
      0: {
        items: 2,
        margin: 16,
      },
      576: {
        items: 3,
      },
      915: {
        items: 4,
      },
    },
  };

  constructor(
    private store: Store,
    private modal: NgbModal,
    private themeOptionService: ThemeOptionService) {
 ;
    }

    ngOnInit() {
      if(this.data?.slug == this.slug) {

      // Get Products
      let getProduct$;
      if(this.data?.content?.products_ids.length && this.data?.content?.products_list?.status){
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      } else { getProduct$ = of(null); }

      // Get Category
      let getCategory$;
      if(this.data?.content.category_product.category_ids?.length && this.data?.content.category_product?.status) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: this.data?.content.category_product.category_ids?.join(',')
        }));
      } else { getCategory$ = of(null); }

      // Get Brand
      let getBrands$;
      if( this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids?.length ){
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null); }

      // Skeleton Loader
      document.body.classList.add('skeleton-body');
      document.body.classList.add('box-layout-body');

      forkJoin([getProduct$, getCategory$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

  }

  ngOnDestroy() {
    // Remove Class
    document.body.classList.remove('box-layout-body');
  }
}
