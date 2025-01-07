import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2Module, Select2SearchEvent } from 'ng-select2-component';
import { Observable, Subject, debounceTime, forkJoin } from 'rxjs';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProducts } from '../../../shared/store/action/product.action';
import { GetHomePage, UpdateHomePage } from '../../../shared/store/action/theme.action';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { Bag, Banners } from '../../../shared/interface/theme.interface';
import { BlogState } from '../../../shared/store/state/blog.state';
import { BrandState } from '../../../shared/store/state/brand.state';
import { CategoryState } from '../../../shared/store/state/category.state';
import { ProductState } from '../../../shared/store/state/product.state';
import { ThemeState } from '../../../shared/store/state/theme.state';
import { mediaConfig } from '../../../shared/data/media-config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { HasPermissionDirective } from '../../../shared/directive/has-permission.directive';
import { LinkComponent } from '../../../shared/components/ui/link/link.component';
import { AdvanceDropdownComponent } from '../../../shared/components/ui/advance-dropdown/advance-dropdown.component';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, Select2Module, HasPermissionDirective,
            NgbModule, PageWrapperComponent, ButtonComponent,
            FormFieldsComponent, LinkComponent, ImageUploadComponent,
            AdvanceDropdownComponent],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss'
})
export class BagComponent {

  @Select(ThemeState.homePage) home_page$: Observable<Bag>;
  @Select(ProductState.products) product$: Observable<Select2Data>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(BlogState.blogs) blogs$: Observable<Select2Data>;
  @Select(BrandState.brands) brand$: Observable<Select2Data>;

  public page_data: Bag;
  public active = 'home_banner';
  public form: FormGroup
  public banner = 1;
  public sliderProducts = 1;
  public grid_banner: number = 0;
  public selectedCategory: number[] = [];
  public selectedCategories: number[] = [];
  private search = new Subject<string>();
  public filter = {
    'status': 1,
    'search': '',
    'paginate': 15,
    'ids': '',
    'with_union_products': 0,
    'is_approved': 1
  };
  public mediaConfig = mediaConfig;

  constructor(private store: Store,
    public formBuilder: FormBuilder,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
    this.form = new FormGroup({
      content: new FormGroup({
        home_banner: new FormGroup({
          status: new FormControl(true),
          banners: new FormArray([]),
        }),
        category_product: new FormGroup({
          tag: new FormControl(''),
          title: new FormControl(''),
          category_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        category: new FormGroup({
          category_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        full_banner: new FormGroup({
          image_url: new FormControl(),
          redirect_link: new FormGroup({
            link: new FormControl(''),
            link_type: new FormControl(''),
            product_ids: new FormControl(''),
          }),
          status: new FormControl(true),
        }),
        product_banner: new FormGroup({
          status: new FormControl(true),
          left_content: new FormGroup({
            product_ids: new FormControl([]),
            title: new FormControl(''),
            status: new FormControl(true),
          }),
          center_content: new FormGroup({
            tag: new FormControl(''),
            title: new FormControl(''),
            product_ids: new FormControl([]),
            status: new FormControl(true),
          }),
          right_content: new FormGroup({
            product_ids: new FormControl([]),
            title: new FormControl(''),
            status: new FormControl(true),
          })
        }),
        services: new FormGroup({
          banners: new FormArray([]),
          status: new FormControl(true),
        }),
        products_list: new FormGroup({
          tag: new FormControl(''),
          title: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        grid_banner: new FormGroup({
          status: new FormControl(true),
          banners: new FormArray([]),
        }),
        featured_blogs: new FormGroup({
          tag: new FormControl(''),
          title: new FormControl(''),
          status: new FormControl(true),
          blog_ids: new FormControl([]),
        }),
        social_media: new FormGroup({
          title: new FormControl(''),
          status: new FormControl(true),
          banners: new FormArray([])
        }),
        brand: new FormGroup({
          brand_ids: new FormControl(''),
          status: new FormControl(false),
        }),
        products_ids: new FormControl([]),
      }),
      slug: new FormControl('bag')
    })
  }

  ngOnInit() {
    const categories$ = this.store.dispatch(new GetCategories({ status: 1, type: 'product' }));
    const home_page$ = this.store.dispatch(new GetHomePage({ slug: "bag" }));
    const blogs$ = this.store.dispatch(new GetBlogs({ status: 1 }));
    const brand$ = this.store.dispatch(new GetBrands({ status: 1 }));

    forkJoin([home_page$, categories$, blogs$, brand$]).subscribe({
      complete: () => {
        this.store.select(ThemeState.homePage).subscribe({
          next: (homePage) => {
            if (homePage?.content?.products_ids) {
              this.filter['paginate'] = homePage?.content?.products_ids?.length >= 15 ? homePage?.content?.products_ids?.length : 15;
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
        this.store.dispatch(new GetProducts({ status: 1, is_approved: 1, paginate: 15, search: inputValue }));
        this.renderer.addClass(this.document.body, 'loader-none');
    });
  }

  patchForm() {
    this.home_page$.subscribe(homePage => {
      this.page_data = homePage;
      this.selectedCategory = homePage?.content?.category?.category_ids || [];
      this.selectedCategories = homePage?.content?.category_product?.category_ids || [];
      this.grid_banner = homePage?.content?.grid_banner?.banners.length ? homePage?.content?.grid_banner?.banners.length : 0;
      this.form.patchValue({
        content: {
          home_banner: {
            status: homePage?.content?.home_banner?.status,
          },
          category_product: {
            tag: homePage?.content?.category_product?.tag,
            title: homePage?.content?.category_product?.title,
            category_ids: homePage?.content?.category_product?.category_ids,
            status: homePage?.content?.category_product?.status,
          },
          category: {
            category_ids: homePage?.content?.category?.category_ids,
            status: homePage?.content?.category?.status,
          },
          full_banner: {
            image_url: homePage?.content?.full_banner?.image_url,
            redirect_link: {
              link: homePage?.content?.full_banner?.redirect_link?.link,
              link_type: homePage?.content?.full_banner?.redirect_link?.link_type,
              product_ids: homePage?.content?.full_banner?.redirect_link?.product_ids
            },
            status: homePage?.content?.full_banner?.status,
          },
          product_banner: {
            status: homePage?.content?.product_banner?.status,
            left_content: {
              product_ids: homePage?.content?.product_banner?.left_content?.product_ids,
              title: homePage?.content?.product_banner?.left_content?.title,
              status: homePage?.content?.product_banner?.left_content?.status,
            },
            center_content: {
              tag: homePage?.content?.product_banner?.center_content?.tag,
              title: homePage?.content?.product_banner?.center_content?.title,
              product_ids: homePage?.content?.product_banner?.center_content?.product_ids,
              status: homePage?.content?.product_banner?.center_content?.status,
            },
            right_content: {
              product_ids: homePage?.content?.product_banner?.right_content?.product_ids,
              title: homePage?.content?.product_banner?.right_content?.title,
              status: homePage?.content?.product_banner?.right_content?.status,
            }
          },
          services: {
            status: homePage?.content?.services?.status,
          },
          grid_banner: {
            status: homePage?.content?.grid_banner?.status,
          },
          products_list: {
            tag: homePage?.content?.products_list?.tag,
            title: homePage?.content?.products_list?.title,
            product_ids: homePage?.content?.products_list?.product_ids,
            status: homePage?.content?.products_list?.status,
          },
          featured_blogs: {
            tag: homePage?.content?.featured_blogs?.tag,
            title: homePage?.content?.featured_blogs?.title,
            status: homePage?.content?.featured_blogs?.status,
            blog_ids: homePage?.content?.featured_blogs?.blog_ids,
          },
          social_media: {
            title: homePage?.content?.social_media?.title,
            status: homePage?.content?.social_media?.status,
          },
          brand: {
            brand_ids: homePage?.content?.brand?.brand_ids,
            status: homePage?.content?.brand?.status,
          },
          products_ids: homePage?.content?.products_ids,
        },
        slug: homePage?.slug
      })

      this.homeBannersArray.clear();
      homePage?.content?.home_banner?.banners?.forEach((banner: Banners) =>
        this.homeBannersArray.push(
          this.formBuilder.group({
            redirect_link: new FormGroup({
              link: new FormControl(banner?.redirect_link?.link),
              link_type: new FormControl(banner?.redirect_link?.link_type),
            }),
            status: new FormControl(banner?.status),
            image_url: new FormControl(banner?.image_url),
          })
        ));

      this.gridArray.clear();
      homePage?.content?.grid_banner?.banners?.forEach((banner: Banners) =>
        this.gridArray.push(
          this.formBuilder.group({
            redirect_link: new FormGroup({
              link: new FormControl(banner?.redirect_link?.link),
              link_type: new FormControl(banner?.redirect_link?.link_type),
            }),
            status: new FormControl(banner?.status),
            image_url: new FormControl(banner?.image_url),
            tag: new FormControl(banner?.tag),
            title: new FormControl(banner?.title),
            button_text: new FormControl(banner?.button_text),
            offer: new FormControl(banner?.offer)
          })
        ));

      this.servicesArray.clear();
      homePage?.content?.services?.banners?.forEach((banner: Banners) =>
        this.servicesArray.push(
          this.formBuilder.group({
            title: new FormControl(banner?.title),
            description: new FormControl(banner?.description),
            status: new FormControl(banner?.status),
            image_url: new FormControl(banner?.image_url),
          })
        ));

      this.socialMediaArray.clear();
      homePage?.content?.social_media?.banners?.forEach((banner: Banners) =>
        this.socialMediaArray.push(
          this.formBuilder.group({
            redirect_link: new FormGroup({
              link: new FormControl(banner?.redirect_link?.link),
              link_type: new FormControl(banner?.redirect_link?.link_type),
            }),
            status: new FormControl(banner?.status),
            image_url: new FormControl(banner?.image_url),
          })
        ));
    })
  }

  selectCategoryItem(data: Number[], key: string) {
    if (Array.isArray(data)) {
      this.form.get(key)?.setValue(data);
    }
  }

  getProducts(filter: Params) {
    this.filter['search'] = filter['search'];
    this.filter['ids'] = this.filter['search'].length ? '' : this.page_data?.content?.products_ids?.join()
    this.filter['paginate'] = this.page_data?.content?.products_ids?.length >= 15 ? this.page_data?.content?.products_ids?.length : 15;
    this.store.dispatch(new GetProducts(this.filter));
    this.renderer.addClass(this.document.body, 'loader-none');
  }

  productDropdown(event: Select2) {
    if (event['innerSearchText']) {
      this.search.next('');
      this.getProducts(this.filter);
    }
  }

  searchProduct(event: Select2SearchEvent) {
    this.search.next(event.search);
  }

  get homeBannersArray(): FormArray {
    return this.form.get('content.home_banner.banners') as FormArray
  }

  get servicesArray(): FormArray {
    return this.form.get('content.services.banners') as FormArray
  }

  get gridArray(): FormArray {
    return this.form.get('content.grid_banner.banners') as FormArray
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


  addGridBanner(event: Event) {
    this.grid_banner = this.grid_banner + 1;
    event.preventDefault();
    if ((this.grid_banner % 2) == 0) {
      this.gridArray.push(
        this.formBuilder.group({
          tag: new FormControl(''),
          title: new FormControl(''),
          button_text: new FormControl(''),
          offer: new FormControl(''),
          redirect_link: new FormGroup({
            link: new FormControl(''),
            link_type: new FormControl(''),
            product_ids: new FormControl(''),
          }),
          status: new FormControl(true)
        })
      )
    } else {
      this.gridArray.push(
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
  }


  addServiceBanner(event: Event) {
    event.preventDefault();
    if (this.servicesArray.length != 4) {
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
    if (this.homeBannersArray.length <= 1) return
    this.homeBannersArray.removeAt(index);
  }

  removeGridBanner(index: number) {
    if (this.gridArray.length <= 1) return
    this.gridArray.removeAt(index);
  }

  removeServiceBanner(index: number) {
    if (this.servicesArray.length <= 1) return
    this.servicesArray.removeAt(index);
  }

  removeSocialMediaBanner(index: number) {
    if (this.socialMediaArray.length <= 1) return
    this.socialMediaArray.removeAt(index);
  }

  selectServiceImage(url: string, index: number) {
    this.servicesArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectHomeBannerArray(url: string, index: number) {
    this.homeBannersArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectGridBannerArray(url: string, index: number) {
    this.gridArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectImage(url: string, key: string) {
    this.form.get(key)?.setValue(url ? url : null)
  }

  selectSocialMediaImage(url: string, index: number) {
    this.socialMediaArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  // Merge Products Ids
  concatDynamicProductKeys(obj: Bag) {
    const result: number[] = [];
    function traverse(obj: any) {
      for (const key in obj) {
        if (key === 'product_ids' && Array.isArray(obj[key])) {
          result.push(...obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        } else {
          if (key === 'product_ids' && obj.product_ids) {
            result.push(obj.product_ids)
          };
        }
      }
    }
    traverse(obj);
    return result;
  }

  submit() {
    const productIds = Array.from(new Set(this.concatDynamicProductKeys(this.form.value)));
    this.form.get('content.products_ids')?.setValue(productIds);

    if (this.form.valid) {
      this.store.dispatch(new UpdateHomePage(this.page_data.id, this.form.value));
    }
  }

}
