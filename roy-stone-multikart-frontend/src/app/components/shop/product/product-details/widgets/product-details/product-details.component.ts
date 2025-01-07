import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SizeChartModalComponent } from '../../../../../../shared/components/widgets/modal/size-chart-modal/size-chart-modal.component';
import { Attachment } from '../../../../../../shared/interface/attachment.interface';
import { Product, Variation } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency.pipe';
import { ThemeOptionState } from '../../../../../../shared/store/state/theme-option.state';
import { DeliveryReturnModalComponent } from '../../../../../../shared/components/widgets/modal/delivery-return-modal/delivery-return-modal.component';
import { QuestionModalComponent } from '../../../../../../shared/components/widgets/modal/question-modal/question-modal.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgbModule,CurrencySymbolPipe, RouterModule,
            TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

   @Input() product: Product;
   @Input() option: Option | null;
   @Input() selectedVariation: Variation | null | Product;

   public viewsCount: number = 30;
   public countsInterval: any;
   public ordersCount: number = 10;
   public policy: string;

   constructor(private modal: NgbModal){
    this.themeOptions$.subscribe(option => {
      this.policy = option?.product?.shipping_and_return;
    })
   }

   ngOnChanges(changes: SimpleChanges) {
    if(changes['product'] && changes['product'].currentValue) {
      this.selectedVariation = null;
      this.product = changes['product']?.currentValue;
    }

    this.countsInterval = setInterval(() => {
      let encourage_max_view_count = this.option?.product?.encourage_max_view_count ? this.option?.product?.encourage_max_view_count : 100;
        this.viewsCount = Math.floor(Math.random() * encourage_max_view_count) + 1;
    }, 50000);

    this.countsInterval = setInterval(() => {
      let encourage_max_order_count = this.option?.product?.encourage_max_order_count ? this.option?.product?.encourage_max_order_count : 100;
      this.ordersCount = Math.floor(Math.random() * encourage_max_order_count) + 1;
    }, 60000);

  }

  openModal(type: string, value: (Attachment | string | Product)){
    if(type == 'sizeChart'){
      const sizeChart = this.modal.open(SizeChartModalComponent, { size: 'lg', centered: true, windowClass: 'theme-modal-2' });
      sizeChart.componentInstance.image = value;
    }else if(type == 'delivery'){
      const deliveryModal = this.modal.open(DeliveryReturnModalComponent, { size: 'lg', centered: true, windowClass: 'theme-modal-2' });
      deliveryModal.componentInstance.policy = value;
    }else if(type == 'question'){
      const questionModal = this.modal.open(QuestionModalComponent, { centered: true, windowClass: 'theme-modal-2' });
      questionModal.componentInstance.product = value;
    }
  }
}
