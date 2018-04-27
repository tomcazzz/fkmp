import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandformComponent } from './bandform.component';

describe('BandformComponent', () => {
  let component: BandformComponent;
  let fixture: ComponentFixture<BandformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
