import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbersListComponent } from './barbers-list.component';

describe('BarbersListComponent', () => {
  let component: BarbersListComponent;
  let fixture: ComponentFixture<BarbersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarbersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarbersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
