import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { AlertMessage, AlertService } from '../../../shared/services/alert-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-component',
  imports: [CommonModule],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.scss',
})
export class AlertComponent {
  alerts: Signal<AlertMessage[]>;

  constructor(private alertService: AlertService) {
    this.alerts = this.alertService.alerts$;
  }

  getAlertClass(alert: AlertMessage) {
    switch (alert.type) {
      case 'error':
        return 'error-msg';

      case 'info':
        return 'infor-msg';

      case 'success':
        return 'success-msg';

      case 'warning':
        return 'warning-msg';
    }
  }
}
