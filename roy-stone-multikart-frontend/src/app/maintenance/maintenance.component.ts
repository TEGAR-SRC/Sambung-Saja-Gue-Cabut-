import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { SettingState } from '../shared/store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../shared/interface/setting.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SaleTimerComponent } from '../shared/components/widgets/sale-timer/sale-timer.component';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, SaleTimerComponent],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;

  constructor(private router: Router){
    this.setting$.subscribe(setting => {
      let isMaintenanceModeOn = setting?.maintenance && setting?.maintenance?.maintenance_mode!
      if(!isMaintenanceModeOn){
        this.router.navigate(['/'])
      }
    })
  }

}
