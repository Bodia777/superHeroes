import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHeroComponent } from './input-hero.component';

describe('InputHeroComponent', () => {
  let component: InputHeroComponent;
  let fixture: ComponentFixture<InputHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
