import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { UserProfileComponent } from '../../header/widgets/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { SettingState } from '../../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../interface/setting.interface';
import { LanguageComponent } from '../../header/widgets/language/language.component';
import { CurrencyComponent } from '../../header/widgets/currency/currency.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule,
            LanguageComponent, CurrencyComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  @Select(SettingState.setting) setting$ : Observable<Values>;

  @Input() data: Option | null;
  @Input() darkTopBar: boolean;

}
