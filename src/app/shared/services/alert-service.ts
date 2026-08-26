import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alerts = signal<AlertMessage[]>([]);
  readonly alerts$ = this.alerts.asReadonly();

  showAlert(type: AlertType, message: string) {
    this.alerts.update((currentVal) => [
      ...currentVal,
      {
        type,
        message,
      },
    ]);
    this.removeAlert(type, message);
  }

  removeAlert(type: AlertType, message: string) {
    setTimeout(() => {
      this.alerts.update((alerts) =>
        alerts.filter((alert) => alert.message !== message && alert.type !== type),
      );
    }, 5000);
  }
}

export interface AlertMessage {
  type: AlertType;
  message: string;
}

export type AlertType = 'success' | 'error' | 'info' | 'warning';
