import { Injectable } from '@angular/core';
import { Observable, Subject } from '../../../../../../../node_modules/rxjs';
import { Account } from '../../../shared';

@Injectable()
export class AuthService {

    private _authStatus: Subject<Account>;

    get authStatus(): Observable<Account> {
        return this._authStatus;
    }

    constructor() {
        this._authStatus = new Subject<Account>();
    }

    verificarSesion(account: any) {
        this._authStatus.next(account);
    }
}
