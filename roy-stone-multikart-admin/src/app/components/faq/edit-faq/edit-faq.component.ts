import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormFaqComponent } from '../form-faq/form-faq.component';

@Component({
  selector: 'app-edit-faq',
  standalone: true,
  imports: [PageWrapperComponent, FormFaqComponent],
  templateUrl: './edit-faq.component.html',
  styleUrl: './edit-faq.component.scss'
})
export class EditFaqComponent {

}
