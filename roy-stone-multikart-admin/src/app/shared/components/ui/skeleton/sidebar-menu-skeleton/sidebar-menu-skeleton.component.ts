import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { SettingState } from '../../../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../../interface/setting.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-menu-skeleton.component.html',
  styleUrl: './sidebar-menu-skeleton.component.scss'
})
export class SidebarMenuSkeletonComponent {

  @Input() loading: boolean = false;
  
  @Select(SettingState.setting) setting$: Observable<Values>;

  public skeletonItems = Array.from({ length: 20 }, (_, index) => index);
  
}
