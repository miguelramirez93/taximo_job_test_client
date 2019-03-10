import { TestBed } from '@angular/core/testing';

import { FishStoresApiServiceService } from './fish-stores-api-service.service';

describe('FishStoresApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishStoresApiServiceService = TestBed.get(FishStoresApiServiceService);
    expect(service).toBeTruthy();
  });
});
