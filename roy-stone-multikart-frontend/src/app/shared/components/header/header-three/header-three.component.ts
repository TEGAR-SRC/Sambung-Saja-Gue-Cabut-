import { Component, HostListener, Input } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '../../widgets/top-bar/top-bar.component';
import { HeaderLogoComponent } from '../widgets/header-logo/header-logo.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { SearchComponent } from '../widgets/search/search.component';
import { SettingsComponent } from '../widgets/settings/settings.component';
import { CartComponent } from '../widgets/cart/cart.component';
import { Category, CategoryModel } from '../../../interface/category.interface';
import { Select, Store } from '@ngxs/store';
import { GetHeaderCategories } from '../../../store/action/category.action';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryState } from '../../../store/state/category.state';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from '../widgets/user-profile/user-profile.component';
import { MenuService } from '../../../services/menu.service';


@Component({
  selector: 'app-header-three',
  standalone: true,
  imports: [CommonModule,TranslateModule, RouterModule,
            TopBarComponent, HeaderLogoComponent, MenuComponent,
            SearchComponent, SettingsComponent, CartComponent,
            UserProfileComponent],
  templateUrl: './header-three.component.html',
  styleUrl: './header-three.component.scss'
})
export class HeaderThreeComponent {

  @Select(CategoryState.headerCategory) category$: Observable<CategoryModel>;

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() class: string;
  @Input() sticky: boolean | number | undefined; // Default false

  public stick: boolean = false;
  public categories: Category[];
  public activeCategory: number;

  constructor(private store: Store,private menuService: MenuService){}

  ngOnInit() {
    const categoryIds = this.data?.header.category_ids;

    // Get Category
    this.store.dispatch(new GetHeaderCategories({
      status: 1,
      ids: categoryIds?.join(',')
    }))

    if(categoryIds && categoryIds.length) {
      this.category$.subscribe((res) => {
        if(res){
          this.categories = res.data.filter(category => categoryIds?.includes(category.id))

          if(this.categories.length){
            this.activeCategory = this.categories[0].id;

          }
        }
      })
    }
  }

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
