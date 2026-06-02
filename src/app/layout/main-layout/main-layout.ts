import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Footer } from '../../shared/components/footer/footer';
import { MatDialog } from '@angular/material/dialog';
import { BookNowDialog } from '../../features/book-now-dialog/book-now-dialog';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  constructor() {}
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
      }
    }, 200);
  }

  openBookNowDialog(isSide = false, drawer?: any) {
    if (isSide) drawer?.close();
    this.dialog.open(BookNowDialog, {
      width: '600px',
      height: '600px',
      data: {
        name: 'roshan',
      },
    });
  }
}
