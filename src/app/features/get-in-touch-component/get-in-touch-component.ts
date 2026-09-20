import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BookNowDialog } from '../book-now-dialog/book-now-dialog';
import { BookingSuccessDialog } from '../../shared/components/booking-success-dialog/booking-success-dialog';

@Component({
  selector: 'app-get-in-touch-component',
  imports: [MatIconModule],
  templateUrl: './get-in-touch-component.html',
  styleUrl: './get-in-touch-component.scss',
})
export class GetInTouchComponent {
  readonly dialog = inject(MatDialog);

  openBookNowDialog() {
    const dialogRef = this.dialog.open(BookNowDialog, {
      width: '600px',
      height: '600px',
      data: {
        name: 'roshan',
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((bookingNumber) => {
      if (bookingNumber) {
        this.dialog.open(BookingSuccessDialog, {
          width: '400px',
          data: {
            bookingNumber,
          },
          disableClose: true,
        });
      }
    });
  }
}
