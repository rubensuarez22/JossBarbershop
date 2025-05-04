import { Component } from '@angular/core';
import { Service, ServiceSelectionEvent } from '../../../../interfaces/service.model';

@Component({
  selector: 'app-booking',
  standalone: false, 
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  // Definir propiedades para guardar el estado actual de la reserva
  // Para Servicios
  selectedServiceObjects: Service[] = [];
  currentTotalPrice: number = 0;

  // Para Estilista (ejemplo, vendrá de otro componente hijo)
  selectedStylistName: string | null = null;
  // Para Fecha y Hora (ejemplo, vendrá de otro componente hijo)
  selectedDateTime: Date | null = null; // O el tipo de dato que uses para la fecha/hora

  // --- GETTERS PARA EL ESTADO DE LOS PASOS ---
  get isServiceComplete(): boolean {
    return this.selectedServiceObjects.length > 0;
  }

  get isStylistComplete(): boolean {
    // Consideramos completo si se seleccionó un nombre O si se eligió "cualquiera" (null)?
    // Aquí asumimos que null (cualquiera) también cuenta como completado.
    // return this.selectedStylistName !== undefined; // O simplemente verificar si ya pasó el paso
    return this.selectedStylistName !== null; // O ajusta la lógica si 'null' no cuenta
  }

  get isDateTimeComplete(): boolean {
    return !!this.selectedDateTime;
  }

  // Para guardar si el formulario de detalles es válido
  areDetailsValid: boolean = false;

  // Opcional: Para manejar la clase 'is-active' si es un proceso paso a paso
  currentStep: number = 1; // Inicializa en el primer paso
  goToNextStep() { this.currentStep++; }
  goToPreviousStep() { this.currentStep--; }

  constructor() { }

  // Método para manejar el evento emitido por ChooseServiceComponent
  handleServiceSelection(event: ServiceSelectionEvent): void {
    console.log('Parent received event:', event); // Para depuración
    this.selectedServiceObjects = event.selectedServices;
    this.currentTotalPrice = event.totalPrice;
    // Podrías llamar a otros métodos aquí si fuera necesario,
    // como re-evaluar si la reserva se puede confirmar.
    // this.checkIfBookingCanBeConfirmed();
  }

  // Getter para formatear el nombre de los servicios para el resumen
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

  // Este método recibe el nombre emitido por SelectStylistComponent
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

  // Para manejar el evento de validez del componente YourDetailsComponent
  handleDetailsValidity(isValid: boolean): void {
    console.log('Parent received details validity:', isValid);
    this.areDetailsValid = isValid;
    // Opcional: si también recibes los detalles, los puedes guardar
    // this.customerDetails = details;
  }

  // ESTE GETTER calcula si la reserva está completa
  get canConfirm(): boolean {
    // Comprobaciones anteriores
    const hasService = this.selectedServiceObjects && this.selectedServiceObjects.length > 0;
    const hasStylist = !!this.selectedStylistName;
    const hasDateTime = !!this.selectedDateTime;

    // Nueva comprobación: ¿Son válidos los detalles del cliente?
    const hasValidDetails = this.areDetailsValid; // Usa la propiedad actualizada por handleDetailsValidity

    // El botón solo se activa si TODO es válido
    return hasService && hasStylist && hasDateTime && hasValidDetails;
  }

  // ---------> AÑADE ESTE MÉTODO <---------
  confirmBooking(): void {
    // Lógica que se ejecuta al confirmar
    console.log('--- Confirmación Final ---');
    console.log('Servicios:', this.selectedServiceObjects);
    console.log('Precio Total:', this.currentTotalPrice);
    console.log('Estilista:', this.selectedStylistName);
    console.log('Fecha/Hora:', this.selectedDateTime);

    // Aquí iría la lógica real:
    // - Validar datos si es necesario
    // - Llamar a un servicio para enviar la reserva al backend/API
    // - Mostrar un mensaje de éxito/error
    // - Redirigir a una página de confirmación, etc.
    alert('¡Reserva confirmada (simulación)!');
  }
}