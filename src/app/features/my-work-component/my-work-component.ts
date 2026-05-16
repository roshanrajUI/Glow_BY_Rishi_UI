import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-work-component',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './my-work-component.html',
  styleUrl: './my-work-component.scss',
})
export class MyWorkComponent {
  services: { serviceId: number; serviceName: string }[] = [
    {
      serviceId: 0,
      serviceName: 'All',
    },
    {
      serviceId: 2,
      serviceName: 'Bridal',
    },
    {
      serviceId: 3,
      serviceName: 'Party',
    },
    {
      serviceId: 4,
      serviceName: 'Photoshoot',
    },
    {
      serviceId: 5,
      serviceName: 'Saree',
    },
    {
      serviceId: 6,
      serviceName: 'Hair',
    },
  ];

  myAllWorks = [
    {
      serviceId: 1,
      image: '../../../assets/images/service-makeup.jpg',
      title: 'Bridal Makeup',
      description: 'bridal super nice.',
    },
    {
      serviceId: 2,
      image: '../../../assets/images/service-hair.jpg',
      title: 'Party Glam',
      description: 'makeup super nice.',
    },
    {
      serviceId: 3,
      image: '../../../assets/images/service-skin.jpg',
      title: 'Photoshoot Ready',
      description: 'Photoshoot super.',
    },
    {
      serviceId: 4,
      image: '../../../assets/images/service-mehendi.jpg',
      title: 'Saree',
      description: 'Elegant and personalized saree .',
    },
    {
      serviceId: 2,
      image: '../../../assets/images/service-saree.jpg',
      title: 'Hair',
      description: 'Elegant and personalized .',
    },
    {
      serviceId: 2,
      image: '../../../assets/images/service-saree.jpg',
      title: 'Hair',
      description: 'Elegant and personalized .',
    },
  ];

  myWorks = this.myAllWorks;

  getServiceWork(serviceId: number) {
    if (serviceId === 0) {
      this.myWorks = this.myAllWorks;
      return;
    }
    this.myWorks = this.myAllWorks.filter((work) => work.serviceId === serviceId);
  }

  showMoreWorks() {
    // this.myWorks =
    // api call with pagination
  }
}
