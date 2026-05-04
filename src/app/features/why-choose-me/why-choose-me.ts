import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-why-choose-me',
  imports: [CommonModule, MatIconModule],
  templateUrl: './why-choose-me.html',
  styleUrl: './why-choose-me.scss',
})
export class WhyChooseMe {
  whyChooseMeDetails = [
    {
      title: 'Easy Booking',
      icon: 'calendar_today',
      description: 'Our team of skilled makeup artists.',
    },
    {
      title: 'Premium Products',
      icon: 'hotel_class',
      description: 'We understand that every bride is unique.',
    },
    {
      title: 'Hygiene Promise',
      icon: 'verified_user',
      description: 'We use only high-quality, long-lasting makeup products.',
    },
    {
      title: 'Client Satisfaction',
      icon: 'favorite',
      description: 'Our team pays meticulous attention to detail.',
    },
  ];
}
