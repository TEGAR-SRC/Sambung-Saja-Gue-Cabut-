import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductState } from '../../../store/state/product.state';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../../interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recent-purchase-popup',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './recent-purchase-popup.component.html',
  styleUrl: './recent-purchase-popup.component.scss'
})
export class RecentPurchasePopupComponent {

  @Select(ProductState.relatedProducts) relatesProduct$: Observable<Product[]>;
  @Select(ProductState.product) product$: Observable<ProductModel>;

  public product: Product | null;
  public show: boolean = false;
  public min: number = 10;
  public popup_enable: boolean = true;

  constructor() {
    if(this.popup_enable && window.innerWidth > 768) {
      setInterval(() => {
        this.show = true;
        this.min = Math.floor(Math.random() * 60) + 1;
        this.randomlySelectProduct();
        setTimeout(() => {
          this.show = false;
        }, 5000);
      }, 20000);
    }
  }

  randomlySelectProduct() {
    this.product$.subscribe(product => {
      if(!product.data.length) {
        this.relatesProducts();
      } else {
        const randomIndex = Math.floor(Math.random() * product.data.length);
        this.product = product.data[randomIndex];
      }
    });
  }

  relatesProducts() {
    this.relatesProduct$.subscribe(products => {
      const randomIndex = Math.floor(Math.random() * products.length);
      this.product = products[randomIndex];
    });
  }

  closePopup() {
    this.popup_enable = false;
  }

}
