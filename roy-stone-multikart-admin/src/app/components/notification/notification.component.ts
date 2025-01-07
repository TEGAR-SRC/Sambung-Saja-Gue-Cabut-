import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationState } from '../../shared/store/state/notification.state';
import { GetNotification, MarkAsReadNotification } from '../../shared/store/action/notification.action';
import { Notification } from "../../shared/interface/notification.interface";
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, PageWrapperComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  @Select(NotificationState.notification) notification$: Observable<Notification[]>;

  constructor(private store: Store) {
    this.store.dispatch(new GetNotification());
  }

  ngOnDestroy() {
    this.store.dispatch(new MarkAsReadNotification());
  }

}
