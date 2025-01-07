import { Component } from '@angular/core';
import { Params, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { Select, Store } from '@ngxs/store';
import { RoleState } from '../../shared/store/state/role.state';
import { Observable } from 'rxjs';
import { Role, RoleModel } from '../../shared/interface/role.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { DeleteAllRole, DeleteRole, GetRoles } from '../../shared/store/action/role.action';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [TranslateModule, RouterModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

  @Select(RoleState.role) role$: Observable<RoleModel>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' }
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "role.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "role.destroy" },
    ],
    data: [] as Role[],
    total: 0
  };

  constructor(private store: Store,
    private router: Router) { }

  ngOnInit() {
    this.role$.subscribe(role => {
      this.tableConfig.data = role ? role?.data : [];
      this.tableConfig.total = role ? role?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetRoles(data!));
  }

  onActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'edit')
      this.edit(action.data)
    else if(action.actionToPerform == 'delete')
      this.delete(action.data)
    else if(action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)
  }

  edit(data: Role) {
    this.router.navigateByUrl(`/role/edit/${data.id}`);
  }

  delete(data: Role) {
    this.store.dispatch(new DeleteRole(data.id))
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllRole(ids))
  }

}
