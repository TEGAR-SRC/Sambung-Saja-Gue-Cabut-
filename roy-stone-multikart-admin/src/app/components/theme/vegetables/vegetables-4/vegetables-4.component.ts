import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2Module, Select2SearchEvent } from 'ng-select2-component';
import { Observable, Subject, debounceTime, forkJoin } from 'rxjs';
import { PageWrapperComponent } from '../../../../shared/components/page-wrapper/page-wrapper.component';
import { AdvanceDropdownComponent } from '../../../../shared/components/ui/advance-dropdown/advance-dropdown.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../../shared/components/ui/image-upload/image-upload.component';
import { LinkComponent } from '../../../../shared/components/ui/link/link.component';
import { mediaConfig } from '../../../../shared/data/media-config';
import { HasPermissionDirective } from '../../../../shared/directive/has-permission.directive';
import { CategoryModel } from '../../../../shared/interface/category.interface';
import { Banners, VegetablesFour } from '../../../../shared/interface/theme.interface';
import { GetBlogs } from '../../../../shared/store/action/blog.action';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProducts } from '../../../../shared/store/action/product.action';
import { GetHomePage, UpdateHomePage } from '../../../../shared/store/action/theme.action';
import { BlogState } from '../../../../shared/store/state/blog.state';
import { BrandState } from '../../../../shared/store/state/brand.state';
import { CategoryState } from '../../../../shared/store/state/category.state';
import { ProductState } from '../../../../shared/store/state/product.state';
import { ThemeState } from '../../../../shared/store/state/theme.state';

@Component({
  selector: 'app-vegetables-4',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, Select2Module, HasPermissionDirective,
            NgbModule, PageWrapperComponent, ButtonComponent,
            FormFieldsComponent, LinkComponent, ImageUploadComponent,
            AdvanceDropdownComponent],
  templateUrl: './vegetables-4.component.html',
  styleUrl: './vegetables-4.component.scss'
})
export class Vegetables4Component {

  @Select(ProductState.products) product$: Observable<Select2Data>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(ThemeState.homePage) home_page$: Observable<VegetablesFour>;
  @Select(BlogState.blogs) blogs$: Observable<Select2Data>;
  @Select(BrandState.brands) brand$: Observable<Select2Data>;

  public form: FormGroup;
  public page_data: VegetablesFour;
  public active = 'home_banner';
  public banner = 1;
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
    @Inject(DOCUMENT) private document: Document) {
    this.form = new FormGroup({
      content: new FormGroup({
        home_banner: new FormGroup({
          status: new FormControl(true),
          image_url: new FormControl(''),
          redirect_link: new FormGroup({
            link: new FormControl(''),
            link_type: new FormControl(''),
            product_ids: new FormControl(''),
          }),
        }),
        categories: new FormGroup({
          status: new FormControl(true),
          category_ids: new FormControl([])
        }),
        offer_banner_1: new FormGroup({
          status: new FormControl(true),
          banners: new FormArray([]),
        }),
        products_list_1: new FormGroup({
          title: new FormControl(''),
          sub_title: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        products_list_2: new FormGroup({
          title: new FormControl(''),
          sub_title: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        offer_banner_2: new FormGroup({
          status: new FormControl(true),
          banners: new FormArray([]),
        }),
        products_list_3: new FormGroup({
          title: new FormControl(''),
          sub_title: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        services: new FormGroup({
          banners: new FormArray([]),
          status: new FormControl(true),
        }),
        products_list_4: new FormGroup({
          title: new FormControl(''),
          sub_title: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        featured_blogs: new FormGroup({
          title: new FormControl(''),
          status: new FormControl(true),
          blog_ids: new FormControl([]),
        }),
        brand: new FormGroup({
          brand_ids: new FormControl(''),
          status: new FormControl(false),
        }),
        products_ids: new FormControl([]),
      }),
      slug: new FormControl('vegetables_four'),
    });
  }

  ngOnInit() {
    const home_page$ = this.store.dispatch(new GetHomePage({ slug: "vegetables_four" }));
    const categories$ = this.store.dispatch(new GetCategories({ status: 1, type: 'product' }));
    const brand$ = this.store.dispatch(new GetBrands({ status: 1 }));
    const blogs$ = this.store.dispatch(new GetBlogs({ status: 1 }));

    forkJoin([home_page$, categories$, brand$, blogs$]).subscribe({
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
        this.filter['search'] = inputValue;
        this.getProducts(this.filter)
        this.renderer.addClass(this.document.body, 'loader-none');
      });
  }

  patchForm() {
    this.home_page$.subscribe(homePage => {
      this.page_data = homePage;
      this.selectedCategories = homePage.content.categories.category_ids;
      this.form.patchValue({
        content: {
          home_banner: {
            status: homePage?.content?.home_banner?.status,
            image_url: homePage?.content?.home_banner?.image_url,
            redirect_link: {
              link: homePage?.content?.home_banner?.redirect_link?.link,
              link_type: homePage?.content?.home_banner?.redirect_link?.link_type,
              product_ids: homePage?.content?.home_banner?.redirect_link?.product_ids,
            },
          },
          categories: {
            status: homePage?.content?.categories?.status,
            category_ids: homePage?.content?.categories?.category_ids
          },
          offer_banner_1: {
            status: homePage?.content?.offer_banner_1?.status,
          },
          products_list_1: {
            title: homePage?.content?.products_list_1?.title,
            sub_title: homePage?.content?.products_list_1?.sub_title,
            product_ids: homePage?.content?.products_list_1?.product_ids,
            status: homePage?.content?.products_list_1?.status,
          },
          products_list_2: {
            title: homePage?.content?.products_list_2?.title,
            sub_title: homePage?.content?.products_list_2?.sub_title,
            product_ids: homePage?.content?.products_list_2?.product_ids,
            status: homePage?.content?.products_list_2?.status,
          },
          offer_banner_2: {
            status: homePage?.content?.offer_banner_2?.status,
          },
          products_list_3: {
            title: homePage?.content?.products_list_3?.title,
            sub_title: homePage?.content?.products_list_3?.sub_title,
            product_ids: homePage?.content?.products_list_3?.product_ids,
            status: homePage?.content?.products_list_3?.status,
          },
          services: {
            status: homePage?.content?.services?.status,
          },
          products_list_4: {
            title: homePage?.content?.products_list_4?.title,
            sub_title: homePage?.content?.products_list_4?.sub_title,
            product_ids: homePage?.content?.products_list_4?.product_ids,
            status: homePage?.content?.products_list_4?.status,
          },
          featured_blogs: {
            title: homePage?.content?.featured_blogs?.title,
            status: homePage?.content?.featured_blogs?.status,
            blog_ids: homePage?.content?.featured_blogs?.blog_ids,
          },
          brand: {
            brand_ids: homePage?.content?.brand?.brand_ids,
            status: homePage?.content?.brand?.status,
          },
          products_ids: homePage?.content?.products_ids,
        },
        slug: homePage?.slug
      })

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

      this.offerBannersArray.clear();
      homePage?.content?.offer_banner_1?.banners?.forEach((banner: Banners) =>
        this.offerBannersArray.push(
          this.formBuilder.group({
            redirect_link: new FormGroup({
              link: new FormControl(banner?.redirect_link?.link),
              link_type: new FormControl(banner?.redirect_link?.link_type),
            }),
            status: new FormControl(banner?.status),
            image_url: new FormControl(banner?.image_url),
          })
        ));

      this.offerBannersArray2.clear();
      homePage?.content?.offer_banner_2?.banners?.forEach((banner: Banners) =>
        this.offerBannersArray2.push(
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

  selectBanner(url: string, key: string) {
    this.form.get(key)?.setValue(url ? url : null);
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

  get servicesArray(): FormArray {
    return this.form.get('content.services.banners') as FormArray
  }

  get offerBannersArray(): FormArray {
    return this.form.get('content.offer_banner_1.banners') as FormArray
  }

  get offerBannersArray2(): FormArray {
    return this.form.get('content.offer_banner_2.banners') as FormArray
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

  addOfferBanner(event: Event) {
    event.preventDefault();
    this.offerBannersArray.push(
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

  addOfferBanner2(event: Event) {
    event.preventDefault();
    this.offerBannersArray2.push(
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

  removeServiceBanner(index: number) {
    if (this.servicesArray.length <= 1) return
    this.servicesArray.removeAt(index);
  }

  removeOfferBanner(index: number) {
    if (this.offerBannersArray.length <= 1) return
    this.offerBannersArray.removeAt(index);
  }

  removeOfferBanner2(index: number) {
    if (this.offerBannersArray2.length <= 1) return
    this.offerBannersArray2.removeAt(index);
  }

  selectServiceImage(url: string, index: number) {
    this.servicesArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectOfferBannerArray(url: string, index: number) {
    this.offerBannersArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectOfferBannerArray2(url: string, index: number) {
    this.offerBannersArray2.at(index).get('image_url')?.setValue(url ? url : null);
  }

  // Merge Products Ids
  concatDynamicProductKeys(obj: VegetablesFour) {
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
