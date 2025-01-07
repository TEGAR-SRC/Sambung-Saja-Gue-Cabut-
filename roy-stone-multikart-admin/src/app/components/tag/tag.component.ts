import { Component, Input, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TagState } from '../../shared/store/state/tag.state';
import { Observable } from 'rxjs';
import { Tag, TagModel } from '../../shared/interface/tag.interface';
import { ImportCsvModalComponent } from '../../shared/components/ui/modal/import-csv-modal/import-csv-modal.component';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { Params, Router, RouterModule } from '@angular/router';
import { DeleteAllTag, DeleteTag, ExportTag, GetTags, UpdateTagStatus } from '../../shared/store/action/tag.action';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [TranslateModule, RouterModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent, ImportCsvModalComponent
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {

  @Select(TagState.tag) tag$: Observable<TagModel>;

  @Input() tagType: string | null = 'product';

  @ViewChild("csvModal") CSVModal: ImportCsvModalComponent;

  public tableConfig: TableConfig = {
    columns: [
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "tag.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "tag.destroy" },
    ],
    data: [] as Tag[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.tag$.subscribe(tag => {
      this.tableConfig.data  = tag ? tag?.data  : [];
      this.tableConfig.total = tag ? tag?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    data!['type'] = this.tagType!;
    this.store.dispatch(new GetTags(data));
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

  edit(data: Tag) {
    if(this.tagType == 'post')
      this.router.navigateByUrl(`/blog/tag/edit/${data.id}`);
    else
      this.router.navigateByUrl(`/tag/edit/${data.id}`);
  }

  status(data: Tag) {
    this.store.dispatch(new UpdateTagStatus(data.id, data.status))
  }

  delete(data: Tag) {
    this.store.dispatch(new DeleteTag(data.id))
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllTag(ids))
  }

  export() {
    this.store.dispatch(new ExportTag());
  }

}
