import { TestBed } from '@angular/core/testing';

import { CrudHeroService } from './crud-hero.service';

describe('CrudHeroService', () => {
  let service: CrudHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudHeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
