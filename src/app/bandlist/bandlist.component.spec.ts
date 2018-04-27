import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandlistComponent } from './bandlist.component';

describe('BandlistComponent', () => {
  let component: BandlistComponent;
  let fixture: ComponentFixture<BandlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
