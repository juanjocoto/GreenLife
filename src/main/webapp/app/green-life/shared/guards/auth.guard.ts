import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AccountService } from '../../../shared';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  {

  constructor(private auth: AccountService, private route: Router) { }

  canActivate(): boolean {
    this.auth.get().subscribe(() => { }, () => { this.route.navigate(['/']); });
    return true;
  }

  canActivateChild(): boolean {
    this.auth.get().subscribe(() => { }, () => { this.route.navigate(['/']); });
    return true;
  }
}
