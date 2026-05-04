import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChooseMe } from './why-choose-me';

describe('WhyChooseMe', () => {
  let component: WhyChooseMe;
  let fixture: ComponentFixture<WhyChooseMe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseMe],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseMe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
