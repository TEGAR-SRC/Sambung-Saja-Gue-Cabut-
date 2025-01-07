import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.scss'
})
export class VideoModalComponent {

  @Input() video_url: string;
  @Input() type: string;

  constructor(public modal: NgbActiveModal){}

}

