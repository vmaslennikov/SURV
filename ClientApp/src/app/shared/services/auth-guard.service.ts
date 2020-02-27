import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConstsService } from './consts.service';
import { Observable, of as observableOf } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private http: HttpClient,
    private consts: ConstsService,
  ) {
  }

  canActivate() {
    return this.consts.HasUser.pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['auth']);
        }
      }),
    );
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private consts: ConstsService, ) { }
  canActivate() {
    return observableOf(this.consts.IsAdmin).pipe(tap(y => {
      if (!y) { this.router.navigate(['pages/dashboard']); }
    }));
  }
}

@Injectable()
export class HRGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private consts: ConstsService, ) { }
  canActivate() {
    return observableOf(this.consts.IsAdmin || this.consts.IsHr).pipe(tap(y => {
      if (!y) { this.router.navigate(['pages/dashboard']); }
    }));
  }
}

@Injectable()
export class CoordinatorGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private consts: ConstsService, ) { }
  canActivate() {
    return observableOf(this.consts.IsAdmin || this.consts.IsCoordinator).pipe(tap(y => {
      if (!y) { this.router.navigate(['pages/dashboard']); }
    }));
  }
}

@Injectable()
export class PMGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private consts: ConstsService, ) { }
  canActivate() {
    return observableOf(this.consts.IsAdmin || this.consts.IsPM).pipe(tap(y => {
      if (!y) { this.router.navigate(['pages/dashboard']); }
    }));
  }
}

@Injectable()
export class BossGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private consts: ConstsService, ) { }
  canActivate() {
    return observableOf(this.consts.IsAdmin || this.consts.IsBoss).pipe(tap(y => {
      if (!y) { this.router.navigate(['pages/dashboard']); }
    }));
  }
}

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private consts: ConstsService, ) { }
  canActivate() {
    return observableOf(this.consts.IsAdmin || this.consts.IsManager || this.consts.IsBoss).pipe(tap(y => {
      if (!y) { this.router.navigate(['pages/dashboard']); }
    }));
  }
}
