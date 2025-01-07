import { Component, Input } from '@angular/core';
import { Game } from '../../../shared/interface/theme.interface';
import { Store } from '@ngxs/store';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { forkJoin, of } from 'rxjs';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { CommonModule } from '@angular/common';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeFourColumnProductComponent } from '../widgets/theme-four-column-product/theme-four-column-product.component';
import { ThemeParallaxBannerComponent } from '../widgets/theme-parallax-banner/theme-parallax-banner.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { GetCategories } from '../../../shared/store/action/category.action';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, ThemeHomeSliderComponent, ImageLinkComponent, ThemeTitleComponent,
            ThemeProductTabSectionComponent, ThemeFourColumnProductComponent, ThemeParallaxBannerComponent,
            ThemeProductComponent, ThemeBrandComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {


  @Input() data?: Game;
  @Input() slug?: string;

  public StorageURL = environment.storageURL;
  
  constructor(private store: Store, private themeOptionService: ThemeOptionService) {}

  ngOnInit() {
    if(this.data?.slug == this.slug) {

      // Get Products
      let getProducts$
      if(this.data?.content?.products_ids?.length){
        getProducts$ = this.store.dispatch(new GetProductByIds({
           status: 1,
          approve:1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else { getProducts$ = of(null); }

      // Get Category
      let getCategory$;
      if(this.data?.content.category_product.category_ids?.length && this.data?.content.category_product?.status){
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: this.data?.content.category_product.category_ids?.join(',')
        }))
      } else { getCategory$ = of(null); }

      // Get Brand
      let getBrands$;
      if(this.data?.content?.brand?.brand_ids?.length && this.data?.content?.brand?.status) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null); }

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBrands$, getCategory$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
  }
}
