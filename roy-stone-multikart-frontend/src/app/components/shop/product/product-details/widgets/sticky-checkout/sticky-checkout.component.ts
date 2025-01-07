import { Component, Input, SimpleChanges } from '@angular/core';
import { Product, Variation } from '../../../../../../shared/interface/product.interface';
import { Select, Store } from '@ngxs/store';
import { Cart, CartAddOrUpdate } from '../../../../../../shared/interface/cart.interface';
import { CommonModule } from '@angular/common';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { VariantAttributesComponent } from '../../../../../../shared/components/widgets/variant-attributes/variant-attributes.component';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { CartState } from '../../../../../../shared/store/state/cart.state';
import { Observable } from 'rxjs';
import { AddToCart } from '../../../../../../shared/store/action/cart.action';
import { DropdownVariantComponent } from '../../../../../../shared/components/widgets/product-box/widgets/dropdown-variant/dropdown-variant.component';

@Component({
  selector: 'app-sticky-checkout',
  standalone: true,
  imports: [CommonModule, CurrencySymbolPipe, TranslateModule,
            VariantAttributesComponent, ButtonComponent, DropdownVariantComponent],
  templateUrl: './sticky-checkout.component.html',
  styleUrl: './sticky-checkout.component.scss'
})
export class StickyCheckoutComponent {

  @Input() product: Product;

  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;

  public cartItem: Cart | null;
  public productQty: number = 1;
  public selectedVariation: Variation | null;

  constructor(private store: Store) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['product'] && changes['product'].currentValue) {
      this.selectedVariation = null;
      this.product = changes['product']?.currentValue;
    }

    this.cartItem$.subscribe(items => {
      this.cartItem = items.find((item) => {
        if(item.variation_id){
          this.product.variations.find((i) => {
            return i.id ==  item.variation_id;
          })
        }else{
          return item.product.id == this.product.id;
        }
      })!
    });
  }

  selectVariation(variation:Variation) {
    if(variation){
      this.selectedVariation = variation;
    }
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
  }

  addToCart(product: Product) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: this.cartItem && (this.selectedVariation && this.cartItem?.variation &&
          this.selectedVariation?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
        product_id: product?.id!,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id ? this.selectedVariation?.id : null,
        quantity: this.productQty
      }
      this.store.dispatch(new AddToCart(params));
    }
  }

  externalProductLink(link: string) {
    if(link) {
      window.open(link, "_blank");
    }
  }
}
