import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { dummyCategories } from '../../../assets/images/dummy/dummy';

@Component({
  selector: 'app-my-work-component',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './my-work-component.html',
  styleUrl: './my-work-component.scss',
})
export class MyWorkComponent {
  categories = dummyCategories;

  myAllWorks = [
    {
      serviceId: '1',
      image: '../../../assets/images/service-makeup.jpg',
      title: 'Bridal Makeup',
      description: 'bridal super nice.',
    },
    {
      serviceId: '2',
      image: '../../../assets/images/service-hair.jpg',
      title: 'Party Glam',
      description: 'makeup super nice.',
    },
    {
      serviceId: '3',
      image: '../../../assets/images/service-skin.jpg',
      title: 'Photoshoot Ready',
      description: 'Photoshoot super.',
    },
    {
      serviceId: '4',
      image: '../../../assets/images/service-mehendi.jpg',
      title: 'Saree',
      description: 'Elegant and personalized saree .',
    },
    {
      serviceId: '5',
      image: '../../../assets/images/service-saree.jpg',
      title: 'Hair',
      description: 'Elegant and personalized .',
    },
    {
      serviceId: '5',
      image: '../../../assets/images/service-saree.jpg',
      title: 'Hair',
      description: 'Elegant and personalized .',
    },
  ];

  myWorks = this.myAllWorks;

  getServiceWork(serviceId: string) {
    if (!serviceId) {
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
