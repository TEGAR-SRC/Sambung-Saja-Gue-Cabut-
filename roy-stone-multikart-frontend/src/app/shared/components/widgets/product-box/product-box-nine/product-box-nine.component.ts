import { Component, Input } from '@angular/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DisplayVariantAttributesComponent } from '../../display-variant-attributes/display-variant-attributes.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';

@Component({
  selector: 'app-product-box-nine',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencySymbolPipe, TranslateModule,
            NgbModule, ProductCartButtonComponent, ProductHoverActionComponent, DisplayVariantAttributesComponent,
            CartButtonComponent, DisplayVariantAttributesComponent, ProductBoxImageVariantComponent, WishlistComponent],
  templateUrl: './product-box-nine.component.html',
  styleUrl: './product-box-nine.component.scss'
})
export class ProductBoxNineComponent {

  @Input() product: Product;

  public hoverImage: string;
  public selectedVariation: Variation;

  constructor(
    config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
      // this.selectedVariant.emit(this.selectedVariation);
    }
  }
}
