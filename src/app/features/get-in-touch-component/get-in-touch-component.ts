import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BookNowDialog } from '../book-now-dialog/book-now-dialog';

@Component({
  selector: 'app-get-in-touch-component',
  imports: [MatIconModule],
  templateUrl: './get-in-touch-component.html',
  styleUrl: './get-in-touch-component.scss',
})
export class GetInTouchComponent {
  readonly dialog = inject(MatDialog);

  openBookNowDialog() {
    this.dialog.open(BookNowDialog, {
      width: '600px',
      height: '600px',
      data: {
        name: 'roshan',
      },
      disableClose: true,
    });
  }
}
