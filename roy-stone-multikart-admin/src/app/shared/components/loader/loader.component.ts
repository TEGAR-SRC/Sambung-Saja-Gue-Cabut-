import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  @Input() loaderClass: string = 'loader-wrapper';
  
}
