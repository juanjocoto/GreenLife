import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CobroSuscripcion e2e test', () => {

    let navBarPage: NavBarPage;
    let cobroSuscripcionDialogPage: CobroSuscripcionDialogPage;
    let cobroSuscripcionComponentsPage: CobroSuscripcionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CobroSuscripcions', () => {
        navBarPage.goToEntity('cobro-suscripcion');
        cobroSuscripcionComponentsPage = new CobroSuscripcionComponentsPage();
        expect(cobroSuscripcionComponentsPage.getTitle())
            .toMatch(/Cobro Suscripcions/);

    });

    it('should load create CobroSuscripcion dialog', () => {
        cobroSuscripcionComponentsPage.clickOnCreateButton();
        cobroSuscripcionDialogPage = new CobroSuscripcionDialogPage();
        expect(cobroSuscripcionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Cobro Suscripcion/);
        cobroSuscripcionDialogPage.close();
    });

    it('should create and save CobroSuscripcions', () => {
        cobroSuscripcionComponentsPage.clickOnCreateButton();
        cobroSuscripcionDialogPage.setFechaInput('2000-12-31');
        expect(cobroSuscripcionDialogPage.getFechaInput()).toMatch('2000-12-31');
        cobroSuscripcionDialogPage.pagoSelectLastOption();
        cobroSuscripcionDialogPage.clienteSelectLastOption();
        cobroSuscripcionDialogPage.comercioSelectLastOption();
        cobroSuscripcionDialogPage.suscripcionSelectLastOption();
        cobroSuscripcionDialogPage.save();
        expect(cobroSuscripcionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CobroSuscripcionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cobro-suscripcion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CobroSuscripcionDialogPage {
    modalTitle = element(by.css('h4#myCobroSuscripcionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaInput = element(by.css('input#field_fecha'));
    pagoSelect = element(by.css('select#field_pago'));
    clienteSelect = element(by.css('select#field_cliente'));
    comercioSelect = element(by.css('select#field_comercio'));
    suscripcionSelect = element(by.css('select#field_suscripcion'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaInput = function(fecha) {
        this.fechaInput.sendKeys(fecha);
    };

    getFechaInput = function() {
        return this.fechaInput.getAttribute('value');
    };

    pagoSelectLastOption = function() {
        this.pagoSelect.all(by.tagName('option')).last().click();
    };

    pagoSelectOption = function(option) {
        this.pagoSelect.sendKeys(option);
    };

    getPagoSelect = function() {
        return this.pagoSelect;
    };

    getPagoSelectedOption = function() {
        return this.pagoSelect.element(by.css('option:checked')).getText();
    };

    clienteSelectLastOption = function() {
        this.clienteSelect.all(by.tagName('option')).last().click();
    };

    clienteSelectOption = function(option) {
        this.clienteSelect.sendKeys(option);
    };

    getClienteSelect = function() {
        return this.clienteSelect;
    };

    getClienteSelectedOption = function() {
        return this.clienteSelect.element(by.css('option:checked')).getText();
    };

    comercioSelectLastOption = function() {
        this.comercioSelect.all(by.tagName('option')).last().click();
    };

    comercioSelectOption = function(option) {
        this.comercioSelect.sendKeys(option);
    };

    getComercioSelect = function() {
        return this.comercioSelect;
    };

    getComercioSelectedOption = function() {
        return this.comercioSelect.element(by.css('option:checked')).getText();
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
