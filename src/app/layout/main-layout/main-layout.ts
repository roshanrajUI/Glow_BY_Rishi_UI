import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Footer } from '../../shared/components/footer/footer';
import { MatDialog } from '@angular/material/dialog';
import { BookNowDialog } from '../../features/book-now-dialog/book-now-dialog';
import { filter } from 'rxjs';
import { BookingSuccessDialog } from '../../shared/components/booking-success-dialog/booking-success-dialog';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  constructor(private readonly router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => {
        const content = document.querySelector('mat-sidenav-content') as HTMLElement;

        content?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });
      }, 0);
    });
  }
  dialog = inject(MatDialog);

  goToSection(sectionId: string, drawer?: any) {
    drawer?.close();

    setTimeout(() => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }, 500);
        });
      }
    }, 200);
    drawer.close();
  }

  openBookNowDialog(isSide = false, drawer?: any) {
    if (isSide) drawer?.close();
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
