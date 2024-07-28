import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskLiComponent } from './subtask-li.component';

describe('SubtaskLiComponent', () => {
  let component: SubtaskLiComponent;
  let fixture: ComponentFixture<SubtaskLiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtaskLiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtaskLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
