import { Component, OnInit } from '@angular/core';
import { Barber } from '../../../../interfaces/barber.model';
import { BarberService } from '../../../../shared/services/barber.service';
@Component({
  standalone: false,
  selector: 'app-barbers-list',
  templateUrl: './barbers-list.component.html',
  styleUrls: ['./barbers-list.component.css']
})
export class BarbersListComponent implements OnInit {
  barbers: Barber[] = [];

  // Inyecta el servicio en el constructor
  constructor(private barberService: BarberService) {}

  ngOnInit() {
    // Obtén los barberos desde el servicio
    this.barbers = this.barberService.getBarbers();
     // Ya NO necesitas la lista hardcodeada aquí
  }
}
