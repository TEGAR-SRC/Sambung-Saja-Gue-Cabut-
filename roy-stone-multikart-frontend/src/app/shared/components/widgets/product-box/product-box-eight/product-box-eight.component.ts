import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { QuickViewComponent } from '../widgets/product-hover-action/quick-view/quick-view.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';

@Component({
  selector: 'app-product-box-eight',
  standalone: true,
  imports: [CommonModule, NgbModule, RouterModule, TranslateModule,
            CurrencySymbolPipe, ProductCartButtonComponent, ProductHoverActionComponent,
            QuickViewComponent, WishlistComponent, CartButtonComponent, ProductBoxImageVariantComponent],
  templateUrl: './product-box-eight.component.html',
  styleUrl: './product-box-eight.component.scss'
})
export class ProductBoxEightComponent {

  @Input() product: Product;

}
