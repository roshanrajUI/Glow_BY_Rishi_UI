import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services-component',
  imports: [CommonModule],
  templateUrl: './services-component.html',
  styleUrl: './services-component.scss',
})
export class ServicesComponent {
  servicesDetails = [
    {
      title: 'Makeup',
      description:
        'Our expert makeup artists will create a stunning bridal look that enhances your natural beauty and complements your wedding theme.',
      image: '../../../assets/images/service-makeup.jpg',
    },
    {
      title: 'Hair',
      description:
        'Our skilled hairstylists will create elegant and personalized hairstyles that perfectly complement your bridal look and wedding theme.',
      image: '../../../assets/images/service-hair.jpg',
    },
    {
      title: 'Skin',
      description:
        'Our talented makeup artists will create beautiful and cohesive looks for the bridesmaids, ensuring they complement the bride’s style.',
      image: '../../../assets/images/service-skin.jpg',
    },
    {
      title: 'Mehendi',
      description:
        'Our professional makeup artists will provide flawless makeup for pre-wedding events, ensuring you look stunning in every celebration leading up to your big day.',
      image: '../../../assets/images/service-mehendi.jpg',
    },
    {
      title: 'Saree Draping',
      description:
        'Our expert stylists will create elegant and personalized saree draping styles that perfectly complement your bridal look and wedding theme.',
      image: '../../../assets/images/service-saree.jpg',
    },
  ];
}
