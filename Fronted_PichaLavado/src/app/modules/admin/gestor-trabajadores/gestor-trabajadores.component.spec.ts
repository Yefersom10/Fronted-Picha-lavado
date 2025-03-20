import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorTrabajadoresComponent } from './gestor-trabajadores.component';

describe('GestorTrabajadoresComponent', () => {
  let component: GestorTrabajadoresComponent;
  let fixture: ComponentFixture<GestorTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorTrabajadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
