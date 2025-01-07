import { Component, ViewChild } from '@angular/core';
import { Attachment } from '../../shared/interface/attachment.interface';
import { MediaModalComponent } from '../../shared/components/ui/modal/media-modal/media-modal.component';
import { DeleteModalComponent } from '../../shared/components/ui/modal/delete-modal/delete-modal.component';
import { Store } from '@ngxs/store';
import { DeleteAllAttachment } from '../../shared/store/action/attachment.action';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { MediaBoxComponent } from '../../shared/components/ui/media-box/media-box.component';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [TranslateModule, HasPermissionDirective, PageWrapperComponent,
            MediaBoxComponent, MediaModalComponent, DeleteModalComponent
  ],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {

  public images: Attachment[] = [];

  @ViewChild("mediaModal") MediaModal: MediaModalComponent;
  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  constructor(private store: Store) { }

  selectImage(data: Attachment[]) {
    this.images = data;
  }

  onActionClicked(action: string) {
    if(action == 'deleteAll') {
      let ids = this.images.map(image => image?.id!);
      this.store.dispatch(new DeleteAllAttachment(ids)).subscribe({
        complete: () => {
          this.images = [];
        }
      });
    }
  }

  deleteImage(id: number){
    this.images = this.images.filter(image => {
      return image.id !== id;
    });
  }

}
