import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importar NgForm

// Interfaz para la estructura de los detalles
export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  termsAgreed: boolean;
}

@Component({
  selector: 'app-your-details',
  standalone: false,
  templateUrl: './your-details.component.html',
  styleUrls: ['./your-details.component.css']
})
export class YourDetailsComponent {

  // Objeto para almacenar los datos del formulario, inicializado
  details: UserDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    termsAgreed: false
  };

  // Evento para notificar al padre sobre los cambios en los detalles
  @Output() detailsChanged = new EventEmitter<UserDetails>();
  // Evento para notificar al padre si el formulario es válido
  @Output() detailsValidityChanged = new EventEmitter<boolean>();

  // Método que se llama cuando algo cambia en el formulario
  onDetailsChange(form: NgForm): void {
    // Pequeña espera para asegurar que ngModel actualice el objeto 'details'
    setTimeout(() => {
      if (form.valid !== undefined && form.valid !== null) {
        // Emitir los detalles actuales
        this.detailsChanged.emit(this.details);
        // Emitir el estado de validez del formulario (considera todos los 'required', 'email', etc.)
        this.detailsValidityChanged.emit(form.valid && this.details.termsAgreed);
      }
    }, 0);
  }
}