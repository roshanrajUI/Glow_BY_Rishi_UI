import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
