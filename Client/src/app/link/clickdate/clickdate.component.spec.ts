import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickdateComponent } from './clickdate.component';

describe('ClickdateComponent', () => {
  let component: ClickdateComponent;
  let fixture: ComponentFixture<ClickdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
