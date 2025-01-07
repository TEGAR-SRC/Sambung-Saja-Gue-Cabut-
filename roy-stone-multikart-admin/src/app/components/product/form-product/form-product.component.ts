import { Component, Inject, Input, Renderer2, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbModule, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { AccountState } from '../../../shared/store/state/account.state';
import { ProductState } from '../../../shared/store/state/product.state';
import { StoreState } from '../../../shared/store/state/store.state';
import { CategoryState } from '../../../shared/store/state/category.state';
import { TagState } from '../../../shared/store/state/tag.state';
import { TaxState } from '../../../shared/store/state/tax.state';
import { SettingState } from '../../../shared/store/state/setting.state';
import { BrandState } from '../../../shared/store/state/brand.state';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { AccountUser } from '../../../shared/interface/account.interface';
import { Select2, Select2Data, Select2Module, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { TagModel } from '../../../shared/interface/tag.interface';
import { Values } from '../../../shared/interface/setting.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, Variant, Variation, VariationCombination, WholesalePrice } from '../../../shared/interface/product.interface';
import { MediaConfig, mediaConfig } from '../../../shared/data/media-config';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GetStores } from '../../../shared/store/action/store.action';
import { GetAttributeValues, GetAttributes } from '../../../shared/store/action/attribute.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetTags } from '../../../shared/store/action/tag.action';
import { GetTaxes } from '../../../shared/store/action/tax.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { AttributeState } from '../../../shared/store/state/attribute.state';
import { priceValidator } from '../../../shared/validator/price-validator';
import { CreateProduct, EditProduct, GetProducts, UpdateProduct } from '../../../shared/store/action/product.action';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldsComponent } from '../../../shared/components/ui/form-fields/form-fields.component';
import { ImageUploadComponent } from '../../../shared/components/ui/image-upload/image-upload.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { AdvanceDropdownComponent } from '../../../shared/components/ui/advance-dropdown/advance-dropdown.component';

function convertToNgbDate(date: NgbDateStruct): NgbDate {
  return new NgbDate(date.year, date.month, date.day);
}

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule,
            ReactiveFormsModule, NgbModule, Select2Module,
            NgxEditorModule,FormFieldsComponent, ImageUploadComponent,
            ButtonComponent, AdvanceDropdownComponent
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent {

  @Input() type: string;

  @ViewChild('nav') nav: NgbNav;

  @Select(AccountState.user) user$: Observable<AccountUser>;
  @Select(ProductState.selectedProduct) product$: Observable<Product>;
  @Select(ProductState.products) products$: Observable<Select2Data>;
  @Select(StoreState.stores) store$: Observable<Select2Data>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;
  @Select(TagState.tag) tag$: Observable<TagModel>;
  @Select(TaxState.taxes) tax$: Observable<Select2Data>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(BrandState.brands) brand$: Observable<Select2Data>;

  public attribute$: Observable<Select2Data>;
  public active = 'general';
  public tabError: string[] | null = [];
  public form: FormGroup;
  public id: number;
  public selectedCategories: number[] = [];
  public selectedTags: number[] = [];
  public variationCombinations: VariationCombination[] = [];
  public retrieveVariants: boolean = false;
  public variantCount: number = 0;
	public fromDate: NgbDate | null;
	public toDate: NgbDate | null;
  public hoveredDate: NgbDate | null = null;
  public collectionProduct: Select2Data;
  public product: Product;
  private destroy$ = new Subject<void>();
  public mediaConfig: MediaConfig = mediaConfig;
  public editor: Editor;
  public html = '';
  public isCodeEditor = true;
  public mainProductType: Select2Data = [{
    value: 'physical',
    label: 'Physical Product',
  },{
    value: 'digital',
    label: 'Digital Product',
  },{
    value: 'external',
    label: 'External/Affiliate product',
  }];

  public productType: Select2Data = [{
    value: 'simple',
    label: 'Simple Product',
  },{
    value: 'classified',
    label: 'Variable Product',
  }];

  public stocks: Select2Data = [{
    value: 'in_stock',
    label: 'In Stock',
  },{
    value: 'out_of_stock',
    label: 'Out of Stock',
  }];

  public wholesalePriceType: Select2Data = [{
    value: 'fixed',
    label: 'Fixed',
  },{
    value: 'percentage',
    label: 'Percentage',
  }];

  public separators: Select2Data = [{
    value: 'comma',
    label: 'Comma ( , )',
  },{
    value: 'semicolon',
    label: 'Semicolon ( ; )',
  },{
    value: 'pipe',
    label: 'Pipe ( | )',
  }];

  public waterMakrPosition: Select2Data = [{
    value: 'top-left',
    label: 'Top Left',
  },{
    value: 'top',
    label: 'Top',
  },{
    value: 'top-right',
    label: 'Top Right',
  },{
    value: 'left',
    label: 'Left',
  },{
    value: 'center',
    label: 'Center',
  },{
    value: 'right',
    label: 'Right',
  },{
    value: 'bottom-left',
    label: 'Bottom Left',
  },{
    value: 'bottom',
    label: 'Bottom',
  },{
    value: 'bottom-right',
    label: 'Bottom Right',
  }];

  public previewType: Select2Data = [{
    value: 'video',
    label: 'Video',
  },{
    value: 'audio',
    label: 'Audio',
  },{
    value: 'url',
    label: 'URL',
  }];

  public filter = {
    'search': '',
    'paginate': 15,
    'ids': '',
    'with_union_products': 0,
    'is_approved': 1
  };

  public variants: Variant[] = [{
    id: null,
    attribute_values: null,
    options: null,
    variant_option: null
  }];
  public variations: Variation[] = [];

  public wholesalePrices: WholesalePrice[] = [];

  private search = new Subject<string>();
  public textArea = new FormControl('');
  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private renderer: Renderer2,

    @Inject(DOCUMENT) private document: Document) {

    this.store.dispatch(new GetStores({status: 1, is_approved: 1}));
    this.store.dispatch(new GetAttributes({status: 1}));
    this.store.dispatch(new GetAttributeValues({status: 1}));
    this.store.dispatch(new GetCategories({type: 'product', status: 1}));
    this.store.dispatch(new GetTags({type: 'product', status: 1}));
    this.store.dispatch(new GetTaxes({status: 1}));
    this.store.dispatch(new GetBrands({status: 1}));

    this.attribute$ = this.store.select(AttributeState.attributes)
                        .pipe(map(filterFn => filterFn('')));

    this.form = this.formBuilder.group({
      product_type: new FormControl('physical', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      short_description: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      store_id: new FormControl(),
      type: new FormControl('simple', [Validators.required]),
      digital_file_ids: new FormControl(),
      preview_type: new FormControl('url'),
      preview_audio_file_id: new FormControl(),
      preview_video_file_id: new FormControl(),
      is_licensable: new FormControl(0),
      is_licensekey_auto: new FormControl(0),
      license_key: new FormControl(),
      separator: new FormControl(),
      preview_url: new FormControl(),
      is_external: new FormControl(0),
      external_url: new FormControl(),
      external_button_text: new FormControl(),
      unit: new FormControl(),
      weight: new FormControl(),
      stock_status: new FormControl('in_stock', []),
      sku: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, priceValidator]),
      discount: new FormControl(),
      wholesale_price_type: new FormControl(),
      wholesale_prices:  this.formBuilder.array([], []),
      is_sale_enable: new FormControl(0),
      sale_starts_at: new FormControl(),
      sale_expired_at: new FormControl(),
      tags: new FormControl(),
      categories: new FormControl('', [Validators.required]),
      brand_id: new FormControl(''),
      is_random_related_products: new FormControl(0),
      related_products: new FormControl(),
      cross_sell_products: new FormControl([]),
      product_thumbnail_id: new FormControl(),
      watermark: new FormControl(0),
      watermark_position: new FormControl('center'),
      watermark_image_id: new FormControl(),
      product_galleries_id: new FormControl(),
      size_chart_image_id: new FormControl(),
      variants: this.formBuilder.array([], []),
      variations: this.formBuilder.array([], []),
      attributes_ids: new FormControl([]),
      meta_title: new FormControl(),
      meta_description: new FormControl(),
      product_meta_image_id: new FormControl(),
      safe_checkout: new FormControl(1),
      secure_checkout: new FormControl(1),
      social_share: new FormControl(1),
      encourage_order: new FormControl(1),
      encourage_view: new FormControl(1),
      is_free_shipping: new FormControl(0),
      tax_id: new FormControl('', [Validators.required]),
      estimated_delivery_text: new FormControl(),
      return_policy_text: new FormControl(),
      is_featured: new FormControl(0),
      is_trending: new FormControl(0),
      is_return: new FormControl(0),
      status: new FormControl(1)
    });
  }

  getText(event:any){
    this.form.controls['description'].setValue(this.textArea.value)
  }

  getData(description:any){
    this.textArea.setValue(this.html)
  }

  get variantControl(): FormArray {
    return this.form.get("variants") as FormArray;
  }

  get variationControl(): FormArray {
    return this.form.get("variations") as FormArray;
  }

  get wholesalePriceControl(): FormArray {
    return this.form.get("wholesale_prices") as FormArray;
  }

  ngOnInit() {
    this.editor = new Editor();
    if(this.type == 'create') {
      this.store.dispatch(new GetProducts(this.filter));
    }
    this.search
      .pipe(debounceTime(300)) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        this.renderer.addClass(this.document.body, 'loader-none');
        this.filter['search'] = inputValue;
        if(inputValue) {
          this.store.dispatch(new GetProducts(this.filter));
        }
    });

    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditProduct(params['id']))
                      .pipe(mergeMap(() => this.store.select(ProductState.selectedProduct)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(product => {
        if(product?.related_products && product?.cross_sell_products){
          let array = [...product?.related_products, ...product?.cross_sell_products]
          this.filter['paginate'] = array?.length >= 15 ? array?.length: 15;
          this.filter['ids'] = array?.join();
          this.filter['with_union_products'] = array?.length ? array?.length >= 15 ? 0 : 1 : 0;
        }
        
        this.store.dispatch(new GetProducts(this.filter)).subscribe({
          next: () => {
            this.fromDate = product?.sale_starts_at ? convertToNgbDate(this.formatter.parse(product?.sale_starts_at)!) : null;
            this.toDate = product?.sale_expired_at ? convertToNgbDate(this.formatter.parse(product?.sale_expired_at)!) : null;

            this.selectedCategories = product?.categories.map(value => value?.id!)!;
            this.selectedTags = product?.tags.map(value => value?.id!)!;

            let attributes = product?.attributes.map((value) => value?.id);
            let galleries = product?.product_galleries.map((value) => value?.id);
            let digitalFiles = product?.digital_files.map((value) => value?.id);
            let separator = ",";
            if(product?.separator == 'comma') {
              separator = ",";
            } else if(product?.separator == 'semicolon') {
              separator = ";";
            } else if(product?.separator == 'pipe') {
              separator = "|";
            }
            let licenseKeys = product?.license_keys.map((value) => value.license_key).join(separator);

            if(product) this.product = product;
            this.id = product?.id!;
            this.form.patchValue({
              product_type: product?.product_type ? product?.product_type : 'physical',
              name: product?.name,
              short_description: product?.short_description,
              description: product?.description,
              store_id: product?.store_id,
              type: product?.type,
              is_external: product?.is_external,
              external_url: product?.external_url,
              external_button_text: product?.external_button_text,
              is_licensable: product?.is_licensable,
              is_licensekey_auto: product?.is_licensekey_auto,
              separator: product?.separator,
              license_key: licenseKeys,
              digital_file_ids: digitalFiles,
              preview_type: product?.preview_type,
              preview_video_file_id: product?.preview_video_file_id,
              preview_audio_file_id: product?.preview_audio_file_id,
              preview_url: product?.preview_url,
              wholesale_price_type: product?.wholesale_price_type,
              unit: product?.unit,
              weight: product?.weight,
              stock_status: product?.stock_status,
              sku: product?.sku,
              quantity: product?.quantity,
              price: product?.price,
              discount: product?.discount,
              is_sale_enable: product?.is_sale_enable,
              sale_starts_at: product?.sale_starts_at,
              sale_expired_at: product?.sale_expired_at,
              tags: this.selectedTags,
              categories: this.selectedCategories,
              brand_id: product?.brand_id,
              is_random_related_products: product?.is_random_related_products,
              related_products: product?.related_products,
              cross_sell_products: product?.cross_sell_products,
              product_thumbnail_id: product?.product_thumbnail_id,
              product_galleries_id: galleries,
              watermark: 0,
              watermark_position: product?.watermark_position,
              watermark_image_id: product?.watermark_image_id,
              size_chart_image_id: product?.size_chart_image_id,
              attributes_ids: attributes,
              meta_title: product?.meta_title,
              meta_description: product?.meta_description,
              product_meta_image_id: product?.product_meta_image_id,
              safe_checkout: product?.safe_checkout,
              secure_checkout: product?.secure_checkout,
              social_share: product?.social_share,
              encourage_order: product?.encourage_order,
              encourage_view: product?.encourage_view,
              is_free_shipping: product?.is_free_shipping,
              is_return: product?.is_return,
              tax_id: product?.tax_id,
              estimated_delivery_text: product?.estimated_delivery_text,
              return_policy_text: product?.return_policy_text,
              is_featured: product?.is_featured,
              is_trending: product?.is_trending,
              status: product?.status,
            });

            // Create Variants
            let variants = attributes?.map(attr => {
              let matchingVariations = product?.variations.filter(variation => {
                return variation.attribute_values.some(attrVal => attrVal?.attribute_id == attr);
              });

              let attributeValues = matchingVariations?.reduce((acc: any, variation) => {
                let values = variation.attribute_values.filter(attrVal => attrVal?.attribute_id == attr).map(attrVal => attrVal?.id);
                return values ? [...new Set([...acc, ...values])] : acc;
              }, []);

              let options = matchingVariations?.reduce((acc: any, variation) => {
                let attrVal = variation.attribute_values.find(attrVal => attrVal.attribute_id == attr);
                  if (!acc.some((opt: any) => opt?.value == attrVal?.id)) {
                    acc.push({ label: attrVal?.value, value: attrVal?.id });
                  }
                return acc;
              }, []);

              return { id: attr, attribute_values: attributeValues, options: options, variant_option: [] };
            });

            // Set Variants and Variations
            this.variants = <any>variants;
            this.variations = product?.variations!;

            if(product?.type == 'classified') {
              this?.variants?.forEach(variant => {
                  this.variantControl.push(
                    this.formBuilder.group({
                      id: new FormControl(variant?.id, []),
                      attribute_values: new FormControl(variant?.attribute_values, []),
                      options: new FormControl(variant?.options, []),
                      variant_option: new FormControl(variant?.variant_option, [])
                    })
                  )
                }
              );
              this.retrieveVariants = true;
            } else {
              this.clearVariations();
            }

            if(product?.wholesale_price_type && product?.wholesales?.length) {
              product?.wholesales?.forEach(wholesale => {
                this.wholesalePriceControl.push(
                    this.formBuilder.group({
                      id: new FormControl(wholesale?.id, []),
                      min_qty: new FormControl(wholesale?.min_qty, [Validators.required]),
                      max_qty: new FormControl(wholesale?.max_qty, [Validators.required]),
                      value: new FormControl(wholesale?.value, [Validators.required])
                    })
                  )
                }
              );
            }

          }
        })
      });

    if(this.type == 'create') {
      this.variants.forEach(variant =>
        this.variantControl.push(
          this.formBuilder.group({
            id: new FormControl(variant?.id, []),
            attribute_values: new FormControl(variant?.attribute_values, []),
            options: new FormControl(variant?.attribute_values, []),
            variant_option: new FormControl(variant?.variant_option, [])
          })
        )
      );
    }

    
    this.variantControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((variantValue) => {

        let selectedAttr = variantValue.filter((el: any) => el.id != null).map((val: Variant) => val.id);
        this.attribute$  = this.store.select(AttributeState.attributes)
                              .pipe(map(filterFn => filterFn(selectedAttr.join(','))));

        let variantValues = variantValue.filter((el: any) => el.attribute_values != null);
        let attributesIds = variantValues?.map((attr: Variant) => attr.id);

        this.form.controls['attributes_ids'].setValue(attributesIds);

        this.variationCombinations = this.generateCombinations(variantValues);

        this.addVariation();

    });

    this.products$.subscribe(product => {
      this.collectionProduct = product?.length ? product.filter(res => res?.data?.stock_status == 'in_stock') : [];
    });

    this.setting$.subscribe(setting => {
      if(setting?.activation?.multivendor) {
        this.form.controls['store_id'].setValidators([Validators.required]);
      } else {
        this.form.controls['store_id'].removeValidators([]);
      }
    });

    this.user$.subscribe(user => {
      if(user?.role && user?.role?.name == 'vendor') {
        this.form.controls['store_id'].setValue(user.store?.id);
      }
    });

    const controlsToUpdate = ['license_key', 'separator'];
    ['is_licensable', 'is_licensekey_auto'].forEach(controlName => {
      this.form.controls[controlName].valueChanges.subscribe(value => {
        if(this.form.controls['product_type'].value == 'digital') {
          const validators = this.form.controls['is_licensable'].value && (controlName === 'is_licensekey_auto' && !value) ? [Validators.required] : [];
          controlsToUpdate.forEach(controlToUpdate => {
            this.form.controls[controlToUpdate].setValidators(validators);
            this.form.controls[controlToUpdate].updateValueAndValidity();
          });
        }
      });
    });

    this.form.controls['product_type'].valueChanges.subscribe(value => {
      if (value === 'external') {
        this.form.controls['external_url'].setValidators([Validators.required]);
      } else {
        this.form.controls['external_url'].clearValidators();
      }
      this.form.controls['external_url'].updateValueAndValidity();
    });

    this.form.controls['watermark'].valueChanges.subscribe(value => {
      if (value) {
        this.form.controls['watermark_image_id'].setValidators([Validators.required]);
      } else {
        this.form.controls['watermark_image_id'].clearValidators();
      }
      this.form.controls['watermark_image_id'].updateValueAndValidity();
    });

    this.form.controls['type'].valueChanges.subscribe(value => {
      if(value == 'simple') {
        this.form.controls['price'].setValidators([Validators.required, priceValidator]);
      } else {
        this.form.controls['price'].clearValidators();
      }
      this.form.controls['price'].updateValueAndValidity();
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

  addVariant(event: Event) {
    event.preventDefault();
    this.variantControl.push(
      this.formBuilder.group({
        id: new FormControl(),
        attribute_values: new FormControl(),
        options: new FormControl(),
        variant_option: new FormControl()
      })
    );
  }

  removeVariant(index: number) {
    if(this.variantControl.length <= 1) return
      this.variantControl.removeAt(index);
  }

  addWholesalePrice(event: Event) {
    event.preventDefault();
    this.wholesalePriceControl.markAllAsTouched();
    if(this.wholesalePriceControl.valid) {
      this.wholesalePriceControl.push(
        this.formBuilder.group({
          id: new FormControl(),
          min_qty: new FormControl('', [Validators.required]),
          max_qty: new FormControl('', [Validators.required]),
          value: new FormControl('', [Validators.required])
        })
      );
    }
  }

  removeWholesalePrice(index: number) {
    if(this.wholesalePriceControl.length <= 1) return
      this.wholesalePriceControl.removeAt(index);
  }

  getAttributeValues(id: number | null): Observable<any> {
    return this.store.select(AttributeState.attribute_value)
            .pipe(map(filterFn => filterFn(id ? id : null)));
  }

  updateAttribute(data: Select2UpdateEvent, index: number) {
    const variantControl = this.form.get('variants') as FormArray; // get the variants FormArray
    const control = variantControl.at(index); // get the control at the specified index

    let variant_option = null;
    this.getAttributeValues(data ? +data?.value : null).subscribe(option => variant_option = option);
    control.patchValue({ variant_option: variant_option }); // patch the new value
    this.variantCount++
    if(!this.retrieveVariants) {
      control.patchValue({ attribute_values: null, options: null }); // patch the new value
    }
    if(this.variantCount == this.variants?.length) {
      this.retrieveVariants = false;
    }
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}

    if(this.fromDate)
      this.form.controls['sale_starts_at'].setValue(`${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`);
    if(this.toDate)
      this.form.controls['sale_expired_at'].setValue(`${this.toDate?.year}-${this.toDate?.month}-${this.toDate?.day}`);
	}

  isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

  isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

  isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  updateAttributeValue(data: Select2UpdateEvent, index: number) {
    const variantControl = this.form.get('variants') as FormArray;
    const control = variantControl.at(index);
    control.patchValue({ options: data?.options });
  }

  clearVariations() {
    const variantsControl = this.form.get('variations') as FormArray;    // assuming your FormArray group is named 'variations'
    variantsControl.clear(); // remove all the controls from the FormArray
  }

  addVariation() {
    this.clearVariations();
    if(this.variationCombinations.length) {
      this.variationCombinations.forEach((variation) => {
        const index = this.variations.findIndex(value =>
            value.attribute_values.every(item => variation?.attribute_values.includes(+item?.id!))
          );
        let variationValue;
        if(index != -1 && this.variations[index]) {
          variationValue = this.variations[index];
        }
        let licenseKeys;
        if(variationValue && variationValue.separator) {
          let separator = ",";
          if(variationValue?.separator == 'comma') {
            separator = ",";
          } else if(variationValue?.separator == 'semicolon') {
            separator = ";";
          } else if(variationValue?.separator == 'pipe') {
            separator = "|";
          }
          licenseKeys = variationValue?.license_keys.map((value) => value.license_key).join(separator);
        }
        this.variationControl.push(
          this.formBuilder.group({
            id: new FormControl(variationValue?.id, []),
            variation_name: new FormControl(variation?.name, []),
            name: new FormControl(variationValue?.name, [Validators.required]),
            price: new FormControl(variationValue?.price, [Validators.required, priceValidator]),
            discount: new FormControl(variationValue?.discount, []),
            stock_status: new FormControl(variationValue?.stock_status ? variationValue?.stock_status : 'in_stock', [Validators.required]),
            sku: new FormControl(variationValue?.sku, [Validators.required]),
            quantity: new FormControl(variationValue?.quantity, [Validators.required]),
            variation_image_id: new FormControl(variationValue?.variation_image_id, []),
            variation_galleries_id: new FormControl(variationValue?.variation_galleries_id, []),
            variation_image: new FormControl(variationValue?.variation_image, []),
            variation_galleries: new FormControl(variationValue?.variation_galleries, []),
            digital_file_ids: new FormControl(variationValue?.digital_file_ids, []),
            digital_files: new FormControl(variationValue?.digital_files, []),
            attribute_values: new FormControl(variation?.attribute_values, []),
            is_licensable: new FormControl(variationValue?.is_licensable ? variationValue?.is_licensable : 0),
            is_licensekey_auto: new FormControl(variationValue?.is_licensekey_auto ? variationValue?.is_licensekey_auto : 0),
            license_keys: new FormControl(licenseKeys ? licenseKeys : ''),
            separator: new FormControl(variationValue?.separator),
            status: new FormControl(variationValue ? +variationValue?.status : 1)
          })
        )
      });
    }
  }

  removeVariation(index: number) {
    if(this.variationControl.length <= 1) return
      this.variationControl.removeAt(index);
  }

  selectCategoryItem(data: Number[]) {
    if(Array.isArray(data)) {
      this.form.controls['categories'].setValue(data);
    }
  }

  selectTagItem(data: Number[]) {
    if(Array.isArray(data)) {
      this.form.controls['tags'].setValue(Array.isArray(data) ? data : []);
    }
  }

  selectThumbnail(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['product_thumbnail_id'].setValue(data ? data?.id : null);
    }
  }

  selectImages(data: Attachment) {
    let ids = Array.isArray(data) ? data?.map(image => image && image?.id) : [];
    this.form.controls['product_galleries_id'].setValue(ids);
  }

  selectSizeImage(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['size_chart_image_id'].setValue(data ? data.id : null);
    }
  }

  selectMetaImage(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['product_meta_image_id'].setValue(data ? data.id : null);
    }
  }

  selectVariationImage(data: Attachment, index: number) {
    const variationControl = this.form.get('variations') as FormArray;
    const control = variationControl.at(+index);
    control.patchValue({ variation_image_id: data ? data.id : '' });
  }

  selectVariantGalleriesImages(data: Attachment, index: number) {
    let ids = Array.isArray(data) ? data?.map(image => image && image?.id) : [];
    const variationControl = this.form.get('variations') as FormArray;
    const control = variationControl.at(+index);
    control.patchValue({ variation_galleries_id: ids });
  }

  selectWatermarkImage(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['watermark_image_id'].setValue(data ? data.id : null);
    }
  }

  selectMainFiles(data: Attachment) {
    let ids = Array.isArray(data) ? data?.map(image => image?.id) : [];
    this.form.controls['digital_file_ids'].setValue(ids);
    if(!ids.length) {
      this.form.controls['is_licensekey_auto'].setValue(false);
    }
  }

  selectPreviewVideoFile(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['preview_video_file_id'].setValue(data ? data.id : null);
    }
  }

  selectPreviewAudioFile(data: Attachment) {
    if(!Array.isArray(data)) {
      this.form.controls['preview_audio_file_id'].setValue(data ? data.id : null);
    }
  }

  selectVariationMainFiles(data: Attachment,index: number) {
    const variationControl = this.form.get('variations') as FormArray;
    const control = variationControl.at(+index);
    let ids = Array.isArray(data) ? data?.map(image => image && image?.id) : [];
    control.patchValue({ digital_file_ids: ids });
    if(!ids.length) {
      control.patchValue({ is_licensekey_auto: false });
    }
  }

  // Combination Of Variations
  generateCombinations(attributes: Variant[], index = 0, prefix = '', attribute_values: number[] = []): any {

    if (index >= attributes.length) {

      if(!attribute_values.length) return [];
      // End of recursion
      return [{ name: prefix.replace(/\/$/, ''), attribute_values }];

    }

    const currentAttribute = attributes[index];
    const currentOptions = currentAttribute.options;
    const combinations = [];

    if (currentOptions?.length === 1) {
      // If attribute has only one option, include it in the prefix and IDs
      const currentOption = currentOptions[0];
      const newPrefix = `${prefix}${currentOption.label}/`;
      const newIds: number[] = [...attribute_values, ...currentAttribute?.attribute_values!];

      const childCombinations = this.generateCombinations(
        attributes, index + 1, newPrefix, newIds
      );

      combinations.push(...childCombinations);
    } else {
      // If attribute has multiple options, generate separate combinations for each option
      for (let i = 0; i < currentOptions?.length!; i++) {
        const currentOption = currentOptions?.[i]!;
        const currentValue = currentOption?.value;
        const newPrefix = `${prefix}${currentOption.label}/`;
        const newIds: number[] = [...attribute_values, currentValue];

        const childCombinations = this.generateCombinations(
          attributes, index + 1, newPrefix, newIds
        );

        combinations.push(...childCombinations);
      }
    }

    return combinations;
  }

  submit(redirect: boolean = true) {
    this.form.markAllAsTouched();
    let action = new CreateProduct(this.form.value);

    if(this.form.controls['type'].value === 'simple') {
      this.form.controls['variations'].patchValue([])
    }

    // If product type simple then clear all variation
    if(['simple', 'external'].includes(this.form.controls['type'].value)) {
      this.form.controls['attributes_ids'].setValue([]);
      this.clearVariations();
    }

    if(this.type == 'edit' && this.id) {
      action = new UpdateProduct(this.form.value, this.id);
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          if(redirect)
            this.router.navigateByUrl('/product');
        }
      });
      this.tabError = [];
    } else {
      this.tabError = [];
      const invalidFields = Object?.keys(this.form?.controls).filter(key => this.form.controls[key].invalid);
      invalidFields.forEach(invalidField => {
        const div = document.querySelector(`#${invalidField}`)?.closest('div.tab')?.getAttribute("tab");
        if(div) {
          this.nav.select(this.tabError?.length ? this.tabError[0] : div);
          this.tabError?.push(div);
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.form.reset();
    this.renderer.removeClass(this.document.body, 'loader-none');
  }
}
