import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaComponent } from './captura.component';

describe('CapturaComponent', () => {
  let component: CapturaComponent;
  let fixture: ComponentFixture<CapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
