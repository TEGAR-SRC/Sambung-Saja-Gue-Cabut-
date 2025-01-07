import { Component } from '@angular/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';

@Component({
  selector: 'app-demo-product-box',
  standalone: true,
  imports: [CurrencySymbolPipe],
  templateUrl: './demo-product-box.component.html',
  styleUrl: './demo-product-box.component.scss'
})
export class DemoProductBoxComponent {
  public open: boolean = false;

  show(val: boolean){
    this.open = val;
  }
}
