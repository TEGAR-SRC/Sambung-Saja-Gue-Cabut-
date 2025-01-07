import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateService } from '@ngx-translate/core';
import { Actions, Select, Store, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Values } from './shared/interface/setting.interface';
import { Logout } from './shared/store/action/auth.action';
import { GetCountries } from './shared/store/action/country.action';
import { GetSettingOption } from './shared/store/action/setting.action';
import { GetStates } from './shared/store/action/state.action';
import { SettingState } from './shared/store/state/setting.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingBarRouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'multikart-admin-res';

  @Select(SettingState.setting) setting$: Observable<Values>;

  public favIcon: HTMLLinkElement | null;

  constructor(config: NgbNavConfig,
    @Inject(DOCUMENT) document: Document,
    private actions: Actions, private router: Router,
    private titleService: Title, private store: Store,
    private translate: TranslateService) {

    this.translate.use('en');
    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetStates());
    this.store.dispatch(new GetSettingOption());
    this.setting$.subscribe(setting => {
      // Set Direction
      if(setting?.general?.admin_site_language_direction === 'rtl'){
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        document.body.classList.add('ltr');
      }else {
        document.getElementsByTagName('html')[0].removeAttribute('dir');
        document.body.classList.remove('ltr');
      }

      // Set Favicon
      this.favIcon = document.querySelector('#appIcon');
      if(this.favIcon && this.favIcon.href)
        this.favIcon.href = setting?.general?.favicon_image?.original_url!;

      // Set site title 
      this.titleService.setTitle(setting?.general?.site_title && setting?.general?.site_tagline ?
        `${setting?.general?.site_title} | ${setting?.general?.site_tagline}` : 'Marketplace: Where Vendors Shine Together' )
    });

    // customize default values of navs used by this component tree
		config.destroyOnHide = false;
		config.roles = false;

    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
