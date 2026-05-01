import { Component } from '@angular/core';
import { HeroSection } from '../hero-section/hero-section';

@Component({
  selector: 'app-landing-page',
  imports: [HeroSection],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
