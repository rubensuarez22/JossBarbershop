import { Component, OnInit } from '@angular/core';
// NO import CommonModule aquí si no es standalone

interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean; // Nueva propiedad para deshabilitar
}

@Component({
  selector: 'app-pick-date-time',
  standalone: false,
  templateUrl: './pick-date-time.component.html',
  styleUrls: ['./pick-date-time.component.css']
})
export class PickDateTimeComponent implements OnInit {

  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  isTodaySelectable: boolean = true; // Para controlar si hoy se puede seleccionar

  monthNames: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  dayNamesShort: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

  calendarDays: CalendarDay[] = [];
  timeSlots: string[] = [];

  ngOnInit(): void {
    this.checkIfTodayIsSelectable(); // Verifica la hora actual primero
    this.generateCalendar();
    this.generateTimeSlots();
  }

  checkIfTodayIsSelectable(): void {
    const now = new Date();
    const cutoffTime = new Date();
    cutoffTime.setHours(20, 30, 0, 0); // 8:30 PM
    this.isTodaySelectable = now < cutoffTime;
    // console.log(`Hora actual: ${now.toLocaleTimeString()}, Límite: ${cutoffTime.toLocaleTimeString()}, ¿Hoy seleccionable?: ${this.isTodaySelectable}`);
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const today = new Date(); // Obtener fecha de hoy para comparación

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    // Días mes anterior
    const lastDayOfPrevMonth = new Date(year, month, 0);
    const daysInPrevMonth = lastDayOfPrevMonth.getDate();
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const date = new Date(year, month - 1, day);
        this.calendarDays.push({
            date: date, dayOfMonth: day, isCurrentMonth: false,
            isToday: false, isSelected: false, isDisabled: true // Días mes anterior deshabilitados
        });
    }

    // Días mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isTodayDate = this.isSameDate(date, today);
      // Deshabilitar si es hoy Y la hora ya pasó el límite
      const isDisabled = isTodayDate && !this.isTodaySelectable;
      // También deshabilita fechas pasadas (opcional, descomentar si se desea)
      // const isPastDate = date < today && !isTodayDate;
      // const isDisabled = (isTodayDate && !this.isTodaySelectable) || isPastDate;

      const isSelected = this.selectedDate ? this.isSameDate(date, this.selectedDate) : false;

      this.calendarDays.push({
          date: date, dayOfMonth: day, isCurrentMonth: true,
          isToday: isTodayDate, isSelected: isSelected, isDisabled: isDisabled
       });
    }

     // Días mes siguiente
     const remainingCells = 42 - this.calendarDays.length;
     for (let i = 1; i <= remainingCells; i++) {
         const date = new Date(year, month + 1, i);
         this.calendarDays.push({
             date: date, dayOfMonth: i, isCurrentMonth: false,
             isToday: false, isSelected: false, isDisabled: true // Días mes siguiente deshabilitados
         });
     }
  }

  generateTimeSlots(): void {
    // (Sin cambios en esta función)
    this.timeSlots = [];
    const startTime = 9 * 60;
    const endTime = 20 * 60 + 30;
    const interval = 30;

    for (let minutes = startTime; minutes <= endTime; minutes += interval) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
      const displayMinutes = mins < 10 ? '0' + mins : mins.toString();

      this.timeSlots.push(`${displayHours}:${displayMinutes} ${period}`);
    }
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar(); // Regenera el calendario con las posibles nuevas deshabilitaciones
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar(); // Regenera el calendario
  }

  selectDate(day: CalendarDay): void {
    // No permitir seleccionar si está deshabilitado (sea por otro mes o por la hora de hoy)
    if (day.isDisabled || !day.isCurrentMonth) {
      console.log("Fecha no seleccionable.");
      return;
    }

    this.selectedDate = day.date;
    this.selectedTime = null;

    this.calendarDays.forEach(d => {
        // Actualizar isSelected solo para días válidos del mes actual
        d.isSelected = d.isCurrentMonth && !d.isDisabled && this.isSameDate(d.date, this.selectedDate!);
    });

    console.log('Fecha seleccionada:', this.selectedDate);
  }

  selectTime(time: string): void {
     if (!this.selectedDate) {
        alert("Por favor, selecciona primero una fecha.");
        return;
     }
    this.selectedTime = time;
    console.log('Hora seleccionada:', this.selectedTime);
  }

  isSelectedTime(time: string): boolean {
    return this.selectedTime === time;
  }

  isSameDate(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) return false; // Añadir check por si acaso
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  get monthYearDisplay(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }
}