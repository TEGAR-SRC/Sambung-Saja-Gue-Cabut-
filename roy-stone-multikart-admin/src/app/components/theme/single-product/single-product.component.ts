import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2Module, Select2SearchEvent } from 'ng-select2-component';
import { Observable, Subject, debounceTime, forkJoin, map } from 'rxjs';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProducts } from '../../../shared/store/action/product.action';
import { GetHomePage, UpdateHomePage } from '../../../shared/store/action/theme.action';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { Banners, SingleProduct, TestimonialBanner } from '../../../shared/interface/theme.interface';
import { BlogState } from '../../../shared/store/state/blog.state';
import { BrandState } from '../../../shared/store/state/brand.state';
import { CategoryState } from '../../../shared/store/state/category.state';
import { ProductState } from '../../../shared/store/state/product.state';
import { ThemeState } from '../../../shared/store/state/theme.state';
import { mediaConfig } from '../../../shared/data/media-config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { AdvanceDropdownComponent } from '../../../shared/components/ui/advance-dropdown/advance-dropdown.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { HasPermissionDirective } from '../../../shared/directive/has-permission.directive';
import { LinkComponent } from '../../../shared/components/ui/link/link.component';
import { AttributeModel } from '../../../shared/interface/attribute.interface';
import { AttributeState } from '../../../shared/store/state/attribute.state';
import { GetAttributes } from '../../../shared/store/action/attribute.action';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, Select2Module, HasPermissionDirective,
            NgbModule, PageWrapperComponent, ButtonComponent,
            FormFieldsComponent, LinkComponent, ImageUploadComponent,
            AdvanceDropdownComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {

  @Select(ProductState.products) product$: Observable<Select2Data>;
  @Select(BlogState.blogs) blogs$: Observable<Select2Data>;
  @Select(ThemeState.homePage) home_page$: Observable<SingleProduct>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(BrandState.brands) brand$: Observable<Select2Data>;

  public attribute$: Observable<Select2Data>;
  public form: FormGroup;
  public page_data: SingleProduct;
  public active = 'home_banner';
  public banner = 1;
  public selectedCategories1: number[] = [];
  public selectedCategories2: number[] = [];
  public selectedCategories3: number[] = [];
  public gridBanner = 1;
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
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
    this.form = new FormGroup({
      content: new FormGroup({
        home_banner: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(''),
          description: new FormControl(''),
          show_button: new FormControl(true),
          button_text: new FormControl(''),
          redirect_link: new FormGroup({
            link: new FormControl(''),
            link_type: new FormControl(''),
            product_ids: new FormControl(''),
          }),
          banner_image: new FormControl('')
        }),
        services: new FormGroup({
          status: new FormControl(true),
          left_panel: new FormGroup({
            title: new FormControl(''),
            description: new FormControl(''),
            status: new FormControl(true),
          }),
          right_panel: new FormGroup({
            status: new FormControl(true),
            banners: new FormArray([]),
          })
        }),
        grid_banner: new FormGroup({
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
        product_video: new FormGroup({
          status: new FormControl(true),
          image: new FormControl(''),
          video: new FormControl('')
        }),
        single_product: new FormGroup({
          title: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        products_list: new FormGroup({
          title: new FormControl(''),
          product_ids: new FormControl([]),
          status: new FormControl(true),
        }),
        testimonial: new FormGroup({
          title: new FormControl(''),
          status: new FormControl(true),
          banners: new FormArray([]),
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
      slug: new FormControl('single_product'),
    });
  }

  ngOnInit() {
    const blogs$ = this.store.dispatch(new GetBlogs({ status: 1 }));
    const home_page$ = this.store.dispatch(new GetHomePage({ slug: "single_product" }));
    const categories$ = this.store.dispatch(new GetCategories({ status: 1, type: 'product' }));
    const brand$ = this.store.dispatch(new GetBrands({ status: 1 }));
    const attribute$ = this.store.dispatch(new GetAttributes);

    this.attribute$ = this.store.select(AttributeState.attributes)
                        .pipe(map(filterFn => filterFn('')));

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

      this.form.patchValue({
        content: {
          home_banner: {
            status: homePage?.content?.home_banner?.status,
            title: homePage?.content?.home_banner?.title,
            description: homePage?.content?.home_banner?.description,
            show_button: homePage?.content?.home_banner?.show_button,
            button_text: homePage?.content?.home_banner?.button_text,
            redirect_link: {
              link: homePage?.content?.home_banner?.redirect_link?.link,
              link_type: homePage?.content?.home_banner?.redirect_link?.link_type,
              product_ids: homePage?.content?.home_banner?.redirect_link?.product_ids
            },
            banner_image: homePage?.content?.home_banner?.banner_image,
          },
          services: {
            status: homePage?.content?.services?.status,
            left_panel: {
              title: homePage?.content?.services?.left_panel?.title,
              description: homePage?.content?.services?.left_panel?.description,
              status: homePage?.content?.services?.left_panel?.status,
            },
            right_panel: {
              status: homePage?.content?.services?.right_panel?.status,
            }
          },
          grid_banner: {
            banner_1: {
              image_url: homePage?.content?.grid_banner?.banner_1?.image_url,
              status: homePage?.content?.grid_banner?.banner_1?.status,
              redirect_link: {
                link: homePage?.content?.grid_banner?.banner_1?.redirect_link?.link,
                link_type: homePage?.content?.grid_banner?.banner_1?.redirect_link?.link_type,
                product_ids: homePage?.content?.grid_banner?.banner_1?.redirect_link?.product_ids
              }
            },
            banner_2: {
              image_url: homePage?.content?.grid_banner?.banner_2?.image_url,
              status: homePage?.content?.grid_banner?.banner_2?.status,
              redirect_link: {
                link: homePage?.content?.grid_banner?.banner_2?.redirect_link?.link,
                link_type: homePage?.content?.grid_banner?.banner_2?.redirect_link?.link_type,
                product_ids: homePage?.content?.grid_banner?.banner_2?.redirect_link?.product_ids
              }
            },
            banner_3: {
              image_url: homePage?.content?.grid_banner?.banner_3?.image_url,
              status: homePage?.content?.grid_banner?.banner_3?.status,
              redirect_link: {
                link: homePage?.content?.grid_banner?.banner_3?.redirect_link?.link,
                link_type: homePage?.content?.grid_banner?.banner_3?.redirect_link?.link_type,
                product_ids: homePage?.content?.grid_banner?.banner_3?.redirect_link?.product_ids
              }
            }
          },
          product_video: {
            status: homePage?.content?.product_video?.status,
            image: homePage?.content?.product_video?.image,
            video: homePage?.content?.product_video?.video
          },
          single_product: {
            status: homePage?.content?.single_product?.status,
            title: homePage?.content?.single_product?.title,
            product_ids: homePage?.content?.single_product?.product_ids,
          },
          products_list: {
            status: homePage?.content?.products_list?.status,
            title: homePage?.content?.products_list?.title,
            product_ids: homePage?.content?.products_list?.product_ids,
          },
          testimonial: {
            title: homePage?.content?.testimonial?.title,
            status: homePage?.content?.testimonial?.status,
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
        slug: homePage?.slug,
      });

      this.servicesArray.clear();
      homePage?.content?.services?.right_panel?.banners?.forEach((banner: Banners) =>
      this.servicesArray.push(
        this.formBuilder.group({
          title: new FormControl(banner?.title),
          description: new FormControl(banner?.description),
          status: new FormControl(banner?.status),
          image_url: new FormControl(banner?.image_url),
        })
      ));

      this.testimonialArray.clear();
      homePage?.content?.testimonial?.banners?.forEach((banner: TestimonialBanner) =>
      this.testimonialArray.push(
        this.formBuilder.group({
          name: new FormControl(banner?.name),
          image_url: new FormControl(banner?.image_url),
          review: new FormControl(banner?.review),
          status: new FormControl(banner?.status),
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

    });
  }

  selectCategoryItem(data: Number[], key: string) {
    if (Array.isArray(data)) {
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
    return this.form.get('content.services.right_panel.banners') as FormArray
  }

  get testimonialArray(): FormArray {
    return this.form.get('content.testimonial.banners') as FormArray
  }

  get socialMediaArray(): FormArray {
    return this.form.get('content.social_media.banners') as FormArray
  }

  addServiceBanner(event: Event) {
    event.preventDefault();
    if (this.servicesArray.length != 3) {
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

  addTestimonialBanner(event: Event) {
    event.preventDefault();
    this.testimonialArray.push(
      this.formBuilder.group({
        name: new FormControl(),
        image_url: new FormControl(),
        review: new FormControl(),
        status: new FormControl(true),
      })
    );
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

  removeServiceBanner(index: number) {
    if (this.servicesArray.length <= 1) return
    this.servicesArray.removeAt(index);
  }

  removeTestimonialBanner(index: number) {
    if (this.testimonialArray.length <= 1) return
    this.testimonialArray.removeAt(index);
  }
  
  removeSocialMediaBanner(index: number) {
    if (this.socialMediaArray.length <= 1) return
    this.socialMediaArray.removeAt(index);
  }

  selectImage(url: string, key: string) {
    this.form.get(key)?.setValue(url ? url : null)
  }

  selectServiceImage(url: string, index: number) {
    this.servicesArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectTestimonialImage(url: string, index: number) {
    this.testimonialArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectSocialMediaImage(url: string, index: number) {
    this.socialMediaArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  // Merge Products Ids
  concatDynamicProductKeys(obj: SingleProduct) {
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
