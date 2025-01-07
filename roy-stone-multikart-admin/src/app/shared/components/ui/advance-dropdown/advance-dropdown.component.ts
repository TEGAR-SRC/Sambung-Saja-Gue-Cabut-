import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';

@Component({
  selector: 'app-advance-dropdown',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule,DropdownListComponent],
  templateUrl: './advance-dropdown.component.html',
  styleUrl: './advance-dropdown.component.scss'
})
export class AdvanceDropdownComponent {

  @ViewChild('dropdownContainer', { static: false }) dropdownContainer: ElementRef;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('items') items: ElementRef;

  @Input() selectSingle: boolean = false;
  @Input() displayKey: string = 'name';
  @Input() subArrayKey: string;
  @Input() options: any[];
  @Input() selectedOption: Number[];
  @Input() position: string = 'bottom';
  @Input() text: string = 'select_option';
  @Input() showImage: boolean = true;

  @Output() selectedItem: EventEmitter<any> = new EventEmitter();

  public isOpen = false;
  public optionsData: any[] = [];
  public selectedPills: any[] = [];
  public selectedIds: number[] = [];
  public breadCrumbValues: any[] = [];
  public term = new FormControl('');
  public parent: number[] = [];


  constructor() {
    this.term.valueChanges
        .subscribe((data: any) => {
        if(data) {
          this.optionsData = [];
          this.options.forEach(item =>{
            this.hasValue(item) && this.optionsData.push(item)
          })
        } else {
          this.optionsData = this.options;
        }
    });
  }

  ngOnChanges() {
    this.optionsData = this.options;
    this.selectedPills = [];
    this.selectedIds = [];
    if(this.selectedOption?.length){
      this.getSelectedData(this.selectedOption)
    } else {
      this.selectedPills = [];
      this.selectedIds = [];
    }
    this.optionsData.map(categories => this.getParentIds(categories));
  }

  getParentIds(data: any){
    data.subcategories && data.subcategories.map((sub_data:any) => {
      let id = this.selectedIds.includes(sub_data.id) ? data.id : null;
      id && this.parent.push(id);
      this.getParentIds(sub_data);
    })
  }

  getSelectedData(value: any) {
    this.options.forEach(item => {
      this.recursiveSelected(item, value.map(function (x: any) { 
        return parseInt(x); 
      }));
    })
  }

  recursiveSelected(item: any, value: any) {
    if(item.id && value.includes(item.id)) {
      this.onSelect(item)
    }
    if(item[this.subArrayKey]?.length) {
      item[this.subArrayKey].forEach((child: any) => {
        this.recursiveSelected(child, value)
      })
    }
  }

  hasValue(item: any) {
    let valueToReturn = false;
    if(item[this.displayKey].toLowerCase().includes(this.term?.value?.toLowerCase())){
        valueToReturn = true;
    }
    item[this.subArrayKey]?.length && item[this.subArrayKey].forEach((child: any) => {
      if(this.hasValue(child)) {
        valueToReturn = true
      }
    })
    return valueToReturn
  }

  toggleDropdown(event: Event) {
    this.isOpen = !this.isOpen ;
    let selector = this.dropdownContainer.nativeElement.querySelector('.dropdown-open');
    if (this.position == 'bottom') {
        selector.style.bottom = 'auto';
        selector.style.top = '100%';
    } else {
        selector.style.bottom = '100%';
        selector.style.top = 'auto';
    }
  }

  onSelect(data: any) {
    if (this.selectSingle) {
      this.selectedPills = [];
      this.selectedIds = [];
      this.selectedPills.push(data);
      this.selectedIds.push(data.id);
    }
    else if (this.selectedPills.indexOf(data) < 0) {
      this.selectedPills.push(data);
      this.selectedIds.push(data.id);
    } else {
      if(!data.selected) {
        this.removeItem(data);
      }
    }
    
    this.selectedItem.emit(this.selectedIds);
  }

  removeItem(data: any) {
    this.selectedPills.splice(this.selectedPills.indexOf(data), 1);
    this.selectedIds.splice(this.selectedIds.indexOf(data.id), 1);
    this.selectedItem.emit(this.selectedIds);
  }

  subItemClicked(data: any) {
    this.isOpen = true;
    data[this.subArrayKey]?.length && this.breadCrumbValues.push(data)
    data[this.subArrayKey]?.length && (this.optionsData = data[this.subArrayKey])
  }

  changeTo(data: any) {
    if (this.subArrayKey) {
      this.optionsData = data[this.subArrayKey]
      this.breadCrumbValues.splice(this.breadCrumbValues.indexOf(data) + 1, this.breadCrumbValues.length - this.breadCrumbValues.indexOf(data))
    }
  }

  clearOptions() {
    this.optionsData = this.options
    this.breadCrumbValues = []
  }
  
  clickOutside(): void{
    this.isOpen = false
  }
  
}
