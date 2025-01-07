import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NotificationState } from '../../../shared/store/state/notification.state';
import { Observable } from 'rxjs';
import { MarkAsReadNotification } from '../../../shared/store/action/notification.action';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { Notification } from '../../../shared/interface/notification.interface';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,TranslateModule, NoDataComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  @Select(NotificationState.notification) notification$: Observable<Notification[]>;

  constructor(private store: Store) {}

  ngOnDestroy() {
    this.store.dispatch(new MarkAsReadNotification());
  }

}
