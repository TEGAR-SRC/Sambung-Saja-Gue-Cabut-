import { Component, Input } from '@angular/core';
import { PageWrapperComponent } from '../../../shared/components/page-wrapper/page-wrapper.component';
import { FormTagComponent } from '../form-tag/form-tag.component';

@Component({
  selector: 'app-create-tag',
  standalone: true,
  imports: [PageWrapperComponent, FormTagComponent],
  templateUrl: './create-tag.component.html',
  styleUrl: './create-tag.component.scss'
})
export class CreateTagComponent {

  @Input() tagType: string | null = 'product';


}
