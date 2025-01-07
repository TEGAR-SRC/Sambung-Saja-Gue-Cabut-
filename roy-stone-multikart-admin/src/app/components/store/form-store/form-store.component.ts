import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';
import { Observable, Subject, map, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { countryCodes } from '../../../shared/data/country-code';
import { mediaConfig } from '../../../shared/data/media-config';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { Stores } from '../../../shared/interface/store.interface';
import { CreateStore, EditStore, UpdateStore } from '../../../shared/store/action/store.action';
import { CountryState } from '../../../shared/store/state/country.state';
import { StateState } from '../../../shared/store/state/state.state';
import { StoreState } from '../../../shared/store/state/store.state';
import { CustomValidators } from '../../../shared/validator/password-match';

@Component({
  selector: 'app-form-store',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            Select2Module, CommonModule, FormFieldsComponent,
            ImageUploadComponent, ButtonComponent
  ],
  templateUrl: './form-store.component.html',
  styleUrl: './form-store.component.scss'
})
export class FormStoreComponent {

  @Input() type: string;

  @Select(CountryState.countries) countries$: Observable<Select2Data>;
  @Select(StoreState.selectedStore) store$: Observable<Stores>;

  public states$: Observable<Select2Data>;

  private destroy$ = new Subject<void>();

  public form: FormGroup;
  public id: number;
  public codes = countryCodes;
  public mediaConfig = mediaConfig;
  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      store_name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      country_id: new FormControl('', [Validators.required]),
      state_id: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      country_code: new FormControl('1', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
      store_logo_id: new FormControl(''),
      store_cover_id: new FormControl(''),
      hide_vendor_email: new FormControl(0),
      hide_vendor_phone: new FormControl(0),
      status: new FormControl(1),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      pinterest: new FormControl(''),
      youtube: new FormControl(''),
      twitter: new FormControl(''),
    }
  ,{
    validator : CustomValidators.MatchValidator('password', 'password_confirmation')
  })
}

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('password_confirmation')?.touched
    );
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            this.states$ = this.store
                .select(StateState.states)
                .pipe(map(filterFn => filterFn(null)));
            return this.store
                      .dispatch(new EditStore(params['id']))
                      .pipe(mergeMap(() => this.store.select(StoreState.selectedStore)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(store => {
        this.id = store?.id!;
        this.form.patchValue({
          store_name: store?.store_name,
          description: store?.description,
          country_id: store?.country_id,
          state_id: store?.state_id,
          city: store?.city,
          address: store?.address,
          pincode: store?.pincode,
          name: store?.vendor?.name,
          email: store?.vendor?.email,
          country_code: store?.vendor?.country_code,
          phone: store?.vendor?.phone,
          store_logo_id: store?.store_logo_id,
          store_cover_id: store?.store_cover_id,
          hide_vendor_email: store?.hide_vendor_email,
          hide_vendor_phone: store?.hide_vendor_phone,
          status: store?.status,
          facebook: store?.facebook,
          instagram: store?.instagram,
          pinterest: store?.pinterest,
          youtube: store?.youtube,
          twitter: store?.twitter,
        });
      });
  }

  countryChange(data: Select2UpdateEvent) {
    if(data && data?.value) {
      this.states$ = this.store
          .select(StateState.states)
          .pipe(map(filterFn => filterFn(+data?.value)));
      this.form.controls['state_id'].setValue('');
    } else {
      this.form.controls['state_id'].setValue('');
    }
  }

  selectStoreLogo(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['store_logo_id'].setValue(data ? data.id : '');
    }
  }

  selectStoreCover(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['store_cover_id'].setValue(data ? data.id : '');
    }
  }

  submit() {
    this.form.markAllAsTouched();

    let action = new CreateStore(this.form.value);
    if(this.type == 'edit' && this.id) {
      this.form.removeControl('password');
      this.form.removeControl('password_confirmation');
      action = new UpdateStore(this.form.value, this.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.form.reset();
          this.router.navigateByUrl('/store');
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
