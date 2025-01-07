import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from "../../shared/components/ui/modal/confirmation-modal/confirmation-modal.component";
import { Params } from "../../shared/interface/core.interface";
import { Point, TransactionsData } from "../../shared/interface/point.interface";
import { CreditPoint, DebitPoint, GetUserTransaction } from '../../shared/store/action/point.action';
import { GetUsers } from '../../shared/store/action/user.action';
import { PointState } from '../../shared/store/state/point.state';
import { UserState } from '../../shared/store/state/user.state';
import { TranslateModule } from '@ngx-translate/core';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';

@Component({
  selector: 'app-point',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, HasPermissionDirective,
            ReactiveFormsModule, Select2Module,PageWrapperComponent,
            ButtonComponent, TableComponent, ConfirmationModalComponent
  ],
  templateUrl: './point.component.html',
  styleUrl: './point.component.scss'
})
export class PointComponent {

  @Select(UserState.users) users$: Observable<Select2Data>;
  @Select(PointState.point) point$: Observable<Point>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  public form: FormGroup;
  public balance: number = 0.00;
  public paginateInitialData: Params;

  public tableConfig = {
    columns: [
      { title: "points", dataField: "amount" },
      { title: "type", dataField: "type_status"},
      { title: "remark", dataField: "detail" },
      { title: "created_at", dataField: "created_at", type: "date" },
    ],
    data: [] as TransactionsData[],
    total: 0
  };

  constructor(@Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2, private store: Store,
    private formBuilder: FormBuilder) {
    this.store.dispatch(new GetUsers({ role: "consumer", status: 1 }));
    this.form = this.formBuilder.group({
      consumer_id: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
    });

    this.form.controls['consumer_id'].valueChanges.subscribe(value => {
      if(value) {
        this.paginateInitialData['consumer_id'] = value;
        this.store.dispatch(new GetUserTransaction(this.paginateInitialData));
        this.point$.subscribe(point => {
          let transactions = point?.transactions?.data?.filter((element: TransactionsData) => {
            element.type_status = element.type ? `<div class="status-${element.type}"><span>${element.type.replace(/_/g, " ")}</span></div>` : '-';
            return element;
          });
          this.balance = point ? point?.balance : 0.00;
          this.tableConfig.data = point ? transactions : [];
          this.tableConfig.total = point ? point?.transactions?.total : 0;
        });
        this.renderer.addClass(this.document.body, 'loader-none');
      } else {
        this.balance = 0;
        this.tableConfig.data = [];
        this.tableConfig.total = 0;
        this.form.controls['balance'].reset();
      }
    });

  }

  onTableChange(data?: Params) {
    this.paginateInitialData = data!;
    let vendor_id = this.form.controls['consumer_id']?.value;
    this.paginateInitialData['consumer_id'] = vendor_id;
    if(vendor_id) {
      this.store.dispatch(new GetUserTransaction(data));
    }
  }

  submit(type: string) {
    this.form.markAllAsTouched();
    let action = new CreditPoint(this.form.value);

    if(type == 'debit') {
      action = new DebitPoint(this.form.value)
    }

    if(this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.form.controls['balance'].reset();
        }
      });
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'loader-none');
  }

}
