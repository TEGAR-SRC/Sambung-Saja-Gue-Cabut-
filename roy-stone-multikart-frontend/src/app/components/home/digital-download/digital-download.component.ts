import { Component, Input } from '@angular/core';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { DigitalDownload } from '../../../shared/interface/theme.interface';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { forkJoin, of } from 'rxjs';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { Store } from '@ngxs/store';
import { productSlider3, productSlider2 } from '../../../shared/data/owl-carousel';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
  selector: 'app-digital-download',
  standalone: true,
  imports: [CommonModule, ImageLinkComponent, CategoriesComponent, ThemeTitleComponent,
            ThemeProductComponent, ThemeProductTabSectionComponent, ThemeBlogComponent,TranslateModule,
            ButtonComponent],
  templateUrl: './digital-download.component.html',
  styleUrl: './digital-download.component.scss'
})
export class DigitalDownloadComponent {


  @Input() data?: DigitalDownload;
  @Input() slug?: string;

  public productSlider3 = productSlider3;
  public productSlider2 = productSlider2;
  public StorageURL = environment.storageURL;

  constructor(private store: Store, private themeOptionService: ThemeOptionService) {}

  ngOnInit() {
    if(this.data?.slug == this.slug) {

      // Get Products
      let getProducts$
      if(this.data?.content?.products_ids?.length && this.data?.content?.products_list?.status){
        getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else { getProducts$ = of(null); }

      // Get Category
      let getCategory$;
      let categoryIds = this.data?.content.category_product.category_ids.concat(this.data.content.categories_icon_list.category_ids);
      if(categoryIds){
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }))
      } else { getCategory$ = of(null); }

      // Get Blog
      let getBlog$;
      if(this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status){
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else { getBlog$ = of(null); }

      // Skeleton Loader
      document.body.classList.add('skeleton-body' , 'digital-download');

      forkJoin([getProducts$, getCategory$, getBlog$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }
  }

  ngOnDestroy() {
    // Remove Class
    document.body.classList.remove('digital-download');
  }
}
