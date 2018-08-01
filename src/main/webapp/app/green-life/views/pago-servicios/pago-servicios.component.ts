import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {StripeService, StripeCardComponent, ElementOptions, ElementsOptions} from 'ngx-stripe';
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
    paymentForm: FormGroup;
    cliente: Usuario;
    clienteDetail: User;

    cardOptions: ElementOptions = {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#40535C',
                lineHeight: '40px',
                fontWeight: 300,
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
        private formBuilder: FormBuilder,
        private stripeService: StripeService,
        private account: AccountService,
        private usuarioService: UsuarioService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.paymentForm = this.formBuilder.group({
            name: ['', [Validators.required]]
        });

        this.loadCliente();
    }

    processPayment() {
        const name = this.clienteDetail.firstName + ' ' + this.clienteDetail.lastName;
        const currency = 'CRC';

        this.stripeService
            .createToken(this.card.getCard(), {name, currency})
            .subscribe((tokenResponse) => {
                if (tokenResponse.token) {
                    // Use the token to create a charge or a customer
                    // https://stripe.com/docs/charges
                    console.log(tokenResponse.token.id);
                } else if (tokenResponse.error) {
                    // Error creating the token
                    console.log(tokenResponse.error.message);
                }
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
