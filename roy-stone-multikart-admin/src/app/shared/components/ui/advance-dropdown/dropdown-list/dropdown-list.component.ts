import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-list',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-list.component.html',
  styleUrl: './dropdown-list.component.scss'
})
export class DropdownListComponent {

  @Input() data: any;
  @Input() selectedPillIds: number[];
  @Input() parentId: number[];
  @Input() key: string;
  @Input() subArrayKey: string;
  @Input() showImage: boolean;
  
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Output() subItemClicked: EventEmitter<any> = new EventEmitter();
  

  select(data: any) {
    data.selected = !data.selected;
    this.selected.emit(data);
  }

  onArrowClick(event: Event, data: any) {
    event.stopPropagation();
    this.subItemClicked.emit(data);
  }
  
}
