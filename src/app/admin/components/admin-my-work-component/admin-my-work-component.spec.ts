import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMyWorkComponent } from './admin-my-work-component';

describe('AdminMyWorkComponent', () => {
  let component: AdminMyWorkComponent;
  let fixture: ComponentFixture<AdminMyWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMyWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
