import { Component, Input, SimpleChanges } from '@angular/core';
import { Banners, Pets } from '../../../shared/interface/theme.interface';
import { Store } from '@ngxs/store';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { forkJoin, of } from 'rxjs';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { CommonModule } from '@angular/common';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeParallaxBannerComponent } from '../widgets/theme-parallax-banner/theme-parallax-banner.component';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule,ThemeHomeSliderComponent, ThemeBrandComponent,
            ImageLinkComponent, ThemeTitleComponent, ThemeProductComponent,
            ThemeParallaxBannerComponent, ThemeBlogComponent],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent {

  @Input() data?: Pets;
  @Input() slug?: string;

  public filteredBanners: Banners[];
  public StorageURL = environment.storageURL;

  constructor(
    private store: Store,
    public themeOptionService: ThemeOptionService) {
  }

  ngOnInit() {
    if(this.data?.slug == this.slug) {

      // Get Products
      let getProducts$
      if(this.data?.content?.products_ids.length && (this.data?.content?.products_list_1?.status || this.data?.content?.products_list_2?.status)){
        getProducts$ = this.store.dispatch(new GetProductByIds({
           status: 1,
          approve:1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else {
        getProducts$ = of(null);
      }

      // Get Blog
      let getBlog$;
      if(this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status){
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else {
        getBlog$ = of(null);
      }

      // Get Brand
      let getBrands$
      if(this.data?.content?.brand?.brand_ids.length && this.data?.content?.brand.status){
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      }else {
        getBrands$ = of(null);
      }

      // Skeleton Loader
      document.body.classList.add('skeleton-body');
      forkJoin([getProducts$, getBlog$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

    // header light
    document.body.classList.add('header-style-light');
  }

  ngOnChanges(change: SimpleChanges){
    this.filteredBanners = change['data']?.currentValue?.content?.offer_banner?.banners.filter((banner: Banners) => {
      return banner.status
    })
  }

  ngOnDestroy(){
    document.body.classList.remove('header-style-light');
  }

}
