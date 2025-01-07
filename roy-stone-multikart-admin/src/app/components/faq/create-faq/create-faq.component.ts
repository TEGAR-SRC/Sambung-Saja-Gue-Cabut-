import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormFaqComponent } from '../form-faq/form-faq.component';

@Component({
  selector: 'app-create-faq',
  standalone: true,
  imports: [PageWrapperComponent, FormFaqComponent],
  templateUrl: './create-faq.component.html',
  styleUrl: './create-faq.component.scss'
})
export class CreateFaqComponent {

}
