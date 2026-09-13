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
      description:
        'Our team makes your makeup experience effortless with smooth scheduling, clear communication, and personalized attention.',
    },
    {
      title: 'Premium Products',
      icon: 'hotel_class',
      description:
        'We use carefully selected, high-quality makeup products that deliver a flawless, long-lasting finish while keeping your skin comfortable.',
    },
    {
      title: 'Hygiene Promise',
      icon: 'verified_user',
      description:
        'Your safety matters to us. We follow strict hygiene practices and use clean, sanitized tools for every client.',
    },
    {
      title: 'Client Satisfaction',
      icon: 'favorite',
      description:
        'We take the time to understand your preferences and make sure your experience feels comfortable and special.',
    },
    {
      title: 'Personalized Beauty',
      icon: 'woman',
      description:
        'We create makeup looks that complement your features, personality, outfit, and wedding style.',
    },
  ];
}
