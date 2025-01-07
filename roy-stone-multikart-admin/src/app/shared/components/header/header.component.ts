import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from '../../interface/account.interface';
import { Notification } from "../../interface/notification.interface";
import { Language, Values } from '../../interface/setting.interface';
import { NavService } from '../../services/nav.service';
import { AccountState } from '../../store/state/account.state';
import { NotificationState } from '../../store/state/notification.state';
import { SettingState } from '../../store/state/setting.state';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SearchComponent } from './widgets/search/search.component';
import { QuickViewComponent } from './widgets/quick-view/quick-view.component';
import { LanguagesComponent } from './widgets/languages/languages.component';
import { NotificationComponent } from './widgets/notification/notification.component';
import { ModeComponent } from './widgets/mode/mode.component';
import { ProfileComponent } from './widgets/profile/profile.component';
import { HasPermissionDirective } from '../../directive/has-permission.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule,
            SearchComponent, QuickViewComponent, LanguagesComponent,
            NotificationComponent, ModeComponent, ProfileComponent,
            HasPermissionDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Select(AccountState.user) user$: Observable<AccountUser>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(NotificationState.notification) notification$: Observable<Notification[]>;

  public unreadNotificationCount: number;

  public active: boolean = false;
  public profileOpen: boolean = false;
  public open: boolean = false;

  public languages: Language[] = [
    {
      language: 'English',
      code: 'en',
      icon: 'us'
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr'
    },
  ];

  public selectedLanguage: Language = {
    language: 'English',
    code: 'en',
    icon: 'us'
  }
  public elem: any;
  public url: string;

  constructor( public navServices: NavService,
    @Inject(DOCUMENT) private document: any) {
    this.notification$.subscribe((notification) => {
      this.unreadNotificationCount = notification?.filter(item => !item.read_at)?.length;
    });
    this.setting$.subscribe(setting => {
      this.url = setting.general.site_url;
      document.body.classList.add(setting?.general?.mode!);
    })

    this.elem = document.documentElement;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  clickHeaderOnMobile(){
    this.navServices.search = true;
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

}
