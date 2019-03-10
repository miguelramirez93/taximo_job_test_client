import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStoresComponent } from './fish-stores.component';

describe('FishStoresComponent', () => {
  let component: FishStoresComponent;
  let fixture: ComponentFixture<FishStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FishStoresComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
