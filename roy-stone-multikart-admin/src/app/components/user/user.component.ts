import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { ImportCsvModalComponent } from '../../shared/components/ui/modal/import-csv-modal/import-csv-modal.component';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../shared/store/state/user.state';
import { Observable } from 'rxjs';
import { User, UserModel } from '../../shared/interface/user.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { Params } from '../../shared/interface/core.interface';
import { DeleteAllUser, DeleteUser, ExportUser, GetUsers, UpdateUserStatus } from '../../shared/store/action/user.action';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, TranslateModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent, ImportCsvModalComponent, CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  @Select(UserState.user) user$: Observable<UserModel>;

  @ViewChild("csvModal") CSVModal: ImportCsvModalComponent;

  public tableConfig: TableConfig = {
    columns: [
      { title: "avatar", dataField: "profile_image", class: 'tbl-image rounded-circle', type: 'image' },
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "email", dataField: "email" },
      { title: "role", dataField: "role_name" },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "user.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "user.destroy" },
    ],
    data: [] as User[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.user$.subscribe(user => {
      let users = user?.data?.filter(element => {
        element.role_name = element?.role?.name!
        return element;
      });
      this.tableConfig.data = user ? users : [];
      this.tableConfig.total = user ? user.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetUsers(data));
  }

  onActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'edit')
      this.edit(action.data)
    else if(action.actionToPerform == 'status')
      this.status(action.data)
    else if(action.actionToPerform == 'delete')
      this.delete(action.data)
    else if(action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)
  }

  edit(data: User) {
    this.router.navigateByUrl(`/user/edit/${data.id}`);
  }

  status(data: User) {
    this.store.dispatch(new UpdateUserStatus(data.id, data.status));
  }

  delete(data: User) {
    this.store.dispatch(new DeleteUser(data.id));
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllUser(ids));
  }

  export() {
    this.store.dispatch(new ExportUser());
  }
}
