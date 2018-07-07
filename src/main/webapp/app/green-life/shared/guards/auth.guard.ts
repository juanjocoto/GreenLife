import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../../../shared';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AccountService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.auth.get().map((httpResponse) => {
      const account = httpResponse.body;
      // console.log(data);
      return true;
    }).catch((err) => {
      return new Observable<boolean>((observer) => {
        console.log('error');
        observer.next(false);
      });
    });
  }

}
