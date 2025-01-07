import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RoleState } from '../../../shared/store/state/role.state';
import { Observable } from 'rxjs';
import { Module } from '../../../shared/interface/role.interface';
import { GetRoleModules } from '../../../shared/store/action/role.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {

  @Select(RoleState.roleModules) modules$: Observable<Module[]>;

  @Input() selectedPermission: number[] = [];

  @Output() setPermissions: EventEmitter<number[]> = new EventEmitter();

  constructor(private store: Store) {
    this.store.dispatch(new GetRoleModules());
  }


  ngOnChanges(changes: SimpleChanges) {
    let ids = changes['selectedPermission']?.currentValue
    this.modules$.subscribe(modules => {
      modules?.map(item => {
        item.module_permissions.map(permission => {
          permission.isChecked =  ids.includes(permission.id);
        })
      })
      modules?.filter(module => {
        this.updateCheckBoxStatus(module);
      })
    });
  }

  checkUncheckAll(event: Event, module: Module) {
    module.module_permissions.forEach(item => {
      item.isChecked = (<HTMLInputElement>event.target).checked;
      this.addPermission((<HTMLInputElement>event.target).checked, item?.id, module);
    });
  }

  checkIndex(event: Event, module: Module){
    module.module_permissions.forEach(item => {
      item.isChecked = false;
      this.addPermission(false, item?.id, module);
    });
  }

  onPermissionChecked(event: Event, module: Module) {
    module.module_permissions.forEach(item => {
      item.isChecked = false
      if(item.name == 'index'){
        item.isChecked = !item.isChecked ? true : false;
        this.addPermission(true, +item.id, module);
      }
      this.addPermission((<HTMLInputElement>event.target)?.checked, +(<HTMLInputElement>event?.target)?.value, module);
    })
  }


  addPermission(checked: Boolean, value: number, module: Module) {
    const index = this.selectedPermission.indexOf(Number(value));
    if(checked) {
      if(index == -1) this.selectedPermission.push(Number(value)) ;
    } else {
      this.selectedPermission = this.selectedPermission.filter(id => id != Number(value));
    }
    this.setPermissions.emit(this.selectedPermission);
    this.updateCheckBoxStatus(module);
  }

  updateCheckBoxStatus(module: Module) {
    let count = 0;
    module.module_permissions.filter(permission => {
      if(this.selectedPermission.includes(permission.id!)) {
        count++;
      }
      if(module.module_permissions.length <= count)
        module.isChecked = true;
      else
        module.isChecked = false;
    });
  }

}
