import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormCouponComponent } from '../form-coupon/form-coupon.component';

@Component({
  selector: 'app-edit-coupon',
  standalone: true,
  imports: [PageWrapperComponent, FormCouponComponent],
  templateUrl: './edit-coupon.component.html',
  styleUrl: './edit-coupon.component.scss'
})
export class EditCouponComponent {

}
