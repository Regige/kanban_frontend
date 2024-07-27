import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardDialogSubtaskComponent } from './task-card-dialog-subtask.component';

describe('TaskCardDialogSubtaskComponent', () => {
  let component: TaskCardDialogSubtaskComponent;
  let fixture: ComponentFixture<TaskCardDialogSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardDialogSubtaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCardDialogSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
