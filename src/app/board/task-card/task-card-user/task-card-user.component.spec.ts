import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardUserComponent } from './task-card-user.component';

describe('TaskCardUserComponent', () => {
  let component: TaskCardUserComponent;
  let fixture: ComponentFixture<TaskCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
