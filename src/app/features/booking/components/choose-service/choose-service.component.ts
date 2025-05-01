import { Component, Output, EventEmitter } from '@angular/core';
import { Service, ServiceSelectionEvent } from '../../../../interfaces/service.model'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-choose-service',
  standalone: false,
  templateUrl: './choose-service.component.html',
  styleUrls: ['./choose-service.component.css']
})
export class ChooseServiceComponent {

  // Definir la lista de servicios disponibles
  // NOTA: Los precios se ponen como números. La duración podría ser también numérica (minutos).
  availableServices: Service[] = [
    { id: 'haircut', name: 'Corte', duration: '45 min', price: 160, iconUrl: 'assets/icons/corte.svg', isSelected: false },
    { id: 'beard', name: 'Ritual de Barba', duration: '45 min', price: 170, iconUrl: 'assets/icons/beard.svg', isSelected: false },
    { id: 'facial', name: 'Facial', duration: '45 min', price: 150, iconUrl: 'assets/icons/facial.svg', isSelected: false },
    { id: 'thread', name: 'Depilación con Hilo (Ceja)', duration: '30 min', price: 200, iconUrl: 'assets/icons/thread.svg', isSelected: false },
    { id: 'bearddye', name: 'Tinte de Barba', duration: '45 min', price: 200, iconUrl: 'assets/icons/dye.svg', isSelected: false },
    { id: 'dyehair', name: 'Cubrimiento de Canas', duration: '1 hr', price: 200, iconUrl: 'assets/icons/canas.svg', isSelected: false },
    { id: 'nose', name: 'Depilación de Nariz', duration: '30 min', price: 200, iconUrl: 'assets/icons/nose.svg', isSelected: false },
    { id: 'eyebrow', name: 'Depilación de Ceja', duration: '15 min', price: 60, iconUrl: 'assets/icons/razor.svg', isSelected: false },
    { id: 'beard-express', name: 'Barba Express', duration: '25 min', price: 150, iconUrl: 'assets/icons/beard.svg', isSelected: false },
  ];

  // Output para notificar al componente padre sobre cambios en la selección
  @Output() selectionChanged = new EventEmitter<ServiceSelectionEvent>();

  constructor() { }

  // Método que se ejecuta cada vez que cambia el estado de un checkbox
  onServiceSelectionChange(): void {
    // Filtrar la lista completa para obtener solo los seleccionados
    const currentSelectedServices = this.availableServices.filter(service => service.isSelected);

    // 3. Calcular el precio total usando la función helper
    const currentTotalPrice = this.calculateTotalPrice(currentSelectedServices);

    // Opcional: Muestra en consola los servicios seleccionados y el total
    console.log('Servicios seleccionados:', currentSelectedServices);
    console.log('Precio Total Calculado:', currentTotalPrice);

    // 4. Emitir un objeto que contiene ambas informaciones al componente padre
    this.selectionChanged.emit({
        selectedServices: currentSelectedServices,
        totalPrice: currentTotalPrice
    });
  }
  
  private calculateTotalPrice(services: Service[]): number {
    // Usamos reduce para sumar los precios de los servicios en el array
    return services.reduce((total, service) => total + service.price, 0);
  }
}