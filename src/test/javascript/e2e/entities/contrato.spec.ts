import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Contrato e2e test', () => {

    let navBarPage: NavBarPage;
    let contratoDialogPage: ContratoDialogPage;
    let contratoComponentsPage: ContratoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contratoes', () => {
        navBarPage.goToEntity('contrato');
        contratoComponentsPage = new ContratoComponentsPage();
        expect(contratoComponentsPage.getTitle())
            .toMatch(/Contratoes/);

    });

    it('should load create Contrato dialog', () => {
        contratoComponentsPage.clickOnCreateButton();
        contratoDialogPage = new ContratoDialogPage();
        expect(contratoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Contrato/);
        contratoDialogPage.close();
    });

    it('should create and save Contratoes', () => {
        contratoComponentsPage.clickOnCreateButton();
        contratoDialogPage.setFechaCreacionInput('2000-12-31');
        expect(contratoDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        contratoDialogPage.tipoSelectLastOption();
        contratoDialogPage.comercioSelectLastOption();
        contratoDialogPage.save();
        expect(contratoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContratoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contrato div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ContratoDialogPage {
    modalTitle = element(by.css('h4#myContratoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    tipoSelect = element(by.css('select#field_tipo'));
    comercioSelect = element(by.css('select#field_comercio'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    tipoSelectLastOption = function() {
        this.tipoSelect.all(by.tagName('option')).last().click();
    };

    tipoSelectOption = function(option) {
        this.tipoSelect.sendKeys(option);
    };

    getTipoSelect = function() {
        return this.tipoSelect;
    };

    getTipoSelectedOption = function() {
        return this.tipoSelect.element(by.css('option:checked')).getText();
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
