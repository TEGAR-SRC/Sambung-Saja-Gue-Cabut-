import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

export interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  public alert: Alert;

  constructor(private notificationService: NotificationService) { 
    this.notificationService.alertSubject.subscribe(alert => {
      this.alert = <Alert>alert;
    })
  }

  ngOnDestroy() {
    this.notificationService.notification = true;
  }

}
