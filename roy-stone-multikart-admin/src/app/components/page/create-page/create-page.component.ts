import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormPageComponent } from '../form-page/form-page.component';

@Component({
  selector: 'app-create-page',
  standalone: true,
  imports: [PageWrapperComponent, FormPageComponent],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss'
})
export class CreatePageComponent {

}
