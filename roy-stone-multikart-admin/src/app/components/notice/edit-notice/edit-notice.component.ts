import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormNoticeComponent } from '../form-notice/form-notice.component';

@Component({
  selector: 'app-edit-notice',
  standalone: true,
  imports: [PageWrapperComponent, FormNoticeComponent],
  templateUrl: './edit-notice.component.html',
  styleUrl: './edit-notice.component.scss'
})
export class EditNoticeComponent {

}
