import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostClickedListComponent } from './most-clicked-list.component';

describe('MostClickedListComponent', () => {
  let component: MostClickedListComponent;
  let fixture: ComponentFixture<MostClickedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostClickedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostClickedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
