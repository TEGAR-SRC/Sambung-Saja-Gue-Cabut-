import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { ImportCsvModalComponent } from '../../shared/components/ui/modal/import-csv-modal/import-csv-modal.component';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';
import { CategoryModel } from '../../shared/interface/category.interface';
import { ExportCategory, GetCategories } from '../../shared/store/action/category.action';
import { CategoryState } from '../../shared/store/state/category.state';
import { FormCategoryComponent } from './form-category/form-category.component';
import { TreeComponent } from './tree/tree.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, TranslateModule, HasPermissionDirective,
            NgbModule, PageWrapperComponent, FormCategoryComponent,
            TreeComponent, ImportCsvModalComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  @Select(CategoryState.category) category$: Observable<CategoryModel>;

  @ViewChild("csvModal") CSVModal: ImportCsvModalComponent;

  @Input() type: string = 'create';
  @Input() categoryType: string | null = 'product';

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new GetCategories({type: this.categoryType}));
  }

  export() {
    this.store.dispatch(new ExportCategory());
  }

  create(type: string) {
    this.router.navigate([type == 'post' ? '/blog/category' : '/category']);
  }

}
