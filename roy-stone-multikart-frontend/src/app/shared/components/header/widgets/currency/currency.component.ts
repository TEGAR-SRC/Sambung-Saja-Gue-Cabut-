import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../../interface/setting.interface';
import { Currency, CurrencyModel } from '../../../../interface/currency.interface';
import { CurrencyState } from '../../../../store/state/currency.state';
import { SelectedCurrency } from '../../../../store/action/setting.action';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/outside.directive';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ClickOutsideDirective],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(SettingState.selectedCurrency) selectedCurrency$: Observable<Currency>;

  public open: boolean = false;
  public selectedCurrency: Currency;
  public setting: Values;

  @Select(CurrencyState.currency) currency$: Observable<CurrencyModel>;

  constructor( private store: Store) {
    this.selectedCurrency$.subscribe(setting => this.selectedCurrency = setting);
  }

  openDropDown(){
    this.open = !this.open;
  }

  selectCurrency(currency: Currency){
    this.selectedCurrency = currency;
    this.open = false;
    this.store.dispatch(new SelectedCurrency(currency)).subscribe({
      complete: () => {
        window.location.reload();
      }
    });
  }

  hideDropdown(){
    this.open = false;
  }

}
