// Importa EventEmitter y Output
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'app-pick-date-time',
  standalone: false,
  templateUrl: './pick-date-time.component.html',
  styleUrls: ['./pick-date-time.component.css']
  // providers: [DatePipe] // <-- Añadir si usas DatePipe
})
export class PickDateTimeComponent implements OnInit {

  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  isTodaySelectable: boolean = true;

  monthNames: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  dayNamesShort: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

  calendarDays: CalendarDay[] = [];
  timeSlots: string[] = []; // Todos los horarios posibles
  displayableTimeSlots: string[] = []; // Horarios a mostrar (filtrados)

  // Añadir el Output. Emitirá un objeto Date completo o null.
  @Output() dateTimeSelected = new EventEmitter<Date | null>();

  // constructor
  constructor() { } // <-- Constructor simple si no usas DatePipe

  ngOnInit(): void {
    this.checkIfTodayIsSelectable();
    this.generateCalendar();
    this.generateTimeSlots(); // Genera la lista completa una vez
  }

  checkIfTodayIsSelectable(): void {
     const now = new Date();
     const cutoffTime = new Date(now); // Crear copia para no modificar 'now'
     cutoffTime.setHours(20, 30, 0, 0); // 8:30 PM del día actual
     this.isTodaySelectable = now < cutoffTime;
  }

  generateCalendar(): void {
    // (Sin cambios significativos aquí, sólo asegurarse que isSelected se resetea correctamente)
     this.calendarDays = [];
     const year = this.currentDate.getFullYear();
     const month = this.currentDate.getMonth();
     const today = new Date();
     today.setHours(0, 0, 0, 0); // Ignorar la hora para comparación de días

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
             isToday: false, isSelected: false, isDisabled: true
         });
     }

     // Días mes actual
     for (let day = 1; day <= daysInMonth; day++) {
         const date = new Date(year, month, day);
         date.setHours(0, 0, 0, 0); // Normalizar fecha para comparación
         const isTodayDate = this.isSameDate(date, today);
         const isPastDate = !isTodayDate && date < today;

         // Deshabilitar si:
         // 1. Es un día pasado.
         // 2. Es hoy Y la hora actual ya pasó el último horario disponible (evaluado en checkIfTodayIsSelectable).
         const isDisabled = isPastDate || (isTodayDate && !this.isTodaySelectable);

         const isSelected = this.selectedDate ? this.isSameDate(date, this.selectedDate) : false;

         this.calendarDays.push({
             date: date, dayOfMonth: day, isCurrentMonth: true,
             isToday: isTodayDate, isSelected: isSelected, isDisabled: isDisabled
         });
     }

      // Días mes siguiente
      const calendarGridSize = this.calendarDays.length > 35 ? 42 : 35; // Ajustar tamaño de cuadrícula si es necesario
      const remainingCells = calendarGridSize - this.calendarDays.length;
      for (let i = 1; i <= remainingCells; i++) {
          const date = new Date(year, month + 1, i);
          this.calendarDays.push({
              date: date, dayOfMonth: i, isCurrentMonth: false,
              isToday: false, isSelected: false, isDisabled: true
          });
      }
  }

  generateTimeSlots(): void {
     this.timeSlots = [];
     const startTime = 9 * 60;
     const endTime = 20 * 60 + 30;
     const interval = 30;

     for (let minutes = startTime; minutes <= endTime; minutes += interval) {
       const hours = Math.floor(minutes / 60);
       const mins = minutes % 60;
       // Formato 12h con AM/PM
       const period = hours >= 12 ? 'PM' : 'AM';
       const displayHours = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
       const displayMinutes = mins < 10 ? '0' + mins : mins.toString();
       this.timeSlots.push(`${displayHours}:${displayMinutes} ${period}`);
     }
  }

  // Función para filtrar horarios según la fecha seleccionada y hora actual
  updateDisplayableTimeSlots(): void {
    if (!this.selectedDate) {
      this.displayableTimeSlots = [];
      return;
    }

    const now = new Date(); // Hora actual exacta
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Hoy a medianoche para comparación

    // Si la fecha seleccionada NO es hoy (y es futura), muestra todos los horarios
    if (!this.isSameDate(this.selectedDate, today)) {
      this.displayableTimeSlots = [...this.timeSlots]; // Copia todos los horarios
      return;
    }

    // Si la fecha seleccionada ES hoy, filtra los horarios
    this.displayableTimeSlots = this.timeSlots.filter(timeString => {
      const slotDateTime = this.parseTimeString(timeString, this.selectedDate!); // Convierte "HH:MM AM/PM" a Date
      // Compara el inicio del slot con la hora actual
      // Puedes añadir un margen si quieres (ej: mostrar slots que empiecen en 5 mins o más)
      // const marginMinutes = 5;
      // now.setMinutes(now.getMinutes() + marginMinutes);
      return slotDateTime >= now;
    });
  }

  // Helper para convertir "HH:MM AM/PM" a un objeto Date en la fecha dada
  parseTimeString(timeString: string, date: Date): Date {
    const [time, period] = timeString.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) { // Medianoche (12 AM)
      hours = 0;
    }

    const resultDate = new Date(date); // Copia la fecha seleccionada
    resultDate.setHours(hours, minutes, 0, 0); // Establece la hora y minutos
    return resultDate;
  }


  previousMonth(): void {
     this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
     this.generateCalendar();
  }

  nextMonth(): void {
     this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
     this.generateCalendar();
  }

  selectDate(day: CalendarDay): void {
    if (day.isDisabled || !day.isCurrentMonth) {
        console.log("Fecha no seleccionable.");
        return;
    }

    // Si se hace clic en la misma fecha ya seleccionada, deseleccionar? (Opcional)
    if (this.selectedDate && this.isSameDate(day.date, this.selectedDate)) {
      this.selectedDate = null;
      this.selectedTime = null;
      this.displayableTimeSlots = [];
      this.calendarDays.forEach(d => d.isSelected = false);
      this.dateTimeSelected.emit(null);
      return;
    }

    this.selectedDate = day.date;
    this.selectedTime = null; // Resetea la hora al cambiar de día

    // Actualiza la clase 'selected' en el calendario
    this.calendarDays.forEach(d => {
        d.isSelected = d.isCurrentMonth && !d.isDisabled && this.isSameDate(d.date, this.selectedDate!);
    });

    // 3. Llama a la función para actualizar los horarios visibles
    this.updateDisplayableTimeSlots();

    // 3. Emitir null porque la selección de fecha/hora aún no está completa
    this.dateTimeSelected.emit(null);

    console.log('Fecha seleccionada:', this.selectedDate);
}


  selectTime(time: string): void {
     if (!this.selectedDate) {
       // Esto no debería pasar si los botones están deshabilitados, pero por si acaso
       console.error("Se intentó seleccionar una hora sin fecha.");
       return;
     }

     // Opcional: Validar si la hora seleccionada realmente está en displayableTimeSlots (para hoy)
     // if (this.isSameDate(this.selectedDate, new Date()) && !this.displayableTimeSlots.includes(time)) {
     //    console.warn("Se intentó seleccionar una hora no disponible.");
     //    return; // No permitir seleccionar horas pasadas
     // }

     this.selectedTime = time;
     console.log('Hora seleccionada:', this.selectedTime);

     // 4. Combinar fecha y hora y emitir
     const finalDateTime = this.parseTimeString(this.selectedTime, this.selectedDate);
     this.dateTimeSelected.emit(finalDateTime);
     console.log('Fecha y Hora combinada emitida:', finalDateTime);
  }

  isSelectedTime(time: string): boolean {
    return this.selectedTime === time;
  }

  isSameDate(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  get monthYearDisplay(): string {

    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }
}