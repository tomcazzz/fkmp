import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FkComponent } from './fk.component';

describe('FkComponent', () => {
  let component: FkComponent;
  let fixture: ComponentFixture<FkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
