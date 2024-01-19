import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConvocationComponent } from './create-convocation.component';

describe('CreateConvocationComponent', () => {
  let component: CreateConvocationComponent;
  let fixture: ComponentFixture<CreateConvocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConvocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConvocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
