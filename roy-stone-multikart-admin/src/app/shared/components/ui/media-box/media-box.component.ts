import { Component, EventEmitter, Inject, Input, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AttachmentState } from '../../../store/state/attachment.state';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Attachment, AttachmentModel } from '../../../interface/attachment.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Params } from '@angular/router';
import { DeleteAttachment, GetAttachments } from '../../../store/action/attachment.action';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../../loader/loader.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { NoDataComponent } from '../no-data/no-data.component';

@Component({
  selector: 'app-media-box',
  standalone: true,
  imports: [CommonModule,TranslateModule, FormsModule, ReactiveFormsModule, 
            LoaderComponent, DeleteModalComponent, PaginationComponent, NoDataComponent
  ],
  templateUrl: './media-box.component.html',
  styleUrl: './media-box.component.scss'
})
export class MediaBoxComponent {

  @Select(AttachmentState.attachment) attachment$: Observable<AttachmentModel>;

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  @Input() multiple: boolean = false;
  @Input() url: boolean = false;
  @Input() loading: boolean = true;
  @Input() deleteAction: boolean = true;
  @Input() accept: any[];
  @Input() selectedImages: any;

  @Output() setImage: EventEmitter<[] | any> = new EventEmitter();
  @Output() setDeleteImage: EventEmitter<[] | any> = new EventEmitter();

  public term = new FormControl();
  public filter = {
    'search': '',
    'field': '', 
    'mime_type': '',
    'sort': '', // current Sorting Order
    'page': 1, // current page number
    'paginate': 50, // Display per page,
  };
  public totalItems: number = 0;
  public filteredMedia: Attachment[];
  private mediaType: string[];
  public selected: any[];

  public mimeImageMapping: { mimeType: string, imagePath: string }[] = [
    { mimeType: 'application/pdf', imagePath: 'assets/images/pdf.png' },
    { mimeType: 'application/msword', imagePath: 'assets/images/word.png' },
    { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', imagePath: 'assets/images/word.png' },
    { mimeType: 'application/vnd.ms-excel', imagePath: 'assets/images/xls.png' },
    { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', imagePath: 'assets/images/xls.png' },
    { mimeType: 'application/vnd.ms-powerpoint', imagePath: 'assets/images/folder.png' },
    { mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', imagePath: 'assets/images/folder.png' },
    { mimeType: 'text/plain', imagePath: 'assets/images/txt.png' },
    { mimeType: 'audio/mpeg', imagePath: 'assets/images/sound.png' },
    { mimeType: 'audio/wav', imagePath: 'assets/images/sound.png' },
    { mimeType: 'audio/ogg', imagePath: 'assets/images/sound.png' },
    { mimeType: 'video/mp4', imagePath: 'assets/images/video.png' },
    { mimeType: 'video/webm', imagePath: 'assets/images/video.png' },
    { mimeType: 'video/ogg', imagePath: 'assets/images/video.png' },
    { mimeType: 'application/zip', imagePath: 'assets/images/zip.png' },
    { mimeType: 'application/x-tar', imagePath: 'assets/images/zip.png' },
    { mimeType: 'application/gzip', imagePath: 'assets/images/zip.png' },
  ];

  constructor(private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
  }
 
  ngOnChanges(changes: SimpleChanges){
    if(changes['accept']?.currentValue?.length) {
      this.mediaType = changes['accept']?.currentValue;
    }

    if(this.selectedImages.length)
      this.selected = this.selectedImages?.map((res:any) => { return res?.id ? res?.id : res})
  }
   
  ngOnInit(){
    this.getAttachments(this.filter, true);
    this.attachment$.subscribe(attachment => this.totalItems = attachment?.total);
    this.term.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(
        (data: string) => {
        this.filter.search = data;
        this.getAttachments(this.filter);
    });
  }

  getAttachments(filter: Params, loader?: boolean) {
    if(this.mediaType?.length){
      this.filter['mime_type'] = this.mediaType.join();
    }
    this.loading = loader && this.deleteAction ? false : true; 
    this.store.dispatch(new GetAttachments(filter)).subscribe({
      complete: () => { 
        this.loading = false; 
      }
    });
    if(!loader)
      this.renderer.addClass(this.document.body, 'loader-none');
  }

  onMediaChange(event: Event) {
    this.filter.sort = (<HTMLInputElement>event.target).value;
    this.getAttachments(this.filter)
  }

  onActionClicked(action: string, data: Attachment) {
    if(action == 'delete')
      this.store.dispatch(new DeleteAttachment(data.id!)).subscribe({
        complete: () =>{
          this.setDeleteImage.emit(data.id!)
        }
      })
  }

  selectImage(event: Event, attachment: Attachment, url: boolean) {
    if (this.multiple) {
      const index = this.selectedImages.indexOf(attachment);
      if ((<HTMLInputElement>event.target).checked) { 
        if (index === -1) {
          this.selectedImages.push(attachment);
        }
      } else {
        this.selectedImages = this.selectedImages.filter((image:any) => image.id !== parseInt((<HTMLInputElement>event.target).value));
      }
    } else {
      this.selectedImages = attachment;
    }
  
    if (url) {
      this.selectedImages = <any>attachment;
    }
    this.setImage.emit(this.selectedImages);
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.getAttachments(this.filter);
  }

  getMimeTypeImage(mimeType: string) {
    return this.mimeImageMapping.find(value => value.mimeType == mimeType)?.imagePath;
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'loader-none');
  }
  
}
