import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { SettingState } from '../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../interface/setting.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;
  
}
