import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHeroComponent } from './image-hero.component';

describe('ImageHeroComponent', () => {
  let component: ImageHeroComponent;
  let fixture: ComponentFixture<ImageHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
