import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Pedido e2e test', () => {

    let navBarPage: NavBarPage;
    let pedidoDialogPage: PedidoDialogPage;
    let pedidoComponentsPage: PedidoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Pedidos', () => {
        navBarPage.goToEntity('pedido');
        pedidoComponentsPage = new PedidoComponentsPage();
        expect(pedidoComponentsPage.getTitle())
            .toMatch(/Pedidos/);

    });

    it('should load create Pedido dialog', () => {
        pedidoComponentsPage.clickOnCreateButton();
        pedidoDialogPage = new PedidoDialogPage();
        expect(pedidoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Pedido/);
        pedidoDialogPage.close();
    });

    it('should create and save Pedidos', () => {
        pedidoComponentsPage.clickOnCreateButton();
        pedidoDialogPage.setHoraInput('hora');
        expect(pedidoDialogPage.getHoraInput()).toMatch('hora');
        pedidoDialogPage.suscripcionSelectLastOption();
        pedidoDialogPage.diasEntregaSelectLastOption();
        pedidoDialogPage.localSelectLastOption();
        pedidoDialogPage.save();
        expect(pedidoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PedidoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pedido div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PedidoDialogPage {
    modalTitle = element(by.css('h4#myPedidoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    horaInput = element(by.css('input#field_hora'));
    suscripcionSelect = element(by.css('select#field_suscripcion'));
    diasEntregaSelect = element(by.css('select#field_diasEntrega'));
    localSelect = element(by.css('select#field_local'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setHoraInput = function(hora) {
        this.horaInput.sendKeys(hora);
    };

    getHoraInput = function() {
        return this.horaInput.getAttribute('value');
    };

    suscripcionSelectLastOption = function() {
        this.suscripcionSelect.all(by.tagName('option')).last().click();
    };

    suscripcionSelectOption = function(option) {
        this.suscripcionSelect.sendKeys(option);
    };

    getSuscripcionSelect = function() {
        return this.suscripcionSelect;
    };

    getSuscripcionSelectedOption = function() {
        return this.suscripcionSelect.element(by.css('option:checked')).getText();
    };

    diasEntregaSelectLastOption = function() {
        this.diasEntregaSelect.all(by.tagName('option')).last().click();
    };

    diasEntregaSelectOption = function(option) {
        this.diasEntregaSelect.sendKeys(option);
    };

    getDiasEntregaSelect = function() {
        return this.diasEntregaSelect;
    };

    getDiasEntregaSelectedOption = function() {
        return this.diasEntregaSelect.element(by.css('option:checked')).getText();
    };

    localSelectLastOption = function() {
        this.localSelect.all(by.tagName('option')).last().click();
    };

    localSelectOption = function(option) {
        this.localSelect.sendKeys(option);
    };

    getLocalSelect = function() {
        return this.localSelect;
    };

    getLocalSelectedOption = function() {
        return this.localSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
