import { Component } from '@angular/core';
import { HeroSection } from '../hero-section/hero-section';
import { ServicesComponent } from '../../services-component/services-component';
import { WhyChooseMe } from '../../why-choose-me/why-choose-me';
import { Artist } from '../../artist/artist';
import { ReviewsComponent } from '../../reviews-component/reviews-component';
import { GetInTouchComponent } from '../../get-in-touch-component/get-in-touch-component';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeroSection,
    ServicesComponent,
    WhyChooseMe,
    Artist,
    ReviewsComponent,
    GetInTouchComponent,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
