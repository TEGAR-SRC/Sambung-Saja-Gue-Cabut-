import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormShippingComponent } from '../../form-shipping/form-shipping.component';

@Component({
  selector: 'app-shipping-rule-modal',
  standalone: true,
  imports: [TranslateModule, FormShippingComponent],
  templateUrl: './shipping-rule-modal.component.html',
  styleUrl: './shipping-rule-modal.component.scss'
})
export class ShippingRuleModalComponent {

  public closeResult: string;
  public modalOpen: boolean = false;

  @ViewChild("createShippingRuleModal", { static: false }) CreateShippingRuleModal: TemplateRef<string>;

  constructor(private modalService: NgbModal) { }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.CreateShippingRuleModal, {
      ariaLabelledBy: 'shipping-rule-Modal',
      centered: true,
      windowClass: 'theme-modal shipping-rule-modal modal-lg'
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
