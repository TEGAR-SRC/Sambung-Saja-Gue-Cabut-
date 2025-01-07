import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAddress } from '../../../../shared/interface/user.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-address-block',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './address-block.component.html',
  styleUrl: './address-block.component.scss'
})
export class AddressBlockComponent {

  @Input() addresses: UserAddress[] = [];
  @Input() type: string = 'shipping';

  @Output() selectAddress: EventEmitter<number> = new EventEmitter();

  constructor() { }

  set(event: Event) {
    this.selectAddress.emit(+(<HTMLInputElement>event.target)?.value);
  }

}
