import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CobroMensualidad e2e test', () => {

    let navBarPage: NavBarPage;
    let cobroMensualidadDialogPage: CobroMensualidadDialogPage;
    let cobroMensualidadComponentsPage: CobroMensualidadComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CobroMensualidads', () => {
        navBarPage.goToEntity('cobro-mensualidad');
        cobroMensualidadComponentsPage = new CobroMensualidadComponentsPage();
        expect(cobroMensualidadComponentsPage.getTitle())
            .toMatch(/Cobro Mensualidads/);

    });

    it('should load create CobroMensualidad dialog', () => {
        cobroMensualidadComponentsPage.clickOnCreateButton();
        cobroMensualidadDialogPage = new CobroMensualidadDialogPage();
        expect(cobroMensualidadDialogPage.getModalTitle())
            .toMatch(/Create or edit a Cobro Mensualidad/);
        cobroMensualidadDialogPage.close();
    });

    it('should create and save CobroMensualidads', () => {
        cobroMensualidadComponentsPage.clickOnCreateButton();
        cobroMensualidadDialogPage.setFechaInput('2000-12-31');
        expect(cobroMensualidadDialogPage.getFechaInput()).toMatch('2000-12-31');
        cobroMensualidadDialogPage.pagoSelectLastOption();
        cobroMensualidadDialogPage.contratoSelectLastOption();
        cobroMensualidadDialogPage.save();
        expect(cobroMensualidadDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CobroMensualidadComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cobro-mensualidad div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CobroMensualidadDialogPage {
    modalTitle = element(by.css('h4#myCobroMensualidadLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaInput = element(by.css('input#field_fecha'));
    pagoSelect = element(by.css('select#field_pago'));
    contratoSelect = element(by.css('select#field_contrato'));

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

    contratoSelectLastOption = function() {
        this.contratoSelect.all(by.tagName('option')).last().click();
    };

    contratoSelectOption = function(option) {
        this.contratoSelect.sendKeys(option);
    };

    getContratoSelect = function() {
        return this.contratoSelect;
    };

    getContratoSelectedOption = function() {
        return this.contratoSelect.element(by.css('option:checked')).getText();
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
