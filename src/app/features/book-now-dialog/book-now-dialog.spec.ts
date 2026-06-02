import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNowDialog } from './book-now-dialog';

describe('BookNowDialog', () => {
  let component: BookNowDialog;
  let fixture: ComponentFixture<BookNowDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNowDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookNowDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
