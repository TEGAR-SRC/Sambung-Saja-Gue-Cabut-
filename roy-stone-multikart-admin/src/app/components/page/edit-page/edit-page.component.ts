import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormPageComponent } from '../form-page/form-page.component';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [PageWrapperComponent, FormPageComponent],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent {

}
