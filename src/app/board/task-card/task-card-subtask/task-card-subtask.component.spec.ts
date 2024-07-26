import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardSubtaskComponent } from './task-card-subtask.component';

describe('TaskCardSubtaskComponent', () => {
  let component: TaskCardSubtaskComponent;
  let fixture: ComponentFixture<TaskCardSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardSubtaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCardSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
