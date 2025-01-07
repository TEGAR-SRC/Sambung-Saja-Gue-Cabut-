import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductState } from '../../../../../../shared/store/state/product.state';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-related-product',
  standalone: true,
  imports: [CommonModule, TranslateModule,ProductBoxComponent],
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.scss'
})
export class RelatedProductComponent {

  @Select(ProductState.relatedProducts) relatedProduct$: Observable<Product[]>;

  @Input() product: Product | null;

  public relatedProducts: Product[] = [];

  ngOnChanges() {
    if (this.product?.related_products && Array.isArray(this.product?.related_products)) {
      this.relatedProduct$.subscribe(products => {
        this.relatedProducts = products.filter(product => this.product?.related_products?.includes(product?.id));
      });
    }
  }
}
