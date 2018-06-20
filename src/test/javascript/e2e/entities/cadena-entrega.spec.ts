import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CadenaEntrega e2e test', () => {

    let navBarPage: NavBarPage;
    let cadenaEntregaDialogPage: CadenaEntregaDialogPage;
    let cadenaEntregaComponentsPage: CadenaEntregaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CadenaEntregas', () => {
        navBarPage.goToEntity('cadena-entrega');
        cadenaEntregaComponentsPage = new CadenaEntregaComponentsPage();
        expect(cadenaEntregaComponentsPage.getTitle())
            .toMatch(/Cadena Entregas/);

    });

    it('should load create CadenaEntrega dialog', () => {
        cadenaEntregaComponentsPage.clickOnCreateButton();
        cadenaEntregaDialogPage = new CadenaEntregaDialogPage();
        expect(cadenaEntregaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Cadena Entrega/);
        cadenaEntregaDialogPage.close();
    });

    it('should create and save CadenaEntregas', () => {
        cadenaEntregaComponentsPage.clickOnCreateButton();
        cadenaEntregaDialogPage.setInfoInput('info');
        expect(cadenaEntregaDialogPage.getInfoInput()).toMatch('info');
        cadenaEntregaDialogPage.setFechaInput('2000-12-31');
        expect(cadenaEntregaDialogPage.getFechaInput()).toMatch('2000-12-31');
        cadenaEntregaDialogPage.estadoSelectLastOption();
        cadenaEntregaDialogPage.entregaSelectLastOption();
        cadenaEntregaDialogPage.previoSelectLastOption();
        cadenaEntregaDialogPage.save();
        expect(cadenaEntregaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CadenaEntregaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cadena-entrega div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CadenaEntregaDialogPage {
    modalTitle = element(by.css('h4#myCadenaEntregaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    infoInput = element(by.css('input#field_info'));
    fechaInput = element(by.css('input#field_fecha'));
    estadoSelect = element(by.css('select#field_estado'));
    entregaSelect = element(by.css('select#field_entrega'));
    previoSelect = element(by.css('select#field_previo'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setInfoInput = function(info) {
        this.infoInput.sendKeys(info);
    };

    getInfoInput = function() {
        return this.infoInput.getAttribute('value');
    };

    setFechaInput = function(fecha) {
        this.fechaInput.sendKeys(fecha);
    };

    getFechaInput = function() {
        return this.fechaInput.getAttribute('value');
    };

    setEstadoSelect = function(estado) {
        this.estadoSelect.sendKeys(estado);
    };

    getEstadoSelect = function() {
        return this.estadoSelect.element(by.css('option:checked')).getText();
    };

    estadoSelectLastOption = function() {
        this.estadoSelect.all(by.tagName('option')).last().click();
    };
    entregaSelectLastOption = function() {
        this.entregaSelect.all(by.tagName('option')).last().click();
    };

    entregaSelectOption = function(option) {
        this.entregaSelect.sendKeys(option);
    };

    getEntregaSelect = function() {
        return this.entregaSelect;
    };

    getEntregaSelectedOption = function() {
        return this.entregaSelect.element(by.css('option:checked')).getText();
    };

    previoSelectLastOption = function() {
        this.previoSelect.all(by.tagName('option')).last().click();
    };

    previoSelectOption = function(option) {
        this.previoSelect.sendKeys(option);
    };

    getPrevioSelect = function() {
        return this.previoSelect;
    };

    getPrevioSelectedOption = function() {
        return this.previoSelect.element(by.css('option:checked')).getText();
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
