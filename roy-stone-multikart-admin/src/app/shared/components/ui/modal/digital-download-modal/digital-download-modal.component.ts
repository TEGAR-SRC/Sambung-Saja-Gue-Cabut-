import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Download } from '../../../../store/action/product.action';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-digital-download-modal',
  standalone: true,
  imports: [TranslateModule, Select2Module, ButtonComponent],
  templateUrl: './digital-download-modal.component.html',
  styleUrl: './digital-download-modal.component.scss'
})
export class DigitalDownloadModalComponent {

  public closeResult: string;
  public modalOpen: boolean = false;
  public product: Product;
  public variations: Select2Data = [];
  public variation_id: number;

  @ViewChild("downloadModal", { static: false }) DownloadModal: TemplateRef<string>;

  constructor(private modalService: NgbModal,
    private store: Store) { }

  async openModal(data: Product) {
    this.modalOpen = true;
    this.product = data;
    if(data.variations.length) {
      this.variations = data.variations.filter(res => res?.digital_files?.length).map((res: Variation) => { 
        return { label: res?.name, value: res?.id! }
      });
    }
    this.modalService.open(this.DownloadModal, {
      ariaLabelledBy: 'Download-Modal',
      centered: true,
      windowClass: 'theme-modal'
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

  download(modal: NgbModalRef) {
    this.store.dispatch(new Download({ product_id: this.product.id, variation_id: this.variation_id }));
    modal.close();
  }

  selectProduct(data: Select2UpdateEvent) {
    this.variation_id = +data.value;
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }
  
}
