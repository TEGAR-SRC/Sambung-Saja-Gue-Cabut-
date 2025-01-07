import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { ImportUser } from '../../../../store/action/user.action';
import { ImportProduct } from '../../../../store/action/product.action';
import { ImportAtribute } from '../../../../store/action/attribute.action';
import { ImportCategory } from '../../../../store/action/category.action';
import { ImportTag } from '../../../../store/action/tag.action';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-import-csv-modal',
  standalone: true,
  imports: [TranslateModule, NgxDropzoneModule, NgbModule,
            ButtonComponent
  ],
  templateUrl: './import-csv-modal.component.html',
  styleUrl: './import-csv-modal.component.scss'
})
export class ImportCsvModalComponent {

  public active = 'upload';
  public closeResult: string;
  public modalOpen: boolean = false;

  public files: File[] = [];

  @Input() module: string;
  @Input() note: string;

  @ViewChild("csvModal", { static: false }) CSVModal: TemplateRef<string>;

  constructor(private store: Store, 
    private modalService: NgbModal) { 
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.CSVModal, {
      ariaLabelledBy: 'Media-Modal',
      centered: true,
      windowClass: 'theme-modal modal-xl media-modal'
    }).result.then((result) => {
      `Result ${result}`
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    this.active = 'upload';
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload() {
    if(this.files.length && this.module) {
      let action = new ImportUser(this.files);
      if(this.module == 'user') {
        action = new ImportUser(this.files);
      } 
      else if(this.module == 'product') {
        action = new ImportProduct(this.files);
      } 
      else if(this.module == 'attribute') {
        action = new ImportAtribute(this.files);
      } 
      else if(this.module == 'category') {
        action = new ImportCategory(this.files);
      }
      else if(this.module == 'tag') {
        action = new ImportTag(this.files);
      }  
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.files = [];
          this.modalService.dismissAll();
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }
}
