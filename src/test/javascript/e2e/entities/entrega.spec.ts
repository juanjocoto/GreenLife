import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Entrega e2e test', () => {

    let navBarPage: NavBarPage;
    let entregaDialogPage: EntregaDialogPage;
    let entregaComponentsPage: EntregaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Entregas', () => {
        navBarPage.goToEntity('entrega');
        entregaComponentsPage = new EntregaComponentsPage();
        expect(entregaComponentsPage.getTitle())
            .toMatch(/Entregas/);

    });

    it('should load create Entrega dialog', () => {
        entregaComponentsPage.clickOnCreateButton();
        entregaDialogPage = new EntregaDialogPage();
        expect(entregaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Entrega/);
        entregaDialogPage.close();
    });

    it('should create and save Entregas', () => {
        entregaComponentsPage.clickOnCreateButton();
        entregaDialogPage.setFechaInicioInput('2000-12-31');
        expect(entregaDialogPage.getFechaInicioInput()).toMatch('2000-12-31');
        entregaDialogPage.suscripcionSelectLastOption();
        entregaDialogPage.pedidoSelectLastOption();
        entregaDialogPage.save();
        expect(entregaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EntregaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-entrega div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EntregaDialogPage {
    modalTitle = element(by.css('h4#myEntregaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaInicioInput = element(by.css('input#field_fechaInicio'));
    suscripcionSelect = element(by.css('select#field_suscripcion'));
    pedidoSelect = element(by.css('select#field_pedido'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaInicioInput = function(fechaInicio) {
        this.fechaInicioInput.sendKeys(fechaInicio);
    };

    getFechaInicioInput = function() {
        return this.fechaInicioInput.getAttribute('value');
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

    pedidoSelectLastOption = function() {
        this.pedidoSelect.all(by.tagName('option')).last().click();
    };

    pedidoSelectOption = function(option) {
        this.pedidoSelect.sendKeys(option);
    };

    getPedidoSelect = function() {
        return this.pedidoSelect;
    };

    getPedidoSelectedOption = function() {
        return this.pedidoSelect.element(by.css('option:checked')).getText();
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
