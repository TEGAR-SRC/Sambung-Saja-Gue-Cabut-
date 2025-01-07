import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2Module, Select2SearchEvent } from 'ng-select2-component';
import { Observable, Subject, debounceTime, forkJoin } from 'rxjs';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { AdvanceDropdownComponent } from '../../../shared/components/ui/advance-dropdown/advance-dropdown.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { LinkComponent } from '../../../shared/components/ui/link/link.component';
import { mediaConfig } from '../../../shared/data/media-config';
import { HasPermissionDirective } from '../../../shared/directive/has-permission.directive';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { Params } from '../../../shared/interface/core.interface';
import { DigitalDownload } from '../../../shared/interface/theme.interface';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProducts } from '../../../shared/store/action/product.action';
import { GetHomePage, UpdateHomePage } from '../../../shared/store/action/theme.action';
import { BlogState } from '../../../shared/store/state/blog.state';
import { BrandState } from '../../../shared/store/state/brand.state';
import { CategoryState } from '../../../shared/store/state/category.state';
import { ProductState } from '../../../shared/store/state/product.state';
import { ThemeState } from '../../../shared/store/state/theme.state';

export type CustomLinkForm = AbstractControl & {
  controls: { [key: string]: AbstractControl };
  registerControl: (name: string, control: AbstractControl) => void;
  addControl: (name: string, control: AbstractControl) => void;
  removeControl: (name: string) => void;
  setControl: (name: string, control: AbstractControl) => void;
};

@Component({
  selector: 'app-digital-download',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, Select2Module, HasPermissionDirective,
            NgbModule, PageWrapperComponent, ButtonComponent,
            FormFieldsComponent, LinkComponent, ImageUploadComponent,
            AdvanceDropdownComponent
  ],
  templateUrl: './digital-download.component.html',
  styleUrl: './digital-download.component.scss'
})
export class DigitalDownloadComponent {

  @Select(ProductState.products) product$: Observable<Select2Data>;
  @Select(BlogState.blogs) blogs$: Observable<Select2Data>;
  @Select(ThemeState.homePage) home_page$: Observable<DigitalDownload>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(BrandState.brands) brand$: Observable<Select2Data>;

  public form: FormGroup;
  public page_data: DigitalDownload;
  public active = 'home_banner';
  public banner = 1;
  public sliderProducts = 1;
  public selectedCategory: number[] = [];
  public selectedCategories: number[] = [];
  private search = new Subject<string>();
  public mediaConfig = mediaConfig;
  public filter = {
    'status': 1,
    'search': '',
    'paginate': 15,
    'ids': '',
    'with_union_products': 0,
    'is_approved': 1
  };

  constructor(private store: Store,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document){
    this.form = new FormGroup({
      content: new FormGroup({
        home_banner: new FormGroup({
          status: new FormControl(true),
          tag: new FormControl(''),
          title: new FormControl(''),
          description: new FormControl(''),
          background_image: new FormControl(''),
          sub_image_1: new FormControl(''),
          sub_image_2: new FormControl(''),
        }),
        categories_icon_list: new FormGroup({
          category_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        products_list: new FormGroup({
          tag: new FormControl(''),
          title: new FormControl(''),
          description: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        products_list_2: new FormGroup({
          status: new FormControl(true),
          image_url: new FormControl(''),
          left_panel: new FormGroup({
            title: new FormControl(''),
            description: new FormControl(''),
            more_button: new FormControl(false),
            button_text: new FormControl(''),
            status: new FormControl(true),
            redirect_link: new FormGroup({
              link: new FormControl(''),
              link_type: new FormControl(''),
              product_ids: new FormControl(''),
            }),
          }),
          products: new FormGroup({
            product_ids: new FormControl([])
          })
        }),
         
        category_product: new FormGroup({
          tag: new FormControl(''),
          title: new FormControl(''),
          category_ids: new FormControl([]),
          status: new FormControl(true),
        }),
         
        featured_blogs: new FormGroup({
          tag: new FormControl(''),
          title: new FormControl(''),
          status: new FormControl(true),
          blog_ids: new FormControl([]),
        }),
        products_ids: new FormControl([]),
      }),
      slug: new FormControl('digital_download'),
    });
  }

  ngOnInit() {
    const blogs$ = this.store.dispatch(new GetBlogs({ status: 1 }));
    const home_page$ = this.store.dispatch(new GetHomePage({ slug: "digital_download" }));
    const categories$ = this.store.dispatch(new GetCategories({ status: 1, type: 'product' }));
    const brand$ = this.store.dispatch(new GetBrands({status: 1}));

    forkJoin([ blogs$, home_page$, categories$, brand$]).subscribe({
      complete: () => {
        this.store.select(ThemeState.homePage).subscribe({
          next: (homePage) => {
            if(homePage?.content?.products_ids){
              this.filter['paginate'] = homePage?.content?.products_ids?.length >= 15 ? homePage?.content?.products_ids?.length: 15;
              this.filter['ids'] = homePage?.content?.products_ids?.join();
              this.filter['with_union_products'] = homePage?.content?.products_ids?.length ? homePage?.content?.products_ids?.length >= 15 ? 0 : 1 : 0;
            }
            this.store.dispatch(new GetProducts(this.filter)).subscribe({
              complete: () => {
                this.patchForm();
              }
            });
          }
        });
      }
    });

    this.search
      .pipe(debounceTime(300)) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        this.filter['search'] = inputValue;
        this.getProducts(this.filter)
        this.renderer.addClass(this.document.body, 'loader-none');
    });
  }

  patchForm() {
    this.home_page$.subscribe(homePage => {
      this.page_data = homePage;
      this.selectedCategory = homePage?.content?.categories_icon_list?.category_ids || [];
      this.selectedCategories = homePage?.content?.category_product?.category_ids || [];

      this.form.patchValue({
        content: {
          home_banner: {
            status: homePage?.content?.home_banner?.status,
            title: homePage?.content?.home_banner?.title,
            description: homePage?.content?.home_banner?.description,
            background_image: homePage?.content?.home_banner?.background_image,
            sub_image_1: homePage?.content?.home_banner?.sub_image_1,
            sub_image_2: homePage?.content?.home_banner?.sub_image_2,
          },
          categories_icon_list: {
            category_ids: this.selectedCategory,
            status: homePage?.content?.categories_icon_list?.status,
          },
          products_list: {
            tag: homePage?.content?.products_list?.tag,
            title: homePage?.content?.products_list?.title,
            description: homePage?.content?.products_list?.description,
            product_ids: homePage?.content?.products_list?.product_ids,
            status: homePage?.content?.products_list?.status,
          },
          products_list_2: {
            status: homePage?.content?.products_list_2?.status,
            image_url: homePage?.content?.products_list_2?.image_url,
            left_panel: {
              title: homePage?.content?.products_list_2?.left_panel?.title,
              description: homePage?.content?.products_list_2?.left_panel?.description,
              more_button: homePage?.content?.products_list_2?.left_panel?.more_button,
              button_text: homePage?.content?.products_list_2?.left_panel?.button_text,
              status: homePage?.content?.products_list_2?.left_panel?.status,
              redirect_link: {
                link: homePage?.content?.products_list_2?.left_panel?.redirect_link?.link,
                link_type: homePage?.content?.products_list_2?.left_panel?.redirect_link?.link_type,
                product_ids: homePage?.content?.products_list_2?.left_panel?.redirect_link?.product_ids,
              },
            },
            products: {
              product_ids: homePage?.content?.products_list_2?.products?.product_ids
            }
          },
          category_product: {
            tag: homePage?.content?.category_product?.tag,
            title: homePage?.content?.category_product?.title,
            category_ids: this.selectedCategories,
            status: homePage?.content?.category_product?.status,
          },
          featured_blogs: {
            tag: homePage?.content?.featured_blogs?.tag,
            title: homePage?.content?.featured_blogs?.title,
            status: homePage?.content?.featured_blogs?.status,
            blog_ids: homePage?.content?.featured_blogs?.blog_ids,
          },
          products_ids: homePage?.content?.products_ids,
        },
        slug: homePage?.slug,
      });
    });
  }

  selectCategoryItem(data: Number[], key: string) {
    if(Array.isArray(data)) {
      this.form.get(key)?.setValue(data);
    }
  }

  getProducts(filter: Params){
    this.filter['search'] = filter['search'];
    this.filter['ids'] = this.filter['search'].length ? '' : this.page_data?.content?.products_ids?.join()
    this.filter['paginate'] = this.page_data?.content?.products_ids?.length >= 15 ? this.page_data?.content?.products_ids?.length: 15;
    this.store.dispatch(new GetProducts(this.filter));
    this.renderer.addClass(this.document.body, 'loader-none');
  }

  productDropdown(event: Select2){
    if(event['innerSearchText']){
      this.search.next('');
      this.getProducts(this.filter);
    }
  }

  searchProduct(event: Select2SearchEvent){
    this.search.next(event.search);
  }

  get homeBannersArray(): FormArray {
    return this.form.get('content.home_banner.banners') as FormArray
  }

  get servicesArray(): FormArray {
    return this.form.get('content.services.banners') as FormArray
  }

  get socialMediaArray(): FormArray {
    return this.form.get('content.social_media.banners') as FormArray
  }

  addHomeBanner(event: Event) {
    event.preventDefault();
    this.homeBannersArray.push(
      this.formBuilder.group({
        redirect_link: new FormGroup({
          link: new FormControl(''),
          link_type: new FormControl(''),
          product_ids: new FormControl(''),
        }),
        image_url: new FormControl(),
        status: new FormControl(true),
      })
    );
  }

  addServiceBanner(event: Event) {
    event.preventDefault();
    if(this.servicesArray.length != 3){
      this.servicesArray.push(
        this.formBuilder.group({
          title: new FormControl(),
          description: new FormControl(),
          image_url: new FormControl(),
          status: new FormControl(true),
        })
      );
    }
  }

  addSocialMediaBanner(event: Event) {
    event.preventDefault();
    this.socialMediaArray.push(
      this.formBuilder.group({
        redirect_link: new FormGroup({
          link: new FormControl(''),
          link_type: new FormControl(''),
        }),
        image_url: new FormControl(),
        status: new FormControl(true),
      })
    );
  }

  removeHomeBanner(index: number) {
    if(this.homeBannersArray.length <= 1) return
      this.homeBannersArray.removeAt(index);
  }


  removeServiceBanner(index: number) {
    if(this.servicesArray.length <= 1) return
      this.servicesArray.removeAt(index);
  }

  removeSocialMediaBanner(index: number) {
    if(this.socialMediaArray.length <= 1) return
      this.socialMediaArray.removeAt(index);
  }

  selectImage(url: string, key: string) {
    this.form.get(key)?.setValue(url ? url : null)
  }

  selectHomeBannerArray(url: string, index: number){
    this.homeBannersArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectServiceImage(url: string, index: number) {
    this.servicesArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectSocialMediaImage(url: string, index: number){
    this.socialMediaArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  // Merge Products Ids
  concatDynamicProductKeys(obj: DigitalDownload) {
    const result: number[]= [];
    function traverse(obj: any) {
      for (const key in obj) {
        if (key === 'product_ids' && Array.isArray(obj[key])) {
          result.push(...obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        }else {
          if(key === 'product_ids' && obj.product_ids){
            result.push(obj.product_ids)
          };
        }
      }
    }
    traverse(obj);
    return result;
  }

  submit(){
    const productIds = Array.from(new Set(this.concatDynamicProductKeys(this.form.value)));
    this.form.get('content.products_ids')?.setValue(productIds);

    if(this.form.valid) {
      this.store.dispatch(new UpdateHomePage(this.page_data.id, this.form.value));
    }
  }

}
