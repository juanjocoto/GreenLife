import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AccountService } from '../../../shared';
import { Injectable } from '@angular/core';
import { Observable } from '../../../../../../../node_modules/rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AccountService, private route: Router) { }

  canActivate(): boolean {
    // this.auth.get().subscribe(() => { }, () => { this.route.navigate(['/']); });
    return true;
  }

  canActivateChild() {
    // this.auth.get().subscribe(() => { }, () => { this.route.navigate(['/']); });
    return this.auth.get().map((httpResponse) => {
      const account = httpResponse.body;
      return true;
    }).catch((err) => {
      return new Observable<boolean>((observer) => {
        console.log('error');
        observer.next(true);
      });
    });
  }
}
