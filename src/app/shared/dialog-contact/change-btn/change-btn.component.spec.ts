import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBtnComponent } from './change-btn.component';

describe('ChangeBtnComponent', () => {
  let component: ChangeBtnComponent;
  let fixture: ComponentFixture<ChangeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
