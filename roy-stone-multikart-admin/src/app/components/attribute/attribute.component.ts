import { Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AttributeState } from '../../shared/store/state/attribute.state';
import { Observable } from 'rxjs';
import { Attribute, AttributeModel } from '../../shared/interface/attribute.interface';
import { ImportCsvModalComponent } from '../../shared/components/ui/modal/import-csv-modal/import-csv-modal.component';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { Params, Router, RouterModule } from '@angular/router';
import { DeleteAllAttribute, DeleteAttribute, ExportAttribute, GetAttributes } from '../../shared/store/action/attribute.action';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [TranslateModule, RouterModule, HasPermissionDirective,
            PageWrapperComponent, TableComponent, ImportCsvModalComponent
  ],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent {

  @Select(AttributeState.attribute) attribute$: Observable<AttributeModel>;

  @ViewChild("csvModal") CSVModal: ImportCsvModalComponent;

  public tableConfig: TableConfig = {
    columns: [
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "created_at", type: "date", sortable: true, sort_direction: 'desc' }
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "attribute.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "attribute.destroy" },
    ],
    data: [] as Attribute[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.attribute$.subscribe(attribute => {
      this.tableConfig.data = attribute ? attribute?.data : [];
      this.tableConfig.total = attribute ? attribute?.total : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetAttributes(data));
  }

  onActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'edit')
      this.edit(action.data)
    else if(action.actionToPerform == 'delete')
      this.delete(action.data)
    else if(action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)
  }

  edit(data: Attribute) {
    this.router.navigateByUrl(`/attribute/edit/${data.id}`);
  }

  delete(data: Attribute) {
    this.store.dispatch(new DeleteAttribute(data.id!))
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllAttribute(ids))
  }

  export() {
    this.store.dispatch(new ExportAttribute());
  }

}
