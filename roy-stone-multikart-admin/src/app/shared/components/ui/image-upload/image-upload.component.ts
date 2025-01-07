import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Attachment } from '../../../interface/attachment.interface';
import { MediaModalComponent } from '../modal/media-modal/media-modal.component';
import { CommonModule } from '@angular/common';
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [MediaModalComponent, CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {

  @ViewChild("mediaModal") MediaModal: MediaModalComponent;

  @Input() images: Attachment[] = [];
  @Input() image: Attachment | null;
  @Input() id: string;
  @Input() imageUrl: string | null;
  @Input() url: boolean = false;
  @Input() multipleImage: boolean = false;
  @Input() helpText: string;
  @Input() accept: any;
  
  @Output() selectedFiles: EventEmitter<any> = new EventEmitter();

  public showImages: Attachment[] = [];
  public showImage: Attachment | null;  
  public showImageUrl: string | null;
  public selected: any;
  public videoType = ['mp4', 'webm', 'ogg'];
  public StorageURL = environment.storageURL;
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

  ngOnChanges() {
    this.showImage = this.image;
    this.showImages = this.images;
    this.showImageUrl = this.imageUrl;
  }

  selectImage(data: Attachment, url: boolean) {
    if(Array.isArray(data)) {
      this.images = data;
      this.showImages = data;
    } else if(url) {
      this.imageUrl = data.original_url;
      this.showImageUrl = data.original_url;
    } else {
      this.image = data;
      this.showImage = data;
    }
    if(this.imageUrl) {
       this.selectedFiles.emit(data.asset_url);
    } else {
      this.selectedFiles.emit(this.images.length ? this.images : this.image);
    }
  }

  remove(index: number, type: string) {
    if(type == 'multiple' && Array.isArray(this.images)) {
      this.images.splice(index, 1);
      this.showImages = this.images;
    } else if(type == 'single_image_url') {
      this.imageUrl = null;
      this.showImageUrl = null;
      this.image = null;
    } else {
      this.image = null;
      this.showImage = null;
    }
    this.selectedFiles.emit(this.images.length ? this.images : this.image);
  }


  getMimeTypeImage(mimeType: string) {
    return this.mimeImageMapping.find(value => value.mimeType == mimeType)?.imagePath;
  }
  
}
