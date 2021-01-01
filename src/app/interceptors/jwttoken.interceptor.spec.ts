import { TestBed } from '@angular/core/testing';

import { JWTTokenInterceptor } from './jwttoken.interceptor';

describe('JWTTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JWTTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JWTTokenInterceptor = TestBed.inject(JWTTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
