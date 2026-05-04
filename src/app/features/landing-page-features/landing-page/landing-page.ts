import { Component } from '@angular/core';
import { HeroSection } from '../hero-section/hero-section';
import { ServicesComponent } from '../../services-component/services-component';
import { WhyChooseMe } from '../../why-choose-me/why-choose-me';

@Component({
  selector: 'app-landing-page',
  imports: [HeroSection, ServicesComponent, WhyChooseMe],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
