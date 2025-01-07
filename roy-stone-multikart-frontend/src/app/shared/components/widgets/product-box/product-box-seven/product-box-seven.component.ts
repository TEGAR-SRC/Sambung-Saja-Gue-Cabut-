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
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';

@Component({
  selector: 'app-product-box-seven',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencySymbolPipe, TranslateModule,
            NgbModule, ProductCartButtonComponent, ProductHoverActionComponent,
            CartButtonComponent, ProductBoxImageVariantComponent],
  templateUrl: './product-box-seven.component.html',
  styleUrl: './product-box-seven.component.scss'
})
export class ProductBoxSevenComponent {

  @Input() product: Product;

}
