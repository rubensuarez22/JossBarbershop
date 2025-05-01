import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { DatePipe, CurrencyPipe, NgIf, NgTemplateOutlet } from '@angular/common'; // Asegúrate de importar NgIf y NgTemplateOutlet si tu componente no es standalone o no los importa automáticamente

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, CurrencyPipe] // Si no es standalone
})
export class BookingSummaryComponent {

  // Entradas para recibir los datos de la reserva del componente padre
  @Input() serviceName: string | null = null;
  @Input() stylistName: string | null = null;
  @Input() selectedDateTime: Date | null = null;
  @Input() totalPrice: number | null = null;
  @Input() canConfirm: boolean = false;

  // Salidas para notificar al padre sobre acciones del usuario
  @Output() confirmBooking = new EventEmitter<void>();
  @Output() viewPolicy = new EventEmitter<void>();
  @Output() contactSupport = new EventEmitter<void>(); // Asegúrate de tener un elemento en el HTML para llamar a un método que emita esto si lo necesitas

  // Obtener referencia al elemento <dialog> usando ViewChild
  @ViewChild('policyDialog') policyDialog!: ElementRef<HTMLDialogElement>;

  // Métodos para emitir eventos cuando se hace clic
  onConfirm(): void {
    if (this.canConfirm) {
      this.confirmBooking.emit();
    }
  }

  onViewPolicy(): void {
    // Abre el diálogo modal
    if (this.policyDialog?.nativeElement) {
      this.policyDialog.nativeElement.showModal();
    } else {
      console.error("Referencia al diálogo de políticas no encontrada.");
    }
  }

  // Método para cerrar el diálogo
  closePolicyDialog(): void {
    if (this.policyDialog?.nativeElement) {
      this.policyDialog.nativeElement.close();
    }
  }
}