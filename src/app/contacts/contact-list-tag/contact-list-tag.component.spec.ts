import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListTagComponent } from './contact-list-tag.component';

describe('ContactListTagComponent', () => {
  let component: ContactListTagComponent;
  let fixture: ComponentFixture<ContactListTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactListTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
