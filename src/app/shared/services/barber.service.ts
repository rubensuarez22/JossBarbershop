import { Injectable } from '@angular/core';
import { Barber } from '../../interfaces/barber.model';

@Injectable({
  providedIn: 'root'
})
export class BarberService {

  // Pega aquí la lista que cortaste de BarbersListComponent
  private barbersData: Barber[] = [
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

  constructor() { }

  // Método público para obtener la lista de barberos
  getBarbers(): Barber[] {
    // Devolver una copia previene modificaciones accidentales desde fuera del servicio
    return [...this.barbersData];
  }
}
