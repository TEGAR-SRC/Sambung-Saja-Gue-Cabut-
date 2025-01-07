import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Language, Values } from '../../../../interface/setting.interface';
import { Currency, CurrencyModel } from '../../../../interface/currency.interface';
import { CurrencyState } from '../../../../store/state/currency.state';
import { SelectedCurrency } from '../../../../store/action/setting.action';
import { CommonModule } from '@angular/common';
import { languages } from '../../../../interface/theme-option.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(SettingState.selectedCurrency) selectedCurrency$: Observable<Currency>;

  public selectedCurrency: Currency;
  public setting: Values;

  @Select(CurrencyState.currency) currency$: Observable<CurrencyModel>;

  public active: boolean = false;
  public languages: languages[] = [
    {
      language: 'English',
      code: 'en',
      icon: 'us'
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr'
    }, // Add More Language
  ]

  public selectedLanguage: languages = {
    language: 'English',
    code: 'en',
    icon: 'us'
  }

  constructor(private translate: TranslateService, private store: Store) {
    this.selectedCurrency$.subscribe((setting) => {
      if(setting){
        this.selectedCurrency = setting
      }
    });

    let language = localStorage.getItem("language");

    if(language == null){
      localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
      this.translate.use(this.selectedLanguage.code);
    }else{
      this.selectedLanguage = JSON.parse(language);
      this.translate.use(this.selectedLanguage.code);
    }
  }

  selectLanguage(language: Language){
    this.active = false;
    this.translate.use(language.code);
    this.selectedLanguage = language;
    localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
  }

  selectCurrency(currency: Currency){
    this.selectedCurrency = currency;
    this.store.dispatch(new SelectedCurrency(currency)).subscribe({
      complete: () => {
        window.location.reload();
      }
    });
  }

}
