import { TestBed } from '@angular/core/testing';

import { ForgetpassService } from './forgetpass.service';

describe('ForgetpassService', () => {
  let service: ForgetpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
