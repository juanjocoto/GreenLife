import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {StripeService, StripeCardComponent, ElementOptions, ElementsOptions} from 'ngx-stripe';
import {PagoService} from '../../../entities/pago';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {User, UserService, AccountService} from '../../../shared';

@Component({
    selector: 'jhi-pago-servicios',
    templateUrl: './pago-servicios.component.html',
    styleUrls: [
        'pago-servicios.component.scss'
    ]
})

export class PagoServiciosComponent implements OnInit {

    @ViewChild(StripeCardComponent) card: StripeCardComponent;
    @Input() amount: number;
    @Input() description: string;
    @Output() verificarPago = new EventEmitter<boolean>();
    paymentStatus = false;
    cliente: Usuario;
    clienteDetail: User;

    cardOptions: ElementOptions = {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#40535C',
                lineHeight: '40px',
                fontWeight: 500,
                fontFamily: '"Lato", sans-serif',
                fontSize: '18px',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                    color: '#CFD7E0'
                }
            }
        }
    };

    elementsOptions: ElementsOptions = {
        locale: 'es'
    };

    constructor(
        private stripeService: StripeService,
        private pagoService: PagoService,
        private account: AccountService,
        private usuarioService: UsuarioService,
        private userService: UserService,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loadCliente();
    }

    processPayment() {
        const name = this.clienteDetail.firstName + ' ' + this.clienteDetail.lastName;
        const currency = 'CRC';

        this.stripeService
            .createToken(this.card.getCard(), {name, currency})
            .subscribe((response) => {
                if (response.token) {
                    // Token created successful
                    this.showSnackBar('Procesando el pago...');
                    this.chargeCard(response.token.id);
                } else if (response.error) {
                    // Error creating the token
                    this.showSnackBar(response.error.message);
                }
            });
    }

    chargeCard(token: string) {
        this.pagoService.chargeCard(token, this.amount, this.description, this.clienteDetail.email).subscribe((response) => {
            if (response.status === 200) {
                // Payment successful
                this.paymentStatus = true;
                this.verificarPago.emit(this.paymentStatus);
                this.showSnackBar('Pago realizo exitosamente');
            } else if (response.status !== 200) {
                // Payment unsuccessful
                this.paymentStatus = false;
                this.verificarPago.emit(this.paymentStatus);
                this.showSnackBar('No se ha podido realizar el pago');
            }
        });
    }

    showSnackBar(message: string) {
        this.snackBar.open(message, 'Stripe', {
            duration: 30000,
        });
    }

    private loadCliente() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((usuarioResponse: HttpResponse<Usuario>) => {
                this.cliente = usuarioResponse.body;
                this.userService.find(accountResponse.body['login']).subscribe((userResponse: HttpResponse<User>) => {
                    this.clienteDetail = userResponse.body;
                });
            });
        });
    }

}
