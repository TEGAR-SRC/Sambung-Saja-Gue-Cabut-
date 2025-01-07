import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { NoDataComponent } from '../../../shared/components/ui/no-data/no-data.component';
import { Category } from '../../../shared/interface/category.interface';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,
            TreeNodeComponent, NoDataComponent
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {

  @Input() type: string;
  @Input() data: Category[];
  @Input() recursionKey: string;
  @Input() displayKey: string = 'name';
  @Input() categoryType: string | null = 'product';

  public treeSearch = new FormControl('');
  public dataToShow: Category[] = [];

  constructor() {
    this.treeSearch.valueChanges
        .subscribe(
          (data) => {
        if(data) {
            this.dataToShow = [];
            this.data.forEach(item =>{
                this.hasValue(item) && this.dataToShow.push(item)
            })
        } else {
            this.dataToShow = this.data;
        }
    });
  }

  ngOnChanges() {
    this.dataToShow = this.data;
  }

  hasValue(item: any) {
    let valueToReturn = false;
    if(item[this.displayKey].toLowerCase().includes(this.treeSearch?.value?.toLowerCase())){
      valueToReturn = true;
    }
    item[this.recursionKey]?.length && item[this.recursionKey].forEach((child: Category) => {
      if(this.hasValue(child)) {
        valueToReturn = true;
      }
    })
    return valueToReturn;
  }
}
