import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormCouponComponent } from '../form-coupon/form-coupon.component';

@Component({
  selector: 'app-create-coupon',
  standalone: true,
  imports: [PageWrapperComponent, FormCouponComponent],
  templateUrl: './create-coupon.component.html',
  styleUrl: './create-coupon.component.scss'
})
export class CreateCouponComponent {

}
