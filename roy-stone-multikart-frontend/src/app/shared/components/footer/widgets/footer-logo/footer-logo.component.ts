import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../../store/state/setting.state';
import { Values } from '../../../../interface/setting.interface';

@Component({
  selector: 'app-footer-logo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer-logo.component.html',
  styleUrl: './footer-logo.component.scss'
})
export class FooterLogoComponent {

  @Input() logo: string | undefined;

  @Select(SettingState.setting) setting$: Observable<Values>;

}
