import { Component, Input } from '@angular/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { RouterModule } from '@angular/router';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { Store } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { AddToWishlist, DeleteWishlist } from '../../../../store/action/wishlist.action';
import { DisplayVariantAttributesComponent } from '../../display-variant-attributes/display-variant-attributes.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';

export interface result{
  value: Variation;
  label: string
}
@Component({
  selector: 'app-product-box-two',
  standalone: true,
  imports: [CommonModule, NgbModule, CurrencySymbolPipe,
            RouterModule, ProductCartButtonComponent, ProductHoverActionComponent,
            TranslateModule, CartButtonComponent, ProductHoverActionComponent,
            ProductBoxImageVariantComponent, DisplayVariantAttributesComponent],
  templateUrl: './product-box-two.component.html',
  styleUrl: './product-box-two.component.scss'
})
export class ProductBoxTwoComponent {

  @Input() product: Product;

  public selectedVariation: Variation;

  constructor(private store: Store){}


  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
    }
  }

  addToWishlist(product: Product){
    if(this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      product['is_wishlist'] = !product['is_wishlist'];
    }
    let action = product['is_wishlist'] === !!this.store.selectSnapshot(state => state.auth && state.auth.access_token) ? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }
}
