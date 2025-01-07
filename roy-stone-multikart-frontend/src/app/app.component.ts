import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Analytics, Values } from './shared/interface/setting.interface';
import { Option } from './shared/interface/theme-option.interface';
import { SeoService } from './shared/services/seo.service';
import { GetCartItems } from './shared/store/action/cart.action';
import { GetCompare } from './shared/store/action/compare.action';
import { GetCountries } from './shared/store/action/country.action';
import { GetCurrencies } from './shared/store/action/currency.action';
import { GetSettingOption } from './shared/store/action/setting.action';
import { GetStates } from './shared/store/action/state.action';
import { GetThemes } from './shared/store/action/theme.action';
import { SettingState } from './shared/store/state/setting.state';
import { ThemeOptionState } from './shared/store/state/theme-option.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(SettingState.setting) setting$: Observable<Values>;

  public favIcon: HTMLLinkElement | null;
  public isTabInFocus = true;
  private maintenance_mode: boolean = false;

  constructor(@Inject(DOCUMENT) document: Document,
    config: NgbRatingConfig,
    private store: Store,
    public seoService: SeoService) {

    config.max = 5;
    config.readonly = true;

    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetStates());
    this.store.dispatch(new GetCartItems());
    this.store.dispatch(new GetCompare());
    // this.store.dispatch(new ThemeOptions());
    this.store.dispatch(new GetCurrencies({ status: 1 }));
    this.store.dispatch(new GetThemes());

    this.store.dispatch(new GetSettingOption());
    this.setting$.subscribe(option => {
      this.maintenance_mode = option && option.maintenance && option.maintenance.maintenance_mode;
      if(option?.analytics){
        if(option?.analytics?.google_analytics && option?.analytics?.google_analytics.status){
          this.loadScript(option?.analytics);
        }
      }
    })

    if(!this.maintenance_mode){
      // this.store.dispatch(new GetCountries());
      // this.store.dispatch(new GetStates());
      // this.store.dispatch(new GetCartItems());
      // this.store.dispatch(new GetCompare());
      // this.store.dispatch(new ThemeOptions());
      // this.store.dispatch(new GetCurrencies({ status: 1 }));
      // this.store.dispatch(new GetThemes());
    }

    this.themeOption$.subscribe(theme => {

      // Set Mode
      if(theme?.general?.mode === 'dark') {
        document.body.classList.add(theme?.general && theme?.general?.mode)
      } else {
        document.body.classList.remove('dark')
      }

      // Set Direction
      if(theme?.general?.language_direction === 'rtl'){
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
      } else {
        document.getElementsByTagName('html')[0].removeAttribute('dir');
        document.body.classList.remove('rtl');
      }

      // Set Favicon
      this.favIcon = document.querySelector('#appIcon');
      this.favIcon!.href = theme?.logo?.favicon_icon?.original_url;

    });
  }

  // Function to dynamically load analytics scripts based on configuration values.
  loadScript(val: Analytics): void {
    // Load Google Analytics script if enabled
    if(val.google_analytics.status){
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${val.google_analytics.measurement_id}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${val.google_analytics.measurement_id}');
      `;
      document.head.appendChild(configScript);
    }

    // Load Facebook Pixel script if enabled
    if(val.facebook_pixel.status){
      const script = document.createElement('script');
      script.src = `https://www.facebook.com/tr?id=${val.facebook_pixel.pixel_id}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${val.facebook_pixel.pixel_id}');
      fbq('track', 'PageView');
      `;
      document.head.appendChild(configScript);
    }
  }
  
}
