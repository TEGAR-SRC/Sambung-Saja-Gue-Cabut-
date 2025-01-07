import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '@ngxs/store';
import { CouponState } from '../../../../store/state/coupon.state';
import { Observable } from 'rxjs';
import { CouponModel } from '../../../../interface/coupon.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CouponService } from '../../../../services/coupon.service';
import { SkeletonOfferComponent } from '../../../../../components/page/offer/skeleton-offer/skeleton-offer.component';

@Component({
  selector: 'app-coupon-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslateModule, SkeletonOfferComponent],
  templateUrl: './coupon-modal.component.html',
  styleUrl: './coupon-modal.component.scss'
})
export class CouponModalComponent {

  @Select(CouponState.coupon) coupon$: Observable<CouponModel>;

  constructor(public modal: NgbActiveModal, public couponService: CouponService){}

  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }
}
