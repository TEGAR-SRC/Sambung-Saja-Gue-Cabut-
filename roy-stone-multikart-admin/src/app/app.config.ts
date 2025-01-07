import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings
} from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GlobalErrorHandlerInterceptor } from './core/interceptors/globle-error-handler.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { SettingService } from './shared/services/setting.service';
import { AccountState } from './shared/store/state/account.state';
import { AttachmentState } from './shared/store/state/attachment.state';
import { AttributeState } from './shared/store/state/attribute.state';
import { AuthState } from './shared/store/state/auth.state';
import { BlogState } from './shared/store/state/blog.state';
import { BrandState } from './shared/store/state/brand.state';
import { CartState } from './shared/store/state/cart.state';
import { CategoryState } from './shared/store/state/category.state';
import { CommissionState } from './shared/store/state/commission.state';
import { CountryState } from './shared/store/state/country.state';
import { CouponState } from './shared/store/state/coupon.state';
import { CurrencyState } from './shared/store/state/currency.state';
import { DashboardState } from './shared/store/state/dashboard.state';
import { FaqState } from './shared/store/state/faq.state';
import { LicenseKeysState } from './shared/store/state/license-key.state';
import { LoaderState } from './shared/store/state/loader.state';
import { MenuState } from './shared/store/state/menu.state';
import { NoticeState } from './shared/store/state/notice.state';
import { NotificationState } from './shared/store/state/notification.state';
import { OrderState } from './shared/store/state/order.state';
import { PageState } from './shared/store/state/page.state';
import { PaymentDetailsState } from './shared/store/state/payment-details.state';
import { PointState } from './shared/store/state/point.state';
import { ProductState } from './shared/store/state/product.state';
import { QuestionAnswersState } from './shared/store/state/questions-answers.state';
import { RefundState } from './shared/store/state/refund.state';
import { ReviewState } from './shared/store/state/review.state';
import { RoleState } from './shared/store/state/role.state';
import { SettingState } from './shared/store/state/setting.state';
import { ShippingState } from './shared/store/state/shipping.state';
import { SidebarState } from './shared/store/state/sidebar.state';
import { StateState } from './shared/store/state/state.state';
import { StoreState } from './shared/store/state/store.state';
import { SubscriptionState } from './shared/store/state/subscription.state';
import { TagState } from './shared/store/state/tag.state';
import { TaxState } from './shared/store/state/tax.state';
import { ThemeOptionState } from './shared/store/state/theme-option.state';
import { ThemeState } from './shared/store/state/theme.state';
import { UserState } from './shared/store/state/user.state';
import { VendorWalletState } from './shared/store/state/vendor-wallet.state';
import { WalletState } from './shared/store/state/wallet.state';
import { WithdrawalState } from './shared/store/state/withdrawal.state';
import { OrderStatusState } from './shared/store/state/order-status.state';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

function appLoadFactory(config: SettingService) {
  return () => config.getReCaptchaConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    CurrencyPipe,
    {
      provide: RECAPTCHA_SETTINGS,
      useFactory: (config: SettingService): RecaptchaSettings => {
        return { siteKey: config.reCaptchaConfig?.site_key };
      },
      deps: [SettingService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appLoadFactory,
      deps: [SettingService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-center',
        preventDuplicates: true
      }),
      LoadingBarRouterModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      RouterModule.forRoot(routes, {
        initialNavigation: "enabledBlocking",
        scrollPositionRestoration: 'enabled' ,
      }),
      RecaptchaModule,
      RecaptchaFormsModule,
      NgxsModule.forRoot([
      AccountState,
      AttachmentState,
      AttributeState,
      BlogState,
      BrandState,
      CartState,
      CategoryState,
      CommissionState,
      CountryState,
      CouponState,
      CurrencyState,
      DashboardState,
      FaqState,
      LicenseKeysState,
      LoaderState,
      MenuState,
      NoticeState,
      NotificationState,
      OrderState,
      PageState,
      PaymentDetailsState,
      PointState,
      ProductState,
      QuestionAnswersState,
      RefundState,
      ReviewState,
      RoleState,
      SettingState,
      ShippingState,
      SidebarState,
      StateState,
      StoreState,
      SubscriptionState,
      TagState,
      TaxState,
      ThemeOptionState,
      ThemeState,
      UserState,
      VendorWalletState,
      WalletState,
      WithdrawalState,
      OrderStatusState
    ]),
    NgxsModule.forFeature([AuthState, StoreState]),
    NgxsStoragePluginModule.forRoot({
      key: [
        'auth',
        'dashboard',
        'notification',
        'account',
        'country',
        'state',
        'setting'
      ]
    }),
    )
  ],
};
