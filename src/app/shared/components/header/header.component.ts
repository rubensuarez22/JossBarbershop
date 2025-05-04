import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private headerHeight = 80;
  constructor(private router: Router) { }
  scrollToSection(sectionId: string) {
    // 1) Navega a '/' y fija fragment
    this.router.navigate(['/'], { fragment: sectionId })
      .then(() => {
        // 2) Después de navegar, haz scroll
        const el = document.getElementById(sectionId);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.pageYOffset - this.headerHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
  }
}
