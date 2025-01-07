import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';

@Component({
  selector: 'app-footer-copyright',
  standalone: true,
  imports: [],
  templateUrl: './footer-copyright.component.html',
  styleUrl: './footer-copyright.component.scss'
})
export class FooterCopyrightComponent {
  @Input() data: Option | null;

}
