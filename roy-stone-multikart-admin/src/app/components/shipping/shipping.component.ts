import { Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShippingState } from '../../shared/store/state/shipping.state';
import { Observable } from 'rxjs';
import { Shipping, ShippingModel } from '../../shared/interface/shipping.interface';
import { ShippingCountryModalComponent } from './modal/shipping-country-modal/shipping-country-modal.component';
import { DeleteModalComponent } from '../../shared/components/ui/modal/delete-modal/delete-modal.component';
import { DeleteShipping, GetShippings } from '../../shared/store/action/shipping.action';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { NoDataComponent } from '../../shared/components/ui/no-data/no-data.component';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule,
            HasPermissionDirective, PageWrapperComponent,NoDataComponent,
            ShippingCountryModalComponent, DeleteModalComponent
  ],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss'
})
export class ShippingComponent {

  @Select(ShippingState.shipping) shipping$: Observable<ShippingModel>;

  @ViewChild("countryShippingModal") CountryShippingModal: ShippingCountryModalComponent;
  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  constructor(private store: Store) {
    this.store.dispatch(new GetShippings());
  }

  delete(actionType: string, data: Shipping) {
    this.store.dispatch(new DeleteShipping(data?.id));
  }

}
