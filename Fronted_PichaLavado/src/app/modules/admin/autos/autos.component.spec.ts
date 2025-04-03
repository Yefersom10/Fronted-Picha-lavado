import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosComponent } from './autos.component';

describe('AutosComponent', () => {
  let component: AutosComponent;
  let fixture: ComponentFixture<AutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
