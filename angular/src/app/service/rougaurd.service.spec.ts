import { TestBed } from '@angular/core/testing';

import { RougaurdService } from './rougaurd.service';

describe('RougaurdService', () => {
  let service: RougaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RougaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
