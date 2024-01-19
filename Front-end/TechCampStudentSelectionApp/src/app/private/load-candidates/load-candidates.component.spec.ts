import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCandidatesComponent } from './load-candidates.component';

describe('LoadCandidatesComponent', () => {
  let component: LoadCandidatesComponent;
  let fixture: ComponentFixture<LoadCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCandidatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
