import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Select, Store } from '@ngxs/store';
import { WishlistState } from '../../../shared/store/state/wishlist.state';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';
import { Observable } from 'rxjs';
import { WishlistModel } from '../../../shared/interface/wishlist.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { DeleteWishlist, GetWishlist } from '../../../shared/store/action/wishlist.action';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency.pipe';
import { ProductCartButtonComponent } from '../../../shared/components/widgets/product-box/widgets/product-cart-button/product-cart-button.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartButtonComponent } from '../../../shared/components/widgets/product-box/widgets/cart-button/cart-button.component';
import { LoaderComponent } from '../../../shared/components/widgets/loader/loader.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencySymbolPipe, TranslateModule, CartButtonComponent,
            BreadcrumbComponent, NoDataComponent, ProductCartButtonComponent, LoaderComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  @Select(WishlistState.wishlistItems) wishlistItems$: Observable<WishlistModel>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "Wishlist",
    items: [{ label: 'Wishlist', active: true }]
  }

  public skeletonItems = Array.from({ length: 12 }, (_, index) => index);

  constructor(private store: Store,
    public wishlistService: WishlistService){
    this.store.dispatch(new GetWishlist())
  }

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }

}
