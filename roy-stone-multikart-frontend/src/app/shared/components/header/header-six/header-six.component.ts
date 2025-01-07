import { Component, HostListener, Input } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '../../widgets/top-bar/top-bar.component';
import { HeaderLogoComponent } from '../widgets/header-logo/header-logo.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { SettingsComponent } from '../widgets/settings/settings.component';
import { CartComponent } from '../widgets/cart/cart.component';
import { SearchComponent } from '../widgets/search/search.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoticeComponent } from '../widgets/notice/notice.component';
import { HeaderCategoriesComponent } from '../widgets/header-categories/header-categories.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from '../widgets/user-profile/user-profile.component';
import { MenuService } from '../../../services/menu.service';


@Component({
  selector: 'app-header-six',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule,
            TopBarComponent, HeaderLogoComponent, MenuComponent,
            SettingsComponent, CartComponent, SearchComponent,
            NoticeComponent, UserProfileComponent,HeaderCategoriesComponent],
  templateUrl: './header-six.component.html',
  styleUrl: './header-six.component.scss'
})
export class HeaderSixComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() class: string;
  @Input() sticky: boolean | number | undefined; // Default false
  @Input() path: string;

  public stick: boolean = false;
  public categoryFilter: boolean = false;

  constructor(private menuService:MenuService){}
  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 50 && window.innerWidth < 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

  mainMenuOpen(){
    this.menuService.mainMenuToggle = true;
  }

  toggle(){
    this.categoryFilter =! this.categoryFilter;
  }
}
