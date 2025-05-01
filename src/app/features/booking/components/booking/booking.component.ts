import { Component } from '@angular/core';
// 1. Importar las interfaces necesarias
import { Service, ServiceSelectionEvent } from '../../../../interfaces/service.model';

@Component({
  selector: 'app-booking',
  standalone: false, 
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  // 2. Definir propiedades para guardar el estado actual de la reserva
  // Para Servicios
  selectedServiceObjects: Service[] = [];
  currentTotalPrice: number = 0;

  // Para Estilista (ejemplo, vendrá de otro componente hijo)
  selectedStylistName: string | null = null;
  // Para Fecha y Hora (ejemplo, vendrá de otro componente hijo)
  selectedDateTime: Date | null = null; // O el tipo de dato que uses para la fecha/hora

  // Puedes añadir más propiedades según necesites (datos del cliente, etc.)

  constructor() { }

  // 3. Método para manejar el evento emitido por ChooseServiceComponent
  handleServiceSelection(event: ServiceSelectionEvent): void {
    console.log('Parent received event:', event); // Para depuración
    this.selectedServiceObjects = event.selectedServices;
    this.currentTotalPrice = event.totalPrice;
    // Podrías llamar a otros métodos aquí si fuera necesario,
    // como re-evaluar si la reserva se puede confirmar.
    // this.checkIfBookingCanBeConfirmed();
  }

  // 4. (Opcional pero útil) Getter para formatear el nombre de los servicios para el resumen
  get serviceNameToDisplay(): string | null {
    if (!this.selectedServiceObjects || this.selectedServiceObjects.length === 0) {
      return null; // O 'No seleccionado'
    }
    if (this.selectedServiceObjects.length === 1) {
      return this.selectedServiceObjects[0].name;
    }
    // Si hay múltiples servicios, puedes listarlos o poner un texto genérico
    return this.selectedServiceObjects.map(s => s.name).join(' + ');
    // return 'Múltiples servicios'; // Alternativa más simple
  }

  // 3. Este método recibe el nombre emitido por SelectStylistComponent
  handleStylistSelection(stylistName: string | null): void {
    console.log('Parent received stylist:', stylistName);
    this.selectedStylistName = stylistName; // Actualiza la propiedad del padre
    // Opcional: Llamar a lógicas dependientes, como verificar si se puede confirmar
    // this.checkIfBookingCanBeConfirmed();
  }

  handleDateTimeSelection(dateTime: Date | null): void { // Recibe Date o null
    console.log('Parent received dateTime:', dateTime);
    this.selectedDateTime = dateTime; // Actualiza la propiedad del padre
    // this.checkIfBookingCanBeConfirmed();
  }

  // --- Placeholder para acciones del BookingSummary ---
  confirmBooking(): void {
    console.log('--- Confirmación Final ---');
    console.log('Servicios:', this.selectedServiceObjects);
    console.log('Precio Total:', this.currentTotalPrice);
    console.log('Estilista:', this.selectedStylistName);
    console.log('Fecha/Hora:', this.selectedDateTime);
    // Aquí iría la lógica para enviar la reserva al backend
    alert('¡Reserva confirmada (simulación)!');
  }

  // --- Lógica para habilitar/deshabilitar el botón de confirmar ---
  get canConfirm(): boolean {
    // La reserva se puede confirmar si se han seleccionado todos los pasos requeridos
    return this.selectedServiceObjects.length > 0 &&
           !!this.selectedStylistName &&  // '!!' convierte a booleano (true si no es null/undefined)
           !!this.selectedDateTime;
           // && !!this.customerDetails; // Añadir más condiciones si es necesario
  }
}