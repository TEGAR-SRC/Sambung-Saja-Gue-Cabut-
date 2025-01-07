import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { SettingState } from '../../../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../../interface/setting.interface';

@Component({
  selector: 'app-mode',
  standalone: true,
  imports: [],
  templateUrl: './mode.component.html',
  styleUrl: './mode.component.scss'
})
export class ModeComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;
  
  public mode: boolean;

  constructor(){
    this.setting$.subscribe(res => this.mode = res.general.mode === 'dark-only' ? true : false)
  }

  customizeLayoutDark() {
    this.mode = !this.mode;
    document.body.classList.toggle('dark-only');
  }
  
}
