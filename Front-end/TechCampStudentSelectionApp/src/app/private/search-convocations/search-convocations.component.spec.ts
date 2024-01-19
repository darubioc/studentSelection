import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConvocationsComponent } from './search-convocations.component';

describe('SearchConvocationsComponent', () => {
  let component: SearchConvocationsComponent;
  let fixture: ComponentFixture<SearchConvocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchConvocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchConvocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
