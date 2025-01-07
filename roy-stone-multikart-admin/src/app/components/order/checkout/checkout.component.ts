import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoaderState } from '../../../shared/store/state/loader.state';
import { UserState } from '../../../shared/store/state/user.state';
import { CartState } from '../../../shared/store/state/cart.state';
import { OrderState } from '../../../shared/store/state/order.state';
import { SettingState } from '../../../shared/store/state/setting.state';
import { Observable, Subject, debounceTime, forkJoin } from 'rxjs';
import { DeliveryBlock, Values } from '../../../shared/interface/setting.interface';
import { User } from '../../../shared/interface/user.interface';
import { OrderCheckout } from '../../../shared/interface/order.interface';
import { Cart } from '../../../shared/interface/cart.interface';
import { Select2, Select2Data, Select2Module, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { AddAddressModalComponent } from './modal/add-address-modal/add-address-modal.component';
import { AddCustomerModalComponent } from './modal/add-customer-modal/add-customer-modal.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GetUsers } from '../../../shared/store/action/user.action';
import { GetCartItems } from '../../../shared/store/action/cart.action';
import { GetSettingOption } from '../../../shared/store/action/setting.action';
import { Checkout, Clear, PlaceOrder, SelectUser } from '../../../shared/store/action/order.action';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { AddressBlockComponent } from './address-block/address-block.component';
import { DeliveryBlockComponent } from './delivery-block/delivery-block.component';
import { PaymentBlockComponent } from './payment-block/payment-block.component';
import { NoDataComponent } from '../../../shared/components/ui/no-data/no-data.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { HasPermissionDirective } from '../../../shared/directive/has-permission.directive';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, HasPermissionDirective,
            ReactiveFormsModule, Select2Module, CurrencySymbolPipe,
            LoaderComponent, AddressBlockComponent, DeliveryBlockComponent,
            PaymentBlockComponent, NoDataComponent, ButtonComponent,
            AddCustomerModalComponent, AddAddressModalComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  @Select(LoaderState.status) loadingStatus$: Observable<boolean>;
  @Select(UserState.users) users$: Observable<Select2Data>;
  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(OrderState.checkout) checkout$: Observable<OrderCheckout>;
  @Select(CartState.cartHasDigital) cartDigital$: Observable<boolean | number>;
  @Select(OrderState.selectedUser) selectedUser$: Observable<User>;
  @Select(SettingState.setting) setting$: Observable<Values>;

  @ViewChild("addAddressModal") AddAddressModal: AddAddressModalComponent;
  @ViewChild("addCustomerModal") AddCustomerModal: AddCustomerModalComponent;

  @ViewChild('cpn', { static: false }) cpnRef: ElementRef<HTMLInputElement>;

  public form: FormGroup;
  public coupon: boolean = true;
  public couponCode: string;
  public appliedCoupon: boolean = false;
  public couponError: string | null;
  public checkoutTotal: OrderCheckout | null = null;
  public loading: boolean = false;
  public addressLoading: boolean = false;
  private search = new Subject<string>();

  constructor(private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private store: Store,
    private formBuilder: FormBuilder) {

      const user$ = this.store.dispatch(new GetUsers({ role: 'consumer', status: 1, paginate: 15 }));
      const cart$ = this.store.dispatch(new GetCartItems());
      const setting$ = this.store.dispatch(new GetSettingOption());
      forkJoin([user$, cart$, setting$]).subscribe({
        complete: () => {
          this.renderer.addClass(this.document.body, 'loader-none');
        }
      });

    this.form = this.formBuilder.group({
      consumer_id: new FormControl('', [Validators.required]),
      products: this.formBuilder.array([], [Validators.required]),
      shipping_address_id: new FormControl('', []),
      billing_address_id: new FormControl('', [Validators.required]),
      points_amount: new FormControl(),
      wallet_balance: new FormControl(),
      coupon: new FormControl(),
      delivery_description: new FormControl('', [Validators.required]),
      delivery_interval: new FormControl(),
      payment_method: new FormControl('', [Validators.required])
    });

    this.cartDigital$.subscribe(value => {
      if(value == 1) {
        this.form.controls['shipping_address_id'].clearValidators();
        this.form.controls['delivery_description'].clearValidators();
      } else {
        this.form.controls['shipping_address_id'].setValidators([Validators.required]);
        this.form.controls['delivery_description'].setValidators([Validators.required]);
      }
      this.form.controls['shipping_address_id'].updateValueAndValidity();
      this.form.controls['delivery_description'].updateValueAndValidity();
    });

    this.form.valueChanges.subscribe(form => {
      this.checkout();
    });
  }

  get productControl(): FormArray {
    return this.form.get("products") as FormArray;
  }

  ngOnInit() {
    this.checkout$.subscribe(data => this.checkoutTotal = data);
    this.cartItem$.subscribe(items => {
      this.productControl.clear();
      items!.forEach((item: Cart) =>
        this.productControl.push(
          this.formBuilder.group({
            product_id: new FormControl(item?.product_id, [Validators.required]),
            variation_id: new FormControl(item?.variation_id ? item?.variation_id : ''),
            quantity: new FormControl(item?.quantity),
          })
      ));
    });

    this.search
      .pipe(debounceTime(300)) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        this.store.dispatch(new GetUsers({ role: 'consumer', status: 1, paginate: 15, search: inputValue }));
        this.renderer.addClass(this.document.body, 'loader-none');
    });
  }

  selectUser(data: Select2UpdateEvent) {
    if(data?.value) {
      this.form.controls['shipping_address_id'].reset();
      this.form.controls['billing_address_id'].reset();
      this.form.controls['points_amount'].reset();
      this.form.controls['wallet_balance'].reset();
      this.form.controls['coupon'].reset();
      this.addressLoading = true;
      this.store.dispatch(new SelectUser(Number(data?.value))).subscribe({
        complete: () => {
          this.addressLoading = false;
        }
      });
    }
  }

  userDropdown(event: Select2){
    if(event['innerSearchText']){
      this.search.next('');
    }
  }

  searchUser(event: Select2SearchEvent){
    this.search.next(event.search);
  }

  selectShippingAddress(id: number) {
    if(id) {
      this.form.controls['shipping_address_id'].setValue(Number(id));
    }
  }

  selectBillingAddress(id: number) {
    if(id) {
      this.form.controls['billing_address_id'].setValue(Number(id));
    }
  }

  selectDelivery(value: DeliveryBlock) {
    if(value?.delivery_description != this.form.controls['delivery_description'].value)
      this.form.controls['delivery_description'].setValue(value?.delivery_description);
    if(value.delivery_interval)
      this.form.controls['delivery_interval'].setValue(value?.delivery_interval);
  }

  selectPaymentMethod(value: string) {
    this.form.controls['payment_method'].setValue(value);
  }

  showCoupon() {
    this.coupon = true;
  }

  setCoupon(value?: string) {
    this.couponError = null;
    if(value)
      this.form.controls['coupon'].setValue(value);
    else
      this.form.controls['coupon'].reset();
    this.store.dispatch(new Checkout(this.form.value)).subscribe({
      error: (err) => {
        this.couponError = err.message;
      },
      complete: () => {
        this.appliedCoupon = value ? true : false;
        this.couponError = null;
      }
    });
  }

  couponRemove() {
    this.setCoupon();
  }

  checkout() {
    if(this.form.valid) {
      this.loading = true;
      this.store.dispatch(new Checkout(this.form.value)).subscribe({
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      const invalidFields = Object?.keys(this.form?.controls).filter(key => this.form.controls[key].invalid);
    }
  }

  placeorder() {
    if(this.form.valid) {
      this.store.dispatch(new PlaceOrder(this.form.value));
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new Clear());
    this.form.reset();
    this.search.next('');
    this.search.complete();
    this.renderer.removeClass(this.document.body, 'loader-none');
  }
}
