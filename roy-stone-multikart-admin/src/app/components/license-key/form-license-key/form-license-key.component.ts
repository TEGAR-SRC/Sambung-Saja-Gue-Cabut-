import { Component, Inject, Input, Renderer2 } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../shared/store/state/product.state';
import { Observable, Subject, debounceTime, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { Select2, Select2Data, Select2Module, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LicenseKey } from '../../../shared/interface/license-key.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GetProducts } from '../../../shared/store/action/product.action';
import { CreateLicenseKey, EditLicenseKey, UpdateLicenseKey } from '../../../shared/store/action/license-key.actions';
import { LicenseKeysState } from '../../../shared/store/state/license-key.state';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-form-license-key',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule, CommonModule,
            Select2Module, FormFieldsComponent, ButtonComponent
  ],
  templateUrl: './form-license-key.component.html',
  styleUrl: './form-license-key.component.scss'
})
export class FormLicenseKeyComponent {

  @Input() type: string;

  @Select(ProductState.digitalProducts) product$: Observable<Select2Data>;

  public form: FormGroup;
  public licenseKey: LicenseKey | null;
  private search = new Subject<string>();
  private destroy$ = new Subject<void>();

  public separators: Select2Data = [{
    value: 'comma',
    label: 'Comma ( , )',
  },{
    value: 'semicolon',
    label: 'Semicolon ( ; )',
  },{
    value: 'pipe',
    label: 'Pipe ( | )',
  },{
    value: 'newline',
    label: 'Newline',
  }];

  constructor(private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
      this.form = this.formBuilder.group({
        license_key: new FormControl('', [Validators.required]),
        separator: new FormControl('', [Validators.required]),
        product_id: new FormControl('', [Validators.required]),
        variation_id: new FormControl(''),
        status: new FormControl(1)
      });
  }

  ngOnInit() {
    this.store.dispatch(new GetProducts({ status: 1, is_approved: 1, paginate: 15 }));
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditLicenseKey(params['id']))
                      .pipe(mergeMap(() => this.store.select(LicenseKeysState.selectedLicenseKey)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(licenseKey => {
        this.licenseKey = licenseKey;
        this.form.patchValue({
          license_key: this.licenseKey?.license_key,
          separator: this.licenseKey?.separator,
          product_id: this.licenseKey?.product_id,
          variation_id: this.licenseKey?.variation_id,
          status: this.licenseKey?.status
        });
      });

    this.search
      .pipe(debounceTime(300)) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        this.store.dispatch(new GetProducts({ status: 1, is_approved: 1, paginate: 15, search: inputValue }));
        this.renderer.addClass(this.document.body, 'loader-none');
    });
  }

  productDropdown(event: Select2){
    if(event['innerSearchText']){
      this.search.next('');
    }
  }

  searchProduct(event: Select2SearchEvent){
    this.search.next(event.search);
  }

  updateProduct(data: Select2UpdateEvent) {
    if(data && data.options.length) {
      if(data.options[0].data) {
        this.form.controls['product_id'].setValue(data.options[0].data.product_id);
        this.form.controls['variation_id'].setValue(data.options[0].data.variation_id ? data.options[0].data.variation_id : null);
      }
    }
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateLicenseKey(this.form.value);

    if(this.type == 'edit' && this.licenseKey?.id) {
      action = new UpdateLicenseKey(this.form.value, this.licenseKey.id)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/license-key');
        }
      });
    }
  }

}
