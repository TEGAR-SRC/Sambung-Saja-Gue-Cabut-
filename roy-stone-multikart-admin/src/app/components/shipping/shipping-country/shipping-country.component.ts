import { Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShippingState } from '../../../shared/store/state/shipping.state';
import { Observable, Subject, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { Shipping } from '../../../shared/interface/shipping.interface';
import { ShippingRuleModalComponent } from '../modal/shipping-rule-modal/shipping-rule-modal.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeleteShippingRule, EditShipping } from '../../../shared/store/action/shipping.action';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormShippingComponent } from '../form-shipping/form-shipping.component';
import { NoDataComponent } from '../../../shared/components/ui/no-data/no-data.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-shipping-country',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule, TranslateModule,
            PageWrapperComponent, FormShippingComponent, NoDataComponent,
            ShippingRuleModalComponent
  ],
  templateUrl: './shipping-country.component.html',
  styleUrl: './shipping-country.component.scss'
})
export class ShippingCountryComponent {

  @Select(ShippingState.selectedShipping) shipping$: Observable<Shipping>;

  @ViewChild("createShippingRuleModal") CreateShippingRuleModal: ShippingRuleModalComponent;

  public id: number;
  private destroy$ = new Subject<void>();

  constructor(private store: Store,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new EditShipping(params['id']))
                      .pipe(mergeMap(() => this.store.select(ShippingState.selectedShipping)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(shipping => {
        this.id = shipping?.id!;
      });
  }

  delete(actionType: string, data: Shipping) {
    this.store.dispatch(new DeleteShippingRule(data?.id))
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
