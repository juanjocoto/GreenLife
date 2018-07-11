import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {
    constructor(private snackbar: MatSnackBar) { }

    show(message: string, duration = 2000) {
        this.snackbar.open(message, undefined, { duration });
    }
}
