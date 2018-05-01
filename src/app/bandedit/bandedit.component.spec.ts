import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeditComponent } from './bandedit.component';

describe('BandeditComponent', () => {
  let component: BandeditComponent;
  let fixture: ComponentFixture<BandeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
