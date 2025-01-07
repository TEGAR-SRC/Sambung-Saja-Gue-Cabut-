import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Video } from '../../../shared/interface/theme.interface';
import { GetProducts } from '../../../shared/store/action/product.action';
import { GetHomePage, UpdateHomePage } from '../../../shared/store/action/theme.action';
import { ThemeState } from '../../../shared/store/state/theme.state';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            NgbModule, HasPermissionDirective, PageWrapperComponent,
            FormFieldsComponent, ImageUploadComponent, ButtonComponent
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {

  @Select(ThemeState.homePage) home_page$: Observable<Video>;

  public form: FormGroup;
  public page_data: Video;
  public active = 'video';
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
    @Inject(DOCUMENT) private document: Document) {
    this.form = new FormGroup({
      content: new FormGroup({
        video: new FormGroup({
          status: new FormControl(true),
          video_url: new FormControl(''),
        }),
      }),
      slug: new FormControl('video'),
    });
  }

  ngOnInit() {
    const home_page$ = this.store.dispatch(new GetHomePage({ slug: "video" }));
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
          video: {
            status: homePage?.content?.video?.status,
            video_url: homePage?.content?.video?.video_url,
          },
        },
        slug: homePage?.slug,
      });
    });
  }

  selectCategoryItem(data: Number[], key: string) {
    if (Array.isArray(data)) {
      this.form.get(key)?.setValue(data);
    }
  }

  selectBanner(url: string, key: string) {
    this.form.get(key)?.setValue(url ? url : null)
  }

  searchProduct(event: Select2SearchEvent) {
    this.search.next(event.search);
  }

  // Merge Products Ids
  concatDynamicProductKeys(obj: Video) {
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
