import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickedContactComponent } from './clicked-contact.component';

describe('ClickedContactComponent', () => {
  let component: ClickedContactComponent;
  let fixture: ComponentFixture<ClickedContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickedContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClickedContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
