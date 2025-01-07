import { Injectable, NgZone } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, filter } from 'rxjs';
import { Blog } from '../interface/blog.interface';
import { Brand } from '../interface/brand.interface';
import { Category } from '../interface/category.interface';
import { Page } from '../interface/page.interface';
import { Product } from '../interface/product.interface';
import { Option } from '../interface/theme-option.interface';
import { BlogState } from '../store/state/blog.state';
import { BrandState } from '../store/state/brand.state';
import { CategoryState } from '../store/state/category.state';
import { PageState } from '../store/state/page.state';
import { ProductState } from '../store/state/product.state';
import { ThemeOptionState } from '../store/state/theme-option.state';
import { SettingState } from '../store/state/setting.state';
import { Values } from '../interface/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(ProductState.selectedProduct) product$: Observable<Product>;
  @Select(BlogState.selectedBlog) blog$: Observable<Blog>;
  @Select(BrandState.selectedBrand) brand$: Observable<Brand>;
  @Select(PageState.selectedPage) page$: Observable<Page>;
  @Select(CategoryState.selectedCategory) category$: Observable<Category>;

  public path: string;
  public timeoutId: any;
  private currentMessageIndex = 0;
  private messages: string[];
  private currentMessage: string;
  private delay = 1000; // Delay between messages in milliseconds
  public isTabInFocus = true;
  public product: Product;
  public blog: Blog;
  public page: Page;
  public brand: Brand;
  public category: Category;
  public themeOption: Option;
  public scoContent: any = {};
  public setting: Values;
  constructor(private meta: Meta, private router: Router,
    private titleService: Title,
    private ngZone: NgZone,) { 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.path = event.url
      document.addEventListener('visibilitychange', () => {
        this.messages = this.themeOption.general.taglines;
        this.ngZone.run(() => {
          this.updateSeo(this.path)
        })
      })
      this.updateSeo(this.path)
    });
    
    this.fetchData(); 
  }

  fetchData() {
    this.setting$.subscribe(val => this.setting = val);
    this.product$.subscribe(product => this.product = product);
    this.blog$.subscribe(blog => this.blog = blog);
    this.page$.subscribe(page => this.page = page);
    this.brand$.subscribe(brand => this.brand = brand);
    this.category$.subscribe(blog => this.category = blog);
    this.themeOption$.subscribe(option => {
      this.themeOption = option
    })
  }
  
  updateSeo(path:string){
    if (path.includes('product')) {
      if (this.product) {
        this.scoContent = {
          'url': window.location.href,
          'og_title': this.product.meta_title || this.themeOption?.seo?.meta_title,
          'og_description': this.product.meta_description || this.themeOption?.seo?.meta_description,
          'og_image': this.product.product_meta_image?.original_url || this.themeOption?.seo?.og_image?.original_url,
        };
      }
      this.customSCO();
    } else if(path.includes('blog')) {
      if(this.blog){
        this.scoContent = {
          ...this.scoContent,
          'url': window.location.href,
          'og_title': this.blog?.meta_title || this.themeOption?.seo?.meta_title,
          'og_description': this.blog?.meta_description || this.themeOption?.seo?.meta_description,
          'og_image': this.blog?.blog_meta_image?.original_url || this.themeOption?.seo?.og_image?.original_url,
        }
        this.customSCO();
      }
    } else if(path.includes('page')) {
      if(this.page) {
        this.scoContent = {
          ...this.scoContent,
          'url': window.location.href,
          'og_title': this.page?.meta_title || this.themeOption?.seo?.meta_title,
          'og_description': this.page?.meta_description || this.themeOption?.seo?.meta_description,
          'og_image': this.page?.page_meta_image?.original_url || this.themeOption?.seo?.og_image?.original_url,
        }
      }
      this.customSCO();
    } else if(path.includes('brand')) {
      if(this.brand) {
        this.scoContent = {
          ...this.scoContent,
          'url': window.location.href,
          'og_title': this.brand?.meta_title || this.themeOption?.seo?.meta_title,
          'og_description': this.brand?.meta_description || this.themeOption?.seo?.meta_description,
          'og_image': this.brand?.brand_meta_image?.original_url || this.themeOption?.seo?.og_image?.original_url,
        }
      }
      this.customSCO();
    } else if(path.includes('category')) {
      if(this.category) {
        this.scoContent = {
          ...this.scoContent,
          'url': window.location.href,
          'og_title': this.category?.meta_title || this.themeOption?.seo?.meta_title,
          'og_description': this.category?.meta_description || this.themeOption?.seo?.meta_description,
          'og_image': this.category?.category_meta_image?.original_url || this.themeOption?.seo?.og_image?.original_url,
        }
      }
      this.customSCO();
    } 
    else {
      this.updateDefaultSeo();
    }
  }

  updateDefaultSeo(){
 
    this.meta.updateTag({ name: 'title', content: this.themeOption?.seo?.meta_title });
    this.meta.updateTag({ name: 'description', content: this.themeOption?.seo?.meta_description });

    // Update Facebook Meta Tags
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: this.scoContent['url'] });
    this.meta.updateTag({ property: 'og:title', content: this.themeOption?.seo?.meta_title });
    this.meta.updateTag({ property: 'og:description', content: this.themeOption?.seo?.meta_description });
    this.meta.updateTag({ property: 'og:image', content: this.scoContent['og_image'] });

    // Update Twitter Meta Tags
    this.meta.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ property: 'twitter:url', content: this.scoContent['url'] });
    this.meta.updateTag({ property: 'twitter:title', content: this.themeOption?.seo?.meta_title });
    this.meta.updateTag({ property: 'twitter:description', content: this.themeOption?.seo?.meta_description });
    this.meta.updateTag({ property: 'twitter:image', content: this.scoContent['og_image'] });

    if(this.themeOption?.general && this.themeOption?.general?.exit_tagline_enable){
      document.addEventListener('visibilitychange', () => {
        this.messages = this.themeOption.general.taglines;
        this.ngZone.run(() => {
          this.isTabInFocus = !document.hidden;
          if (this.isTabInFocus) {
            clearTimeout(this.timeoutId);
            return this.titleService.setTitle(this.themeOption?.general?.site_title && this.themeOption?.general?.site_tagline
              ? `${this.themeOption?.general?.site_title} | ${this.themeOption?.general?.site_tagline}` : '')
          } else {
            this.updateMessage();
          }
        });
      });
      this.scoContent = {
        ...this.scoContent,
        'url': window.location.href,
        'og_title': this.themeOption?.seo?.meta_title,
        'og_description': this.themeOption?.seo?.meta_description,
        'og_image': this.themeOption?.seo?.og_image?.original_url,
      }
      
      this.customSCO()
    }else {
      return this.titleService.setTitle(this.themeOption?.general?.site_title && this.themeOption?.general?.site_tagline
        ? `${this.themeOption?.general?.site_title} | ${this.themeOption?.general?.site_tagline}` : '')
    }
  }
 
  customSCO(){
    const title = this.scoContent['og_title'];
    const description = this.scoContent['og_description'];

    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });

    // Update Facebook Meta Tags
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: this.scoContent['url'] });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: this.scoContent['og_image'] });

    // Update Twitter Meta Tags
    this.meta.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ property: 'twitter:url', content: this.scoContent['url'] });
    this.meta.updateTag({ property: 'twitter:title', content: title });
    this.meta.updateTag({ property: 'twitter:description', content: description });
    this.meta.updateTag({ property: 'twitter:image', content: this.scoContent['og_image'] });
  }

  updateMessage() {
    // Clear the previous timeout
    clearTimeout(this.timeoutId);

    // Update the current message
    this.currentMessage = this.messages[this.currentMessageIndex];
    this.titleService.setTitle(this.currentMessage);
    // Increment the message index or reset it to 0 if it reaches the end
    this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;

    // Set a new timeout to call the function again after the specified delay
    this.timeoutId = setTimeout(() => {
      this.updateMessage();
    }, this.delay);
  }

  ngOnDestroy() {
    // Clear the timeout when the component is destroyed
    clearTimeout(this.timeoutId);
  }
}
