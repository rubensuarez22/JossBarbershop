// src/app/features/landing/landing.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeroComponent } from './components/hero/hero.component';
import { BarbersListComponent } from './components/barbers-list/barbers-list.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
// … other shared landing components

@NgModule({
  declarations: [
    LandingPageComponent,
    HeroComponent,
    BarbersListComponent,
    AboutUsComponent,
    ContactSectionComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }

