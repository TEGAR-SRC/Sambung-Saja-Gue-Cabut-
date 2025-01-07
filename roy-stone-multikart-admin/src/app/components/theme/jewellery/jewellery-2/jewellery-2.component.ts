import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2Module, Select2SearchEvent } from 'ng-select2-component';
import { Observable, Subject, debounceTime, forkJoin } from 'rxjs';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProducts } from '../../../../shared/store/action/product.action';
import { GetHomePage, UpdateHomePage } from '../../../../shared/store/action/theme.action';
import { CategoryModel } from '../../../../shared/interface/category.interface';
import { Banners, JewelryTwo, } from '../../../../shared/interface/theme.interface';
import { BrandState } from '../../../../shared/store/state/brand.state';
import { CategoryState } from '../../../../shared/store/state/category.state';
import { ProductState } from '../../../../shared/store/state/product.state';
import { ThemeState } from '../../../../shared/store/state/theme.state';
import { mediaConfig } from '../../../../shared/data/media-config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperComponent } from '../../../../shared/components/page-wrapper/page-wrapper.component';
import { AdvanceDropdownComponent } from '../../../../shared/components/ui/advance-dropdown/advance-dropdown.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../../shared/components/ui/image-upload/image-upload.component';
import { HasPermissionDirective } from '../../../../shared/directive/has-permission.directive';
import { LinkComponent } from '../../../../shared/components/ui/link/link.component';

@Component({
  selector: 'app-jewellery-2',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, Select2Module, HasPermissionDirective,
            NgbModule, PageWrapperComponent, ButtonComponent,
            FormFieldsComponent, LinkComponent, ImageUploadComponent,
            AdvanceDropdownComponent],
  templateUrl: './jewellery-2.component.html',
  styleUrl: './jewellery-2.component.scss'
})
export class Jewellery2Component {

  @Select(ProductState.products) product$: Observable<Select2Data>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(ThemeState.homePage) home_page$: Observable<JewelryTwo>;
  @Select(BrandState.brands) brand$: Observable<Select2Data>;

  public form: FormGroup;
  public page_data: JewelryTwo;
  public active = 'home_banner';
  public banner = 1;
  public two_banner = 1;
  public selectedCategories: number[] = [];
  public selectedCategories2: number[] = [];
  public sliderProducts = 1;
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
          banners: new FormArray([]),
        }),
        offer_banner_1: new FormGroup({
          status: new FormControl(true),
          banners: new FormArray([]),
        }),
        categories: new FormGroup({
          status: new FormControl(true),
          category_ids: new FormControl([])
        }),
        products_list_1: new FormGroup({
          title: new FormControl(''),
          description: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        banner: new FormGroup({
          image_url: new FormControl(''),
          redirect_link: new FormGroup({
            link: new FormControl(''),
            link_type: new FormControl(''),
            product_ids: new FormControl(''),
          }),
          status: new FormControl(),
        }),
        services: new FormGroup({
          banners: new FormArray([]),
          status: new FormControl(true),
        }),
        product_banner: new FormGroup({
          status: new FormControl(true),
          left_panel: new FormGroup({
            product_ids: new FormControl([]),
            title: new FormControl(''),
            status: new FormControl(true),
          }),
          center_panel: new FormGroup({
            banner_1: new FormGroup({
              image_url: new FormControl(),
              status: new FormControl(true),
              redirect_link: new FormGroup({
                link: new FormControl(''),
                link_type: new FormControl(''),
                product_ids: new FormControl(''),
              }),
            }),
            banner_2: new FormGroup({
              image_url: new FormControl(),
              status: new FormControl(true),
              redirect_link: new FormGroup({
                link: new FormControl(''),
                link_type: new FormControl(''),
                product_ids: new FormControl(''),
              }),
            }),
          }),
          right_panel: new FormGroup({
            product_ids: new FormControl([]),
            title: new FormControl(''),
            status: new FormControl(true),
          })
        }),
        offer_banner_2: new FormGroup({
          status: new FormControl(true),
          image_url: new FormControl(''),
          redirect_link: new FormGroup({
            link: new FormControl(''),
            link_type: new FormControl(''),
            product_ids: new FormControl(''),
          }),
        }),
        social_media: new FormGroup({
          title: new FormControl(''),
          status: new FormControl(true),
          banners: new FormArray([])
        }),
        products_list_2: new FormGroup({
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        brand: new FormGroup({
          brand_ids: new FormControl(''),
          status: new FormControl(false),
        }),
        products_ids: new FormControl([]),
      }),
      slug: new FormControl('jewellery_two'),
    });
  }

  ngOnInit() {
    const home_page$ = this.store.dispatch(new GetHomePage({ slug: "jewellery_two" }));
    const categories$ = this.store.dispatch(new GetCategories({ status: 1, type: 'product' }));
    const brand$ = this.store.dispatch(new GetBrands({ status: 1 }));

    forkJoin([home_page$, categories$, brand$]).subscribe({
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
          },
          offer_banner_1: {
            status: homePage?.content?.offer_banner_1?.status,
          },
          categories: {
            status: homePage?.content?.categories?.status,
            category_ids: homePage?.content?.categories?.category_ids
          },
          products_list_1: {
            title: homePage?.content?.products_list_1?.title,
            description: homePage?.content?.products_list_1?.description,
            product_ids: homePage?.content?.products_list_1?.product_ids,
            status: homePage?.content?.products_list_1?.status,
          },
          banner: {
            status: homePage?.content?.banner?.status,
            image_url: homePage?.content?.banner?.image_url,
            redirect_link: {
              link: homePage?.content?.banner?.redirect_link?.link,
              link_type: homePage?.content?.banner?.redirect_link?.link_type,
              product_ids: homePage?.content?.banner?.redirect_link?.product_ids,
            },
          },
          services: {
            status: homePage?.content?.services?.status,
          },
          product_banner: {
            status: homePage?.content?.product_banner?.status,
            left_panel: {
              product_ids: homePage?.content?.product_banner?.left_panel?.product_ids,
              title: homePage?.content?.product_banner?.left_panel?.title,
              status: homePage?.content?.product_banner?.left_panel?.status,
            },
            center_panel: {
              banner_1: {
                image_url: homePage?.content?.product_banner?.center_panel.banner_1?.image_url,
                status: homePage?.content?.product_banner?.center_panel.banner_1?.status,
                redirect_link: {
                  link: homePage?.content?.product_banner?.center_panel.banner_1?.redirect_link?.link,
                  link_type: homePage?.content?.product_banner?.center_panel.banner_1?.redirect_link?.link_type,
                  product_ids: homePage?.content?.product_banner?.center_panel.banner_1?.redirect_link?.product_ids
                }
              },
              banner_2: {
                image_url: homePage?.content?.product_banner?.center_panel.banner_2?.image_url,
                status: homePage?.content?.product_banner?.center_panel.banner_2?.status,
                redirect_link: {
                  link: homePage?.content?.product_banner?.center_panel.banner_2?.redirect_link?.link,
                  link_type: homePage?.content?.product_banner?.center_panel.banner_2?.redirect_link?.link_type,
                  product_ids: homePage?.content?.product_banner?.center_panel.banner_2?.redirect_link?.product_ids
                }
              },
            },
            right_panel: {
              product_ids: homePage?.content?.product_banner?.right_panel?.product_ids,
              title: homePage?.content?.product_banner?.right_panel?.title,
              status: homePage?.content?.product_banner?.right_panel?.status,
            }
          },
          offer_banner_2: {
            status: homePage?.content?.offer_banner_2?.status,
            image_url: homePage?.content?.offer_banner_2?.image_url,
            redirect_link: {
              link: homePage?.content?.offer_banner_2?.redirect_link?.link,
              link_type: homePage?.content?.offer_banner_2?.redirect_link?.link_type,
              product_ids: homePage?.content?.offer_banner_2?.redirect_link?.product_ids,
            },
          },
          products_list_2: {
            product_ids: homePage?.content?.products_list_2?.product_ids,
            status: homePage?.content?.products_list_2?.status,
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

  get offerBannersArray(): FormArray {
    return this.form.get('content.offer_banner_1.banners') as FormArray
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

  removeOfferBanner(index: number) {
    if (this.offerBannersArray.length <= 1) return
    this.offerBannersArray.removeAt(index);
  }

  removeServiceBanner(index: number) {
    if (this.servicesArray.length <= 1) return
    this.servicesArray.removeAt(index);
  }

  removeSocialMediaBanner(index: number) {
    if (this.socialMediaArray.length <= 1) return
    this.socialMediaArray.removeAt(index);
  }
  selectImage(url: string, key: string) {
    this.form.get(key)?.setValue(url ? url : null)
  }

  selectHomeBannerArray(url: string, index: number) {
    this.homeBannersArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectOffersBannerArray(url: string, index: number) {
    this.offerBannersArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectServiceImage(url: string, index: number) {
    this.servicesArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectSocialMediaImage(url: string, index: number) {
    this.socialMediaArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  // Merge Products Ids
  concatDynamicProductKeys(obj: JewelryTwo) {
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
