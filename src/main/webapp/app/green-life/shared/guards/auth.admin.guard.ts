import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../../../shared';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthAdminGuard implements CanActivate {

  constructor(private auth: AccountService, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.auth.get().map((httpResponse) => {
      const account = httpResponse.body;
      if (account['authorities'].includes('ROLE_ADMIN')) {
        this.authService.verificarSesion(account);
        return true;
      }
    }).catch((err) => {
      return new Observable<boolean>((observer) => {
        observer.next(false);
      });
    });
  }

}
