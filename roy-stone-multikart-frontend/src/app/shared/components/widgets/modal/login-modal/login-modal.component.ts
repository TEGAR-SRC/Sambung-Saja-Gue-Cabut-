import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { ForgotPasswordComponent } from '../../../../../components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from '../../../../../components/auth/login/login.component';
import { OtpComponent } from '../../../../../components/auth/otp/otp.component';
import { RegisterComponent } from '../../../../../components/auth/register/register.component';
import { UpdatePasswordComponent } from '../../../../../components/auth/update-password/update-password.component';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import { Values } from '../../../../interface/setting.interface';
import { Option } from '../../../../interface/theme-option.interface';
import { AuthService } from '../../../../services/auth.service';
import { Login } from '../../../../store/action/auth.action';
import { GetCartItems, SyncCart } from '../../../../store/action/cart.action';
import { CartState } from '../../../../store/state/cart.state';
import { SettingState } from '../../../../store/state/setting.state';
import { ThemeOptionState } from '../../../../store/state/theme-option.state';
import { LoginWithNumberComponent } from '../../../../../components/auth/login-with-number/login-with-number.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule,
    RecaptchaModule, RecaptchaFormsModule, LoginComponent,
    ForgotPasswordComponent, OtpComponent, UpdatePasswordComponent, RegisterComponent, LoginWithNumberComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {

  @ViewChild("loginModal", { static: true }) LoginModal: TemplateRef<string>;
  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public validate: boolean = false;
  public loginForm: FormGroup;
  public reCaptcha: boolean = true;
  public closeResult: string;
  public modalOpen: boolean = false;
  public activeForm: string = 'login';
  public storageURL = environment.storageURL;
  public themeOption: Option;

  constructor(private modalService: NgbModal,
    private store: Store,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router) {

    this.themeOption$.subscribe(res => this.themeOption = res);

    this.loginForm = this.formBuilder.group({
      email: new FormControl('john.customer@example.com', [Validators.required, Validators.email]),
      password: new FormControl('123456789', Validators.required),
      recaptcha: new FormControl(null, Validators.required),
    })

    this.setting$.subscribe(setting => {
      if((setting?.google_reCaptcha && !setting?.google_reCaptcha?.status) || !setting?.google_reCaptcha) {
        this.loginForm.removeControl('recaptcha');
        this.reCaptcha = false;
      } else {
        this.loginForm.setControl('recaptcha', new FormControl(null, Validators.required))
        this.reCaptcha = true;
      }
    });
  }

  ngAfterViewInit(): void {
    if(this.authService.isLogin === true){
      this.openModal()
    }
  }

  submit(){
    this.validate = true;
    if(this.loginForm.valid){
      this.store.dispatch(new Login(this.loginForm.value)).subscribe({
        complete: () => {
          // Sync Cart Storage when successfully Login
          let syncCartItems: CartAddOrUpdate[] = [];
          this.cartItem$.subscribe(items => {
            items.filter(item => {
              if(item) {
                const params: CartAddOrUpdate = {
                  id: null,
                  product: item?.product,
                  product_id: item?.product_id,
                  variation: item?.variation ? item.variation : null,
                  variation_id: item?.variation_id ? item.variation_id : null,
                  quantity: item.quantity
                }
                syncCartItems.push(params);
              }
            });
          });
          if(syncCartItems.length) {
            this.store.dispatch(new SyncCart(syncCartItems));
          } else {
            this.store.dispatch(new GetCartItems());
          }

          // Navigate to the intended URL after successful login
          const redirectUrl =  this.authService.redirectUrl;
          if(redirectUrl){
            this.router.navigateByUrl(redirectUrl);
          }

          // Clear the stored redirect URL
          this.authService.redirectUrl = undefined;
        }
      })
    }
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  nextForm(action: string) {
    this.activeForm = action;
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.LoginModal, {
      ariaLabelledBy: 'Login-Modal',
      centered: true,
      windowClass: 'modal-xl modal-dialog-centered auth-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    this.authService.isLogin = false;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
