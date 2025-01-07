import { Component, HostListener, Input } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '../../widgets/top-bar/top-bar.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { HeaderLogoComponent } from '../widgets/header-logo/header-logo.component';
import { SettingsComponent } from '../widgets/settings/settings.component';
import { CartComponent } from '../widgets/cart/cart.component';
import { SearchComponent } from '../widgets/search/search.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from '../widgets/user-profile/user-profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { MenuService } from '../../../services/menu.service';


@Component({
  selector: 'app-header-two',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, TopBarComponent, MenuComponent,
            HeaderLogoComponent,SettingsComponent, CartComponent,
            SearchComponent, UserProfileComponent],
  templateUrl: './header-two.component.html',
  styleUrl: './header-two.component.scss'
})
export class HeaderTwoComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() class: string;
  @Input() sticky: boolean | number | undefined; // Default false

  public stick: boolean = false;

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
}
