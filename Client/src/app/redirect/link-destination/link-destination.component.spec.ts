import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDestinationComponent } from './link-destination.component';

describe('LinkDestinationComponent', () => {
  let component: LinkDestinationComponent;
  let fixture: ComponentFixture<LinkDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
