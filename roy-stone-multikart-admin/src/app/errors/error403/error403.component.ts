import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error403',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './error403.component.html',
  styleUrl: './error403.component.scss'
})
export class Error403Component {

}
