import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryNotesComponent } from './diary-notes.component';

describe('DiaryNotesComponent', () => {
  let component: DiaryNotesComponent;
  let fixture: ComponentFixture<DiaryNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
