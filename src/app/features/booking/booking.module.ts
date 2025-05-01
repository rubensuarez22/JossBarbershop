import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { SelectStylistComponent } from './components/select-stylist/select-stylist.component';
import { PickDateTimeComponent } from './components/pick-date-time/pick-date-time.component';
import { YourDetailsComponent } from './components/your-details/your-details.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';
import { BookingComponent } from './components/booking/booking.component';
import { ChooseServiceComponent } from './components/choose-service/choose-service.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    BookingComponent,
    ChooseServiceComponent,
    SelectStylistComponent,
    PickDateTimeComponent,
    YourDetailsComponent,
    BookingSummaryComponent

  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule
  ]
})
export class BookingModule { }
