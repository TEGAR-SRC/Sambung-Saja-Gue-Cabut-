import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Order } from '../../../../../shared/interface/order.interface';
import { Select } from '@ngxs/store';
import { SettingState } from '../../../../../shared/store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../../../shared/interface/setting.interface';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../../shared/pipe/currency-symbol.pipe';

@Component({
  selector: 'app-pos-invoice-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, CurrencySymbolPipe],
  templateUrl: './pos-invoice-modal.component.html',
  styleUrl: './pos-invoice-modal.component.scss'
})
export class PosInvoiceModalComponent {

  public closeResult: string;
  public modalOpen: boolean = false;
  public order: Order;

  @ViewChild("posInvoice") PosInvoice: TemplateRef<string>;
  @Select(SettingState.setting) setting$: Observable<Values>;

  constructor(private modalService: NgbModal) { }

  async openModal(order: Order) {
    this.order = order;
    this.modalOpen = true;
    this.modalService.open(this.PosInvoice, {
      ariaLabelledBy: 'add-customer-Modal',
      centered: true,
      windowClass: 'theme-modal modal-sm invoice-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
