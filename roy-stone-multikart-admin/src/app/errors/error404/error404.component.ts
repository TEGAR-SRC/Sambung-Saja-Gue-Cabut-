import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss'
})
export class Error404Component {

  constructor(private location: Location) {}

  back(){
    this.location.back();
  }

}
