import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterSeperatorComponent } from './letter-seperator.component';

describe('LetterSeperatorComponent', () => {
  let component: LetterSeperatorComponent;
  let fixture: ComponentFixture<LetterSeperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterSeperatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LetterSeperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
