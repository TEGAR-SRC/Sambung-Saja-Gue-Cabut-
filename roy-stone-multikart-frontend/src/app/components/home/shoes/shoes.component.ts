import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Observable, forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { attributeSlider } from '../../../shared/data/owl-carousel';
import { Attribute } from '../../../shared/interface/attribute.interface';
import { Shoes } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetAttribute } from '../../../shared/store/action/attribute.action';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { AttributeState } from '../../../shared/store/state/attribute.state';
import { ThemeBannerComponent } from '../widgets/theme-banner/theme-banner.component';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeFourColumnProductComponent } from '../widgets/theme-four-column-product/theme-four-column-product.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../widgets/theme-services/theme-services.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
  selector: 'app-shoes',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeHomeSliderComponent, CategoriesComponent,
            ThemeTitleComponent, ThemeBannerComponent, ThemeProductComponent,
            ThemeFourColumnProductComponent, ThemeProductTabSectionComponent, ThemeBlogComponent,
            ThemeServicesComponent, ThemeSocialMediaComponent, ThemeBrandComponent,
            ImageLinkComponent, CarouselModule],
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.scss'
})
export class ShoesComponent {

  @Input() data?: Shoes;
  @Input() slug?: string;

  @Select(AttributeState.selectedAttribute) attribute_value$: Observable<Attribute>;

  public attribute_value: Attribute;
  public attributeSliderOptions = attributeSlider

  constructor(
    private store: Store,
    private router: Router,
    public themeOptionService: ThemeOptionService) {
      this.attribute_value$.subscribe((value) => {
        this.attribute_value = value;
      })
    }

  ngOnInit() {
    if(this.data?.slug == this.slug) {

      let categoryIds = [...new Set(this.data?.content.categories_1.category_ids.concat(this.data?.content.categories_2.category_ids, this.data?.content?.category_product.category_ids))];

      // Get Products
      let getProducts$;
      if(this.data?.content?.products_ids.length && (this.data?.content?.products_list?.status || this.data?.content?.slider_products?.status)){
        getProducts$ = this.store.dispatch(new GetProductByIds({
           status: 1,
          approve:1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else{
        getProducts$ = of(null);
      }

      // Get Category
      let getCategory$;
      if(categoryIds.length && (this.data?.content?.categories_1?.status || this.data?.content?.categories_2?.status || this.data?.content?.category_product.status)){
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }));
      }else {
        getCategory$ = of(null);
      }

      // Get Attribute
      let getAttribute$;
      if(this.data?.content.attribute.attribute_id){
        getAttribute$ = this.store.dispatch(new GetAttribute(this.data?.content.attribute.attribute_id))
      }else {
        getAttribute$ = of(null);
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
      if(this.data?.content?.brand?.brand_ids.length && this.data?.content?.brand?.status){
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      }else {
        getBrands$ = of(null);
      }

      // Skeleton Loader
      document.body.classList.add('skeleton-body');
      forkJoin([getProducts$,getCategory$, getAttribute$, getBlog$, getBrands$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
  }

  getAttribute(value: string){
    this.router.navigate(['/collections'], { queryParams: { attribute: value } });
  }
}
