import { ButtonComponent } from './../../../shared/components/ui/button/button.component';
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/ui/no-data/no-data.component';
import { Category } from '../../../shared/interface/category.interface';
import { Menu } from '../../../shared/interface/menu.interface';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteMenu, UpdateSortMenu } from '../../../shared/store/action/menu.action';
import { DeleteModalComponent } from '../../../shared/components/ui/modal/delete-modal/delete-modal.component';
import { HasPermissionDirective } from '../../../shared/directive/has-permission.directive';

@Component({
  selector: 'app-menu-tree',
  standalone: true,
  imports: [CommonModule, NoDataComponent, TranslateModule, 
            FormsModule, ReactiveFormsModule, DragDropModule, 
            RouterModule, DeleteModalComponent, HasPermissionDirective,
            ButtonComponent],
  templateUrl: './menu-tree.component.html',
  styleUrl: './menu-tree.component.scss'
})
export class MenuTreeComponent {

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  @Input() type: string;
  @Input() data: Menu[];
  @Input() recursionKey: string;
  @Input() displayKey: string = 'title';
  @Input() categoryType: string | null = 'product';

  public treeSearch = new FormControl('');
  public dataToShow: Menu[] = [];
  public showChildrenNode: boolean = true;
  public id: number;

  constructor(private store: Store, private router: Router,
    private route: ActivatedRoute) {
      
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


  ngOnInit(){
    
    this.route.params.subscribe( params => this.id = params['id']);
  }

  onShowChildrenNode(node: Menu){
    node['show'] = !node['show']
  }

  delete(actionType: string, data: Category) {
    this.store.dispatch(new DeleteMenu(data.id!)).subscribe({
      complete: () => {
        this.router.navigateByUrl('/menu');
      }
    });
  }

  ngOnChanges() {
    this.dataToShow = this.data;
    this.addKey(this.dataToShow)
  }

  addKey(data: Menu[]){
    data.forEach(item => {
      item['show'] = true;
      this.addKey(item.child);
    })
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
    });
    return valueToReturn;
  }
  
  drop(event: CdkDragDrop<any[]>, items: any[]) {
     if (event.previousContainer === event.container) {
      moveItemInArray(items, event.previousIndex, event.currentIndex);
      this.updateShortNumbers(items);
    }
  }

  updateShortNumbers(items: any[]) {
    items.forEach((item, index) => {
      item.short = index + 1;
      if (item.subtasks) {
        this.updateShortNumbers(item.subtasks);
      }
    });
  }

  saveChanges(){
    this.filterJson(this.dataToShow)
    this.store.dispatch(new UpdateSortMenu({menus: this.filterJson(this.dataToShow)}))
  }

  filterJson(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item, index) => {
        item['sort'] = index
        return this.filterJson(item)
      });
    } else if (typeof obj === 'object') {
      const newObj: any = {};
      newObj['id'] = obj['id'];
      newObj['parent_id'] = obj['parent_id'];
      newObj['sort'] = obj['sort'];
      if (Array.isArray(obj['child'])) {
        newObj['child'] = this.filterJson(obj['child']);
      }
      return newObj;
    } else {
      return obj;
    }
  }

}
