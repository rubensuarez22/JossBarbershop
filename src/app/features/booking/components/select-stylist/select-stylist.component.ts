import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Ajusta la ruta a la interfaz Barber desde aquí
import { Barber } from '../../../../interfaces/barber.model';
// Importa el servicio
import { BarberService } from '../../../..//shared/services/barber.service';

@Component({
  selector: 'app-select-stylist',
  standalone: false,
  templateUrl: './select-stylist.component.html',
  styleUrls: ['./select-stylist.component.css']
})
export class SelectStylistComponent implements OnInit {
  availableBarbers: Barber[] = []; // Puedes llamarla como quieras
  selectedBarber: Barber | null = null; // Para manejar la selección

  // 1. Añadir el Output. Emitirá el nombre (string) o null.
  @Output() stylistSelected = new EventEmitter<string | null>();

  // Inyecta el mismo servicio
  constructor(private barberService: BarberService) { }

  ngOnInit(): void {
    // Obtén la lista de barberos desde el servicio compartido
    this.availableBarbers = this.barberService.getBarbers();
  }

  // Función para manejar la selección (ejemplo)
  selectBarber(barber: Barber | null): void {
    this.selectedBarber = barber;
    console.log('Barbero seleccionado:', this.selectedBarber);
    
    const selectedName = barber ? barber.name : null;
    this.stylistSelected.emit(selectedName);
  }

  // Función trackBy: Devuelve un identificador único para cada barbero
  // Puede ser el índice o una propiedad única si la hubiera (como el nombre, si fuera único)
  trackByBarber(index: number, barber: Barber): number {
    return index; // Usar el índice es simple si no hay otra propiedad única garantizada
    // o return barber.name; // Si los nombres fueran siempre únicos
  }
}