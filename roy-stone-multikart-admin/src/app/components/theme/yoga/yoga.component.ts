import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2Module, Select2SearchEvent } from 'ng-select2-component';
import { Observable, Subject, debounceTime, forkJoin } from 'rxjs';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { LinkComponent } from '../../../shared/components/ui/link/link.component';
import { mediaConfig } from '../../../shared/data/media-config';
import { HasPermissionDirective } from '../../../shared/directive/has-permission.directive';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { Banners, Yoga } from '../../../shared/interface/theme.interface';
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

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, Select2Module, HasPermissionDirective,
            NgbModule, PageWrapperComponent, ButtonComponent,
            FormFieldsComponent, LinkComponent, ImageUploadComponent],
  templateUrl: './yoga.component.html',
  styleUrl: './yoga.component.scss'
})
export class YogaComponent {

  @Select(ProductState.products) product$: Observable<Select2Data>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(BlogState.blogs) blogs$: Observable<Select2Data>;
  @Select(ThemeState.homePage) home_page$: Observable<Yoga>;
  @Select(BrandState.brands) brand$: Observable<Select2Data>;

  public form: FormGroup;
  public page_data: Yoga;
  public active = 'home_banner';
  public banner = 1;
  public postBanner = 1;
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
    public formBuilder: FormBuilder,
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
        offer_banner_1: new FormGroup({
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
          banner_3: new FormGroup({
            image_url: new FormControl(),
            status: new FormControl(true),
            redirect_link: new FormGroup({
              link: new FormControl(''),
              link_type: new FormControl(''),
              product_ids: new FormControl(''),
            }),
          })
        }),
        products_list_1: new FormGroup({
          tag: new FormControl(''),
          title: new FormControl(''),
          description: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        products_list_2: new FormGroup({
          tag: new FormControl(''),
          title: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        offer_banner_2: new FormGroup({
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
          banner_3: new FormGroup({
            image_url: new FormControl(),
            status: new FormControl(true),
            redirect_link: new FormGroup({
              link: new FormControl(''),
              link_type: new FormControl(''),
              product_ids: new FormControl(''),
            }),
          })
        }),
        featured_blogs: new FormGroup({
          title: new FormControl(''),
          tag: new FormControl(''),
          status: new FormControl(true),
          blog_ids: new FormControl([]),
        }),
        social_media: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(''),
          banners: new FormArray([])
        }),
        brand: new FormGroup({
          brand_ids: new FormControl(''),
          status: new FormControl(false),
        }),
        products_ids: new FormControl([]),
      }),
      slug: new FormControl('yoga')
    })
  }

  ngOnInit() {
    const blogs$ = this.store.dispatch(new GetBlogs({ status: 1 }));
    const categories$ = this.store.dispatch(new GetCategories({ status: 1, type: 'product' }));
    const home_page$ = this.store.dispatch(new GetHomePage({ slug: "yoga" }));
    const brand$ = this.store.dispatch(new GetBrands({ status: 1 }));

    forkJoin([blogs$, home_page$, categories$, brand$]).subscribe({
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
          offer_banner_1: {
            banner_1: {
              image_url: homePage?.content?.offer_banner_1?.banner_1?.image_url,
              status: homePage?.content?.offer_banner_1?.banner_1?.status,
              redirect_link: {
                link: homePage?.content?.offer_banner_1?.banner_1?.redirect_link?.link,
                link_type: homePage?.content?.offer_banner_1?.banner_1?.redirect_link?.link_type,
                product_ids: homePage?.content?.offer_banner_1?.banner_1?.redirect_link?.product_ids
              }
            },
            banner_2: {
              image_url: homePage?.content?.offer_banner_1?.banner_2?.image_url,
              status: homePage?.content?.offer_banner_1?.banner_2?.status,
              redirect_link: {
                link: homePage?.content?.offer_banner_1?.banner_2?.redirect_link?.link,
                link_type: homePage?.content?.offer_banner_1?.banner_2?.redirect_link?.link_type,
                product_ids: homePage?.content?.offer_banner_1?.banner_2?.redirect_link?.product_ids
              }
            },
            banner_3: {
              image_url: homePage?.content?.offer_banner_1?.banner_3?.image_url,
              status: homePage?.content?.offer_banner_1?.banner_3?.status,
              redirect_link: {
                link: homePage?.content?.offer_banner_1?.banner_3?.redirect_link?.link,
                link_type: homePage?.content?.offer_banner_1?.banner_3?.redirect_link?.link_type,
                product_ids: homePage?.content?.offer_banner_1?.banner_3?.redirect_link?.product_ids
              }
            }
          },
          products_list_1: {
            title: homePage?.content?.products_list_1?.title,
            tag: homePage?.content?.products_list_1?.tag,
            description: homePage?.content?.products_list_1?.description,
            product_ids: homePage?.content?.products_list_1?.product_ids,
            status: homePage?.content?.products_list_1?.status,
          },
          products_list_2: {
            title: homePage?.content?.products_list_2?.title,
            tag: homePage?.content?.products_list_2?.tag,
            product_ids: homePage?.content?.products_list_2?.product_ids,
            status: homePage?.content?.products_list_2?.status,
          },
          offer_banner_2: {
            banner_1: {
              image_url: homePage?.content?.offer_banner_2?.banner_1?.image_url,
              status: homePage?.content?.offer_banner_2?.banner_1?.status,
              redirect_link: {
                link: homePage?.content?.offer_banner_2?.banner_1?.redirect_link?.link,
                link_type: homePage?.content?.offer_banner_2?.banner_1?.redirect_link?.link_type,
                product_ids: homePage?.content?.offer_banner_2?.banner_1?.redirect_link?.product_ids
              }
            },
            banner_2: {
              image_url: homePage?.content?.offer_banner_2?.banner_2?.image_url,
              status: homePage?.content?.offer_banner_2?.banner_2?.status,
              redirect_link: {
                link: homePage?.content?.offer_banner_2?.banner_2?.redirect_link?.link,
                link_type: homePage?.content?.offer_banner_2?.banner_2?.redirect_link?.link_type,
                product_ids: homePage?.content?.offer_banner_2?.banner_2?.redirect_link?.product_ids
              }
            },
            banner_3: {
              image_url: homePage?.content?.offer_banner_2?.banner_3?.image_url,
              status: homePage?.content?.offer_banner_2?.banner_3?.status,
              redirect_link: {
                link: homePage?.content?.offer_banner_2?.banner_3?.redirect_link?.link,
                link_type: homePage?.content?.offer_banner_2?.banner_3?.redirect_link?.link_type,
                product_ids: homePage?.content?.offer_banner_2?.banner_3?.redirect_link?.product_ids
              }
            }
          },
          featured_blogs: {
            tag: homePage?.content?.featured_blogs?.tag,
            title: homePage?.content?.featured_blogs?.title,
            status: homePage?.content?.featured_blogs?.status,
            blog_ids: homePage?.content?.featured_blogs?.blog_ids,
          },
          social_media: {
            title: homePage?.content.social_media?.title,
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

  get socialMediaArray(): FormArray {
    return this.form.get('content.social_media.banners') as FormArray
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

  searchProduct(event: Select2SearchEvent) {
    this.search.next(event.search);
  }

  selectImage(url: string, key: string) {
    this.form.get(key)?.setValue(url ? url : null)
  }

  selectSocialMediaImage(url: string, index: number) {
    this.socialMediaArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  removeSocialMediaBanner(index: number) {
    if (this.socialMediaArray.length <= 1) return
    this.socialMediaArray.removeAt(index);
  }

  // Merge Products Ids
  concatDynamicProductKeys(obj: Yoga) {
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
      this.store.dispatch(new UpdateHomePage(this.page_data?.id, this.form.value));
    }
  }

}
