import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BookNowDialog } from '../../book-now-dialog/book-now-dialog';
import { MatDialog } from '@angular/material/dialog';
import { dummyCategories } from '../../../../assets/images/dummy/dummy';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, MatIconModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  readonly dialog = inject(MatDialog);
  categories = dummyCategories;

  openBookNowDialog(isSide = false, drawer?: any) {
    if (isSide) drawer?.close();
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
