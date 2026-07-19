import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminBookingComponent } from '../admin-booking-component/admin-booking-component';
import { AdminCategoryComponent } from '../admin-category-component/admin-category-component';
import { AdminServiceComponent } from '../admin-service-component/admin-service-component';
import { AdminMyWorkComponent } from '../admin-my-work-component/admin-my-work-component';

@Component({
  selector: 'app-admin-base-component',
  imports: [
    MatTabsModule,
    AdminBookingComponent,
    AdminCategoryComponent,
    AdminServiceComponent,
    AdminMyWorkComponent,
  ],
  templateUrl: './admin-base-component.html',
  styleUrl: './admin-base-component.scss',
})
export class AdminBaseComponent {
  tabs = [
    { label: 'Booking' },
    { label: 'Categories' },
    { label: 'Services' },
    { label: 'My Work' },
  ];
  selectedTabIndex = 0;

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
  }
}
