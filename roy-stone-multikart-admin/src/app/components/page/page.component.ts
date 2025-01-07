import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PageState } from '../../shared/store/state/page.state';
import { Observable } from 'rxjs';
import { Page, PageModel } from '../../shared/interface/page.interface';
import { SettingState } from '../../shared/store/state/setting.state';
import { Values } from '../../shared/interface/setting.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { Params, Router, RouterModule } from '@angular/router';
import { DeleteAllPage, DeletePage, GetPages, UpdatePageStatus } from '../../shared/store/action/page.action';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [TranslateModule, RouterModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {

  @Select(PageState.page) page$: Observable<PageModel>;

  @Select(SettingState.setting) setting$: Observable<Values>;

  public url: string;

  public tableConfig: TableConfig = {
    columns: [
      { title: "title", dataField: "title", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc'  },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "page.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "page.destroy" },
      { label: "View", actionToPerform: "view", icon: "ri-eye-line" }
    ],
    data: [] as Page[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) {
      this.setting$.subscribe(setting => {
        this.url = setting.general.site_url;
      });
    }

  ngOnInit(): void {
    this.page$.subscribe(page => {
      this.tableConfig.data  = page ? page?.data  : [];
      this.tableConfig.total = page ? page?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetPages(data));
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
    else if(action.actionToPerform == 'view')
      this.view(action.data)
  }

  edit(data: Page) {
    this.router.navigateByUrl(`/page/edit/${data.id}`);
  }

  status(data: Page) {
    this.store.dispatch(new UpdatePageStatus(data.id, data.status));
  }

  delete(data: Page) {
    this.store.dispatch(new DeletePage(data.id));
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllPage(ids));
  }

  view(data: Page) {
    window.open(this.url+'/page/'+data.slug, "_blank");
  }

}
