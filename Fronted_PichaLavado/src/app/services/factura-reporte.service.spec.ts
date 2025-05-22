import { TestBed } from '@angular/core/testing';

import { FacturaReporteService } from './factura-reporte.service';

describe('FacturaReporteService', () => {
  let service: FacturaReporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaReporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
