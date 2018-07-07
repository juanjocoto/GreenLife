import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from '../../../../../../../node_modules/rxjs';
import { AccountService } from '../../../shared';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AccountService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.auth.get().map((httpResponse) => {
      const account = httpResponse.body;
      return true;
    }).catch((err) => {
      return new Observable<boolean>((observer) => {
        console.log('error');
        observer.next(false);
      });
    });
  }
}
