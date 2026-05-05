import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reviews-component',
  imports: [MatIconModule],
  templateUrl: './reviews-component.html',
  styleUrl: './reviews-component.scss',
})
export class ReviewsComponent {
  reviews = [
    {
      id: 1,
      name: 'John Doe',
      serviceName: 'Facial',
      city: 'New York',
      review: 'Great service! Highly recommend a for apple b for banan c for cat d for dog.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      serviceName: 'Hair',
      city: 'Los Angeles',
      review: 'Amazing experience! Will come back again.',
    },
    {
      id: 3,
      name: 'Emily Johnson',
      serviceName: 'Manicure',
      city: 'Chicago',
      review: 'Professional and friendly staff. Loved it!',
    },
    {
      id: 4,
      name: 'Emily Johnson',
      serviceName: 'Manicure',
      city: 'Chicago',
      review: 'Professional and friendly staff. Loved it!',
    },
  ];
}
