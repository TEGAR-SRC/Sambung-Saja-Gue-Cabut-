import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-block',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './payment-block.component.html',
  styleUrl: './payment-block.component.scss'
})
export class PaymentBlockComponent {

  @Output() selectPaymentMethod: EventEmitter<string> = new EventEmitter();

  constructor() { }

  set(value: string) {
    this.selectPaymentMethod.emit(value);
  }

}
