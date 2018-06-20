import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CadenaOrdenRecoleccion e2e test', () => {

    let navBarPage: NavBarPage;
    let cadenaOrdenRecoleccionDialogPage: CadenaOrdenRecoleccionDialogPage;
    let cadenaOrdenRecoleccionComponentsPage: CadenaOrdenRecoleccionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CadenaOrdenRecoleccions', () => {
        navBarPage.goToEntity('cadena-orden-recoleccion');
        cadenaOrdenRecoleccionComponentsPage = new CadenaOrdenRecoleccionComponentsPage();
        expect(cadenaOrdenRecoleccionComponentsPage.getTitle())
            .toMatch(/Cadena Orden Recoleccions/);

    });

    it('should load create CadenaOrdenRecoleccion dialog', () => {
        cadenaOrdenRecoleccionComponentsPage.clickOnCreateButton();
        cadenaOrdenRecoleccionDialogPage = new CadenaOrdenRecoleccionDialogPage();
        expect(cadenaOrdenRecoleccionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Cadena Orden Recoleccion/);
        cadenaOrdenRecoleccionDialogPage.close();
    });

    it('should create and save CadenaOrdenRecoleccions', () => {
        cadenaOrdenRecoleccionComponentsPage.clickOnCreateButton();
        cadenaOrdenRecoleccionDialogPage.estadoSelectLastOption();
        cadenaOrdenRecoleccionDialogPage.setDescripcionInput('descripcion');
        expect(cadenaOrdenRecoleccionDialogPage.getDescripcionInput()).toMatch('descripcion');
        cadenaOrdenRecoleccionDialogPage.ordenRecoleccionSelectLastOption();
        cadenaOrdenRecoleccionDialogPage.previoSelectLastOption();
        cadenaOrdenRecoleccionDialogPage.save();
        expect(cadenaOrdenRecoleccionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CadenaOrdenRecoleccionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cadena-orden-recoleccion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CadenaOrdenRecoleccionDialogPage {
    modalTitle = element(by.css('h4#myCadenaOrdenRecoleccionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    estadoSelect = element(by.css('select#field_estado'));
    descripcionInput = element(by.css('input#field_descripcion'));
    ordenRecoleccionSelect = element(by.css('select#field_ordenRecoleccion'));
    previoSelect = element(by.css('select#field_previo'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setEstadoSelect = function(estado) {
        this.estadoSelect.sendKeys(estado);
    };

    getEstadoSelect = function() {
        return this.estadoSelect.element(by.css('option:checked')).getText();
    };

    estadoSelectLastOption = function() {
        this.estadoSelect.all(by.tagName('option')).last().click();
    };
    setDescripcionInput = function(descripcion) {
        this.descripcionInput.sendKeys(descripcion);
    };

    getDescripcionInput = function() {
        return this.descripcionInput.getAttribute('value');
    };

    ordenRecoleccionSelectLastOption = function() {
        this.ordenRecoleccionSelect.all(by.tagName('option')).last().click();
    };

    ordenRecoleccionSelectOption = function(option) {
        this.ordenRecoleccionSelect.sendKeys(option);
    };

    getOrdenRecoleccionSelect = function() {
        return this.ordenRecoleccionSelect;
    };

    getOrdenRecoleccionSelectedOption = function() {
        return this.ordenRecoleccionSelect.element(by.css('option:checked')).getText();
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
