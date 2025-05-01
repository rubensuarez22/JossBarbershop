export interface Service {
    id: string; // Identificador único (ej: 'haircut', 'beard')
    name: string;
    duration: string; // Podría ser número de minutos si necesitas calcular
    price: number; // Guardar como número para cálculos
    iconUrl: string;
    isSelected: boolean; // Para rastrear la selección con ngModel
  }

// Interfaz para el evento emitido por ChooseServiceComponent
export interface ServiceSelectionEvent {
  selectedServices: Service[];
  totalPrice: number;
}