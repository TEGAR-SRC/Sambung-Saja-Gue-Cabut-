import { Component, Input } from '@angular/core';
import { FeaturedBanner, Yoga } from '../../../shared/interface/theme.interface';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { CommonModule } from '@angular/common';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { Store } from '@ngxs/store';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { forkJoin, of } from 'rxjs';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { GetBrands } from '../../../shared/store/action/brand.action';

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [CommonModule, ImageLinkComponent, ThemeTitleComponent, 
            ThemeProductComponent, ThemeBlogComponent, ThemeSocialMediaComponent,
            ThemeBrandComponent
  ],
  templateUrl: './yoga.component.html',
  styleUrl: './yoga.component.scss'
})
export class YogaComponent {

  @Input() data?: Yoga;
  @Input() slug?: string;

  public banners: FeaturedBanner[];
  public banners2: FeaturedBanner[];

  constructor(private store: Store,
    public themeOptionService: ThemeOptionService
  ){}

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

      this.banners2 = [];
      if(this.data?.content?.offer_banner_2?.banner_1?.status){
        this.banners2 = [...this.banners2, this.data?.content?.offer_banner_2?.banner_1]
      }
      if(this.data?.content?.offer_banner_2?.banner_2?.status){
        this.banners2 = [...this.banners2, this.data?.content?.offer_banner_2?.banner_2]
      }
      if(this.data?.content?.offer_banner_2?.banner_3?.status){
        this.banners2 = [...this.banners2, this.data?.content?.offer_banner_2?.banner_3]
      }
      
      // Get Products
      let getProduct$;
      if(this.data?.content?.products_ids.length){
        getProduct$ = this.store.dispatch(new GetProductByIds({
           status: 1,
          approve:1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      }else {
        getProduct$ = of(null);
      }
  
      // Get Blog
      let getBlog$;
      if(this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status){
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else { getBlog$ = of(null); }

      // Get Brand
      let getBrands$;
      if(this.data?.content?.brand?.brand_ids?.length && this.data?.content?.brand?.status){
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null); }

      forkJoin([getProduct$, getBlog$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

  }
}
