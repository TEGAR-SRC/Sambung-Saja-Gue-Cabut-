import { Component, Input } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';

@Component({
  selector: 'app-product-box-ten',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencySymbolPipe, TranslateModule,
            NgbModule, ProductCartButtonComponent, ProductHoverActionComponent,
          CartButtonComponent, ProductBoxImageVariantComponent, WishlistComponent],
  templateUrl: './product-box-ten.component.html',
  styleUrl: './product-box-ten.component.scss'
})
export class ProductBoxTenComponent {

  @Input() product: Product;

}
