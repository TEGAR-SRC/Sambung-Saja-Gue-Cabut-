import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Subject, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { mediaConfig } from '../../../shared/data/media-config';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { Brand } from '../../../shared/interface/brand.interface';
import { CreateBrand, EditBrand, UpdateBrand } from '../../../shared/store/action/brand.action';
import { BrandState } from '../../../shared/store/state/brand.state';

@Component({
  selector: 'app-form-brand',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            FormFieldsComponent, ImageUploadComponent, ButtonComponent],
  templateUrl: './form-brand.component.html',
  styleUrl: './form-brand.component.scss'
})
export class FormBrandComponent {

  @Input() type: string;

  public form: FormGroup;
  public brand: Brand | null;
  public mediaConfig = mediaConfig;

  private destroy$ = new Subject<void>();

  constructor(private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        brand_image_id: new FormControl(),
        status: new FormControl(true),
        brand_banner_id: new FormControl(),
        brand_meta_image_id: new FormControl(),
        meta_title: new FormControl(),
        meta_description: new FormControl(),
      });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditBrand(params['id']))
                      .pipe(mergeMap(() => this.store.select(BrandState.selectedBrand)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(faq => {
        this.brand = faq;
        this.form.patchValue({
          name: this.brand?.name,
          brand_image_id: this.brand?.brand_image_id,
          brand_meta_image_id: this.brand?.brand_meta_image_id,
          meta_title: this.brand?.meta_title,
          brand_banner_id: this.brand?.brand_banner_id,
          meta_description: this.brand?.meta_description,
          status: this.brand?.status
        });
      });
  }

  selectBrandImage(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['brand_image_id'].setValue(data ? data.id : '');
    }
  }

  selectBannerImage(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['brand_banner_id'].setValue(data ? data.id : '');
    }
  }

  selectMetaImage(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['brand_meta_image_id'].setValue(data ? data.id : '');
    }
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateBrand(this.form.value);

    if(this.type == 'edit' && this.brand?.id) {
      action = new UpdateBrand(this.form.value, this.brand.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
            this.router.navigateByUrl('/brand');
        }
      });
    }
  }

}
