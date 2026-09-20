import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BookNowDialog } from '../../book-now-dialog/book-now-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../models/common.interface';
import { CategoryService } from '../../services/category-services/category.service';
import { SharedService } from '../../../shared/services/shared-service';
import { RouterModule } from '@angular/router';
import { BookingSuccessDialog } from '../../../shared/components/booking-success-dialog/booking-success-dialog';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection implements OnInit {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly sharedService: SharedService,
  ) {}
  readonly dialog = inject(MatDialog);
  categories: Category[] = [];

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories<Category[]>().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.sharedService.$categories.set(categories);
    });
  }

  openBookNowDialog(isSide = false, drawer?: any) {
    if (isSide) drawer?.close();
    const dialogRef = this.dialog.open(BookNowDialog, {
      width: '600px',
      height: '600px',
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
