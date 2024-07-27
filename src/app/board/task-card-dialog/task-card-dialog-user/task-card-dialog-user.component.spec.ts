import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardDialogUserComponent } from './task-card-dialog-user.component';

describe('TaskCardDialogUserComponent', () => {
  let component: TaskCardDialogUserComponent;
  let fixture: ComponentFixture<TaskCardDialogUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardDialogUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCardDialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
