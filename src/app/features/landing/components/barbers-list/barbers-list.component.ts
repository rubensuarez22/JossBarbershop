import { Component, OnInit } from '@angular/core';
import { Barber } from '../../../../interfaces/barber.model';

@Component({
  standalone: false,
  selector: 'app-barbers-list',
  templateUrl: './barbers-list.component.html',
  styleUrls: ['./barbers-list.component.css']
})
export class BarbersListComponent implements OnInit {
  barbers: Barber[] = [];

  ngOnInit() {
    this.barbers = [
      {
        name: 'Carlos Rodríguez',
        imageUrl: 'assets/barbers/carlos.jpg',
        rating: 4.8,
        tags: ['Cortes Clásicos', 'Barbas', 'Afeitados']
      },
      {
        name: 'Miguel Ángel Torres',
        imageUrl: 'assets/barbers/miguel.jpg',
        rating: 4.9,
        tags: ['Diseños', 'Degradados', 'Tintes']
      },
      {
        name: 'Javier Morales',
        imageUrl: 'assets/barbers/javier.jpg',
        rating: 4.7,
        tags: ['Estilos Modernos', 'Tratamientos', 'Barbas']
      },
      {
        name: 'Raul Asensio',
        imageUrl: 'assets/barbers/raul.jpg',
        rating: 4.7,
        tags: ['Estilos Modernos', 'Tratamientos', 'Barbas']
      },
      {
        name: 'Raul Asensio',
        imageUrl: 'assets/barbers/raul.jpg',
        rating: 4.7,
        tags: ['Estilos Modernos', 'Tratamientos', 'Barbas']
      },
      {
        name: 'Raul Asensio',
        imageUrl: 'assets/barbers/raul.jpg',
        rating: 4.7,
        tags: ['Estilos Modernos', 'Tratamientos', 'Barbas']
      },
      {
        name: 'Raul Asensio',
        imageUrl: 'assets/barbers/raul.jpg',
        rating: 4.7,
        tags: ['Estilos Modernos', 'Tratamientos', 'Barbas']
      },
      {
        name: 'Raul Asensio',
        imageUrl: 'assets/barbers/raul.jpg',
        rating: 4.7,
        tags: ['Estilos Modernos', 'Tratamientos', 'Barbas']
      },
      {
        name: 'Raul Asensio',
        imageUrl: 'assets/barbers/raul.jpg',
        rating: 4.7,
        tags: ['Estilos Modernos', 'Tratamientos', 'Barbas']
      },

    ];
  }
}
