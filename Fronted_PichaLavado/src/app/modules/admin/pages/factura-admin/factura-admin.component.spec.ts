import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAdminComponent } from './factura-admin.component';

describe('FacturaAdminComponent', () => {
  let component: FacturaAdminComponent;
  let fixture: ComponentFixture<FacturaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
