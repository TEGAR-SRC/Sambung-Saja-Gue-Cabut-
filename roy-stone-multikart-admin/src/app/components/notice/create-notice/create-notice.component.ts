import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormNoticeComponent } from '../form-notice/form-notice.component';

@Component({
  selector: 'app-create-notice',
  standalone: true,
  imports: [PageWrapperComponent, FormNoticeComponent],
  templateUrl: './create-notice.component.html',
  styleUrl: './create-notice.component.scss'
})
export class CreateNoticeComponent {

}
