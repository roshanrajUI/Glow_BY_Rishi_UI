import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-success-dialog',
  imports: [],
  templateUrl: './booking-success-dialog.html',
  styleUrl: './booking-success-dialog.scss',
})
export class BookingSuccessDialog {
  dialogRef = inject(MatDialogRef<BookingSuccessDialog>);
  dialogData = inject<{
    bookingNumber: string;
  }>(MAT_DIALOG_DATA);

  dialogClose() {
    this.dialogRef.close();
  }
}
