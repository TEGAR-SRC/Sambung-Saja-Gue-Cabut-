import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Select2SearchEvent } from 'ng-select2-component';
import { Observable, Subject, forkJoin } from 'rxjs';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { mediaConfig } from '../../../shared/data/media-config';
import { HasPermissionDirective } from '../../../shared/directive/has-permission.directive';
import { Parallax, ParallaxBanner } from '../../../shared/interface/theme.interface';
import { GetProducts } from '../../../shared/store/action/product.action';
import { GetHomePage, UpdateHomePage } from '../../../shared/store/action/theme.action';
import { ThemeState } from '../../../shared/store/state/theme.state';

@Component({
  selector: 'app-parallax',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            NgbModule, HasPermissionDirective, PageWrapperComponent,
            ButtonComponent, FormFieldsComponent, ImageUploadComponent
  ],
  templateUrl: './parallax.component.html',
  styleUrl: './parallax.component.scss'
})
export class ParallaxComponent {

  @Select(ThemeState.homePage) home_page$: Observable<Parallax>;

  public form: FormGroup;
  public page_data: Parallax;
  public active = 'parallax_banner';
  public banner = 1;
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

  constructor(private store: Store,private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document) {
    this.form = new FormGroup({
      content: new FormGroup({
        parallax_banner: new FormGroup({
          status: new FormControl(true),
          banners: new FormArray([]),
        }),
      }),
      slug: new FormControl('parallax'),
    });
  }

  ngOnInit() {
    const home_page$ = this.store.dispatch(new GetHomePage({ slug: "parallax" }));
    forkJoin([ home_page$]).subscribe({
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
  }

  patchForm() {
    this.home_page$.subscribe(homePage => {
      this.page_data = homePage;
      this.form.patchValue({
        content: {
          parallax_banner: {
            status: homePage?.content?.parallax_banner?.status,
          },
        },
        slug: homePage?.slug,
      });

      this.parallaxBannersArray.clear();
      homePage?.content?.parallax_banner?.banners?.forEach((banner: ParallaxBanner) =>
      this.parallaxBannersArray.push(
        this.formBuilder.group({
          status: new FormControl(banner?.status),
          main_title: new FormControl(banner?.main_title),
          title: new FormControl(banner?.title),
          sub_title: new FormControl(banner?.sub_title),
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

  searchProduct(event: Select2SearchEvent) {
    this.search.next(event.search);
  }

  get parallaxBannersArray(): FormArray {
    return this.form.get('content.parallax_banner.banners') as FormArray
  }

  addParallaxBanner(event: Event) {
    event.preventDefault();
    this.parallaxBannersArray.push(
      this.formBuilder.group({
        main_title: new FormControl(''),
        title: new FormControl(''),
        sub_title: new FormControl(''),
        image_url: new FormControl(),
        status: new FormControl(true),
      })
    );
  }

  removeParallaxBanner(index: number) {
    if(this.parallaxBannersArray.length <= 1) return
      this.parallaxBannersArray.removeAt(index);
  }

  selectParallaxBannerArray(url: string, index: number){
    this.parallaxBannersArray.at(index).get('image_url')?.setValue(url ? url : null);
  }

  selectImage(url: string, key: string) {
    this.form.get(key)?.setValue(url ? url : null)
  }

  // Merge Products Ids
  concatDynamicProductKeys(obj: Parallax) {
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
