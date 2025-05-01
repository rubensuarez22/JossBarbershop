import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common'; // Importar Pipes

// Interfaz opcional para la estructura de datos de entrada
export interface BookingDetails {
  serviceName: string | null;
  stylistName: string | null;
  dateTime: Date | null;
  totalPrice: number | null;
}

@Component({
  selector: 'app-booking-summary',
  standalone: false,
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css'],
  // Usar OnPush puede mejorar el rendimiento si las entradas no cambian frecuentemente
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Proveer pipes directamente en el componente
  providers: [DatePipe, CurrencyPipe]
})
export class BookingSummaryComponent {

  // Entradas para recibir los datos de la reserva del componente padre
  @Input() serviceName: string | null = null;
  @Input() stylistName: string | null = null;
  @Input() selectedDateTime: Date | null = null;
  @Input() totalPrice: number | null = null;

  // Indicador opcional para saber si la reserva está lista para confirmar
  @Input() canConfirm: boolean = false;

  // Salidas para notificar al padre sobre acciones del usuario
  @Output() confirmBooking = new EventEmitter<void>();
  @Output() viewPolicy = new EventEmitter<void>();
  @Output() contactSupport = new EventEmitter<void>();

  // Constructor para inyectar pipes (necesario si se usan en la lógica del TS)
  // Si solo se usan en la plantilla, no es estrictamente necesario inyectarlas aquí
  // constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {}

  // Métodos para emitir eventos cuando se hace clic
  onConfirm(): void {
    if (this.canConfirm) {
      this.confirmBooking.emit();
    }
  }

  onViewPolicy(): void {
    this.viewPolicy.emit();
    // Podrías prevenir el comportamiento por defecto si es un enlace real
    // event.preventDefault();
  }

  onContactSupport(): void {
    this.contactSupport.emit();
    // event.preventDefault();
  }

  // Método auxiliar (opcional) para formatear fecha/hora si se necesita lógica compleja
  // getFormattedDateTime(): string {
  //   if (!this.selectedDateTime) return 'No seleccionada';
  //   // Ejemplo: '15 feb. 2024 a las 10:00 AM' (ajustar formato según necesidad)
  //   return this.datePipe.transform(this.selectedDateTime, 'd MMM y \'a las\' h:mm a') ?? 'Fecha inválida';
  // }
}