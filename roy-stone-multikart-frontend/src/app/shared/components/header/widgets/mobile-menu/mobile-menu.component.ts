import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { ToggleSidebarCart } from '../../../../store/action/cart.action';
import { Store } from '@ngxs/store';
import { CartComponent } from '../cart/cart.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterModule, TranslateModule, SearchComponent, CartComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {

  public active: string = '/';

  constructor(private store: Store, private authService: AuthService, private router: Router){}

  cartToggle(value: boolean) {
    this.store.dispatch(new ToggleSidebarCart(value));
  }

  activeMenu(menu: string){
    this.active = menu
  }

  reDirectWishlist(){
    if(!this.store.selectSnapshot(state => state.auth && state.auth.access_token)){
      this.authService.isLogin = true;
    }
    else {
      this.router.navigate(['/wishlist'])
      this.activeMenu('wishlist')
    } 
  }
}
